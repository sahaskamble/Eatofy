'use client';

import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useHotelAuth } from '../../contexts/AuthContext';
import { FaEye, FaEdit, FaTrash, FaTimes, FaSearch, FaSave } from 'react-icons/fa';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// ─── helpers ──────────────────────────────────────────────────────────────────
const paymentBadge = (status) => {
  const map = {
    Paid: 'bg-green-100 text-green-800',
    'Part-Paid': 'bg-yellow-100 text-yellow-800',
    'Part-paid': 'bg-yellow-100 text-yellow-800',
    Unpaid: 'bg-red-100 text-red-800',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700';
};

const fmt = (n) => typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '₹0';

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ order, onClose }) {
  if (!order) return null;
  const rows = [
    ['Order Type', order.Type ?? '—'],
    ['Table', order.TableId?.TableName ?? '—'],
    ['Waiter', order.WaiterId?.FirstName ?? '—'],
    ['Customer', order.CustomerId?.CustomerName ?? '—'],
    ['Menu Total', fmt(order.MenuTotal)],
    ['Discount', fmt(order.DiscountPrice)],
    ['Delivery', fmt(order.DeliveryChargesAmount)],
    ['GST (CGST)', fmt(order.CGSTAmount)],
    ['GST (SGST)', fmt(order.SGSTAmount)],
    ['Total Amount', fmt(order.TotalAmount)],
    ['Amount Paid', fmt(order.Amount)],
    ['Balance', fmt(order.BalanceAmount)],
    ['Payment Mode', order.PaymentMode ?? '—'],
    ['Payment Status', order.PaymentStatus ?? '—'],
    ['Bill Status', order.Status ?? '—'],
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">{order._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FaTimes className="text-gray-400" />
          </button>
        </div>
        <div className="p-6 divide-y divide-gray-50 max-h-[60vh] overflow-y-auto">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 text-sm">
              <span className="text-gray-400 font-medium">{label}</span>
              <span className="text-gray-800 font-semibold text-right">{value}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Payment Modal ───────────────────────────────────────────────────────
function EditPaymentModal({ order, onClose, onSuccess }) {
  const [form, setForm] = useState({
    payment_status: order?.PaymentStatus ?? '',
    payment_mode: order?.PaymentMode ?? '',
    balance_amount: order?.BalanceAmount ?? 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.payment_status || !form.payment_mode) {
      toast.error('Please fill all required fields');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/hotel/bills/edit/payment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bill_id: order._id,
          payment_status: form.payment_status,
          payment_mode: form.payment_mode,
          balance_amount: Number(form.balance_amount),
        }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('Order updated');
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to update order');
      }
    } catch {
      toast.error('Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Edit Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FaTimes className="text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Status <span className="text-red-500">*</span></label>
            <select value={form.payment_status} onChange={e => setForm(f => ({ ...f, payment_status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm">
              <option value="">Select status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Part-Paid">Part-Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode <span className="text-red-500">*</span></label>
            <select value={form.payment_mode} onChange={e => setForm(f => ({ ...f, payment_mode: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm">
              <option value="">Select mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Credit-Card">Credit Card</option>
              <option value="Part">Part</option>
              <option value="Due">Due</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Balance Amount (₹)</label>
            <input type="number" min="0" value={form.balance_amount}
              onChange={e => setForm(f => ({ ...f, balance_amount: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} disabled={saving}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaSave size={12} />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function DeleteModal({ onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <FaTrash className="text-red-500" size={13} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Delete Order</h3>
            <p className="text-sm text-gray-400">This action cannot be undone</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrderHistory() {
  const { loading: authLoading } = useHotelAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hotel/bills/fetch');
      const data = await res.json();
      setOrders(data.output ?? []);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch('/api/hotel/bills/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bill_id: deleteTarget._id }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('Order deleted');
        fetchOrders();
        setDeleteTarget(null);
      } else {
        toast.error(data.message || 'Failed to delete order');
      }
    } catch {
      toast.error('Failed to delete order');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = orders;
    if (filter === 'qr') list = list.filter(o => o.Type === 'QR-Orders');
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        o.TableId?.TableName?.toLowerCase().includes(q) ||
        o.WaiterId?.FirstName?.toLowerCase().includes(q) ||
        o.CustomerId?.CustomerName?.toLowerCase().includes(q) ||
        o.PaymentStatus?.toLowerCase().includes(q) ||
        o.Type?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, filter, searchQuery]);

  if (authLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
          <p className="text-sm text-gray-500 mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            placeholder="Search table, waiter, customer, payment status…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[['all', 'All'], ['qr', 'QR Orders']].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${filter === key ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-600">
                <tr>
                  {['#', 'Table', 'Waiter', 'Customer', 'Type', 'Balance', 'Total', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-sm text-gray-400">
                      <FaSearch className="mx-auto mb-2 opacity-30" size={24} />
                      No orders found
                    </td>
                  </tr>
                ) : filtered.map((order, i) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.TableId?.TableName ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.WaiterId?.FirstName ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.CustomerId?.CustomerName ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.Type ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{fmt(order.BalanceAmount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{fmt(order.TotalAmount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{fmt(order.Amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${paymentBadge(order.PaymentStatus)}`}>
                        {order.PaymentStatus ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setViewOrder(order)}
                          className="p-1.5 bg-orange-50 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors" title="View">
                          <FaEye size={13} />
                        </button>
                        <button onClick={() => setEditOrder(order)}
                          className="p-1.5 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors" title="Edit Payment">
                          <FaEdit size={13} />
                        </button>
                        <button onClick={() => setDeleteTarget(order)}
                          className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewOrder && <ViewModal order={viewOrder} onClose={() => setViewOrder(null)} />}
      {editOrder && <EditPaymentModal order={editOrder} onClose={() => setEditOrder(null)} onSuccess={fetchOrders} />}
      {deleteTarget && <DeleteModal loading={deleteLoading} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />}
    </div>
  );
}
