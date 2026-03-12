'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { FaEye, FaTrash, FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa';

// ─── helpers ──────────────────────────────────────────────────────────────────
const formatTime = (t) => {
  if (!t) return '—';
  const [h, m] = t.split(':');
  const hNum = parseInt(h, 10);
  const period = hNum >= 12 ? 'PM' : 'AM';
  const hours12 = hNum % 12 || 12;
  return `${hours12}:${m} ${period}`;
};

const isUpcoming = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr) >= new Date(new Date().toDateString());
};

const isToday = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr).toDateString() === new Date().toDateString();
};

const isTomorrow = (dateStr) => {
  if (!dateStr) return false;
  const tom = new Date(); tom.setDate(tom.getDate() + 1);
  return new Date(dateStr).toDateString() === tom.toDateString();
};

const isThisWeek = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const midnight = new Date(new Date().toDateString()); // strip time — avoids today being excluded post-midnight UTC
  const weekEnd = new Date(midnight); weekEnd.setDate(midnight.getDate() + 7);
  return d >= midnight && d <= weekEnd;
};

const isThisMonth = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr), now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

// ─── Add Reservation Modal ────────────────────────────────────────────────────
const AddReservationModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customer_name: '', contact: '', date: '', time: '', no_of_persons: '', note: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.customer_name.trim()) e.customer_name = 'Name is required';
    if (!form.contact.match(/^[0-9]{10}$/)) e.contact = 'Enter a valid 10-digit number';
    if (!form.date) e.date = 'Date is required';
    else if (new Date(form.date) < new Date(new Date().toDateString())) e.date = 'Date cannot be in the past';
    if (!form.time) e.time = 'Time is required';
    if (!form.no_of_persons || form.no_of_persons < 1) e.no_of_persons = 'At least 1 person';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/hotel/reservations/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('Reservation added successfully');
        onSuccess();
        onClose();
        setForm({ customer_name: '', contact: '', date: '', time: '', no_of_persons: '', note: '' });
      } else {
        toast.error(data.message || 'Failed to add reservation');
      }
    } catch {
      toast.error('Failed to add reservation');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputCls = (err) => `block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${err ? 'border-red-300' : 'border-gray-200'} bg-gray-50`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Add New Reservation</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
              <input type="text" value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                className={inputCls(errors.customer_name)} placeholder="Enter name" />
              {errors.customer_name && <p className="mt-1 text-xs text-red-500">{errors.customer_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact <span className="text-red-500">*</span></label>
              <input type="tel" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                className={inputCls(errors.contact)} placeholder="10-digit number" />
              {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className={inputCls(errors.date)} />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Time <span className="text-red-500">*</span></label>
              <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className={inputCls(errors.time)} />
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Persons <span className="text-red-500">*</span></label>
            <input type="number" min="1" value={form.no_of_persons} onChange={e => setForm(f => ({ ...f, no_of_persons: e.target.value }))}
              className={inputCls(errors.no_of_persons)} placeholder="e.g. 4" />
            {errors.no_of_persons && <p className="mt-1 text-xs text-red-500">{errors.no_of_persons}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
            <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              rows={2} className={inputCls(false)} placeholder="Special requests, dietary needs…" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              Add Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ reservation, onClose }) {
  if (!reservation) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Reservation Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 divide-y divide-gray-50">
          {[
            ['Customer', reservation.CustomerId?.CustomerName ?? '—'],
            ['Contact', reservation.CustomerId?.Contact ?? '—'],
            ['Date', reservation.Date ?? '—'],
            ['Time', formatTime(reservation.Time)],
            ['Persons', reservation.NoOfPersons ?? '—'],
            ['Notes', reservation.Note || 'None'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-400 font-medium">{label}</span>
              <span className="text-gray-800 font-semibold text-right max-w-[60%]">{value}</span>
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

// ─── Cancel (Delete) Modal ────────────────────────────────────────────────────
function CancelModal({ reservation, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <FaTrash className="text-red-500" size={13} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Cancel Reservation</h3>
            <p className="text-sm text-gray-400">{reservation?.CustomerId?.CustomerName} — {reservation?.Date}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-5">Are you sure you want to cancel this reservation? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Keep it
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hotel/reservations/fetch');
      const data = await res.json();
      if (data.returncode === 200) setReservations(data.output ?? []);
      else toast.error('Failed to fetch reservations');
    } catch {
      toast.error('Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const handleCancel = async () => {
    setCancelLoading(true);
    try {
      const res = await fetch('/api/hotel/reservations/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservation_id: cancelTarget._id }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('Reservation cancelled');
        fetchReservations();
        setCancelTarget(null);
      } else {
        toast.error(data.message || 'Failed to cancel reservation');
      }
    } catch {
      toast.error('Failed to cancel reservation');
    } finally {
      setCancelLoading(false);
    }
  };

  // ── computed stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: reservations.length,
    today: reservations.filter(r => isToday(r.Date)).length,
    upcoming: reservations.filter(r => isUpcoming(r.Date)).length,
    thisWeek: reservations.filter(r => isThisWeek(r.Date)).length,
  }), [reservations]);

  // ── filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = reservations;

    // date filter
    if (dateFilter === 'today') list = list.filter(r => isToday(r.Date));
    if (dateFilter === 'tomorrow') list = list.filter(r => isTomorrow(r.Date));
    if (dateFilter === 'this_week') list = list.filter(r => isThisWeek(r.Date));
    if (dateFilter === 'this_month') list = list.filter(r => isThisMonth(r.Date));

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.CustomerId?.CustomerName?.toLowerCase().includes(q) ||
        r.CustomerId?.Contact?.toLowerCase().includes(q) ||
        r.Date?.includes(q) ||
        r.Note?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [reservations, dateFilter, searchQuery]);

  return (
    <div className="p-4 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reservations</h1>
          <p className="mt-1 text-sm text-gray-500">Manage restaurant table bookings</p>
        </div>
        <button onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
          <PlusIcon className="h-4 w-4" /> Add Reservation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: <FaUsers />, color: 'bg-red-50 text-red-600' },
          { label: 'Today', value: stats.today, icon: <FaCalendarAlt />, color: 'bg-orange-50 text-orange-600' },
          { label: 'Upcoming', value: stats.upcoming, icon: <FaClock />, color: 'bg-blue-50 text-blue-600' },
          { label: 'This Week', value: stats.thisWeek, icon: <FaCalendarAlt />, color: 'bg-green-50 text-green-600' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} flex-shrink-0`}>
              {icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Date Filter */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
            placeholder="Search customer, contact, date…" />
        </div>
        <select value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50">
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-red-600">
                <tr>
                  {['#', 'Date', 'Customer', 'Contact', 'Time', 'Persons', 'Notes', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-14 text-center text-sm text-gray-400">No reservations found</td>
                  </tr>
                ) : filtered.map((r, i) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-sm text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3 text-sm text-gray-800 font-medium">{r.Date ?? '—'}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{r.CustomerId?.CustomerName ?? '—'}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{r.CustomerId?.Contact ?? '—'}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{formatTime(r.Time)}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{r.NoOfPersons ?? '—'}</td>
                    <td className="px-5 py-3 text-sm text-gray-500 max-w-[160px] truncate">{r.Note || '—'}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewTarget(r)}
                          className="p-1.5 bg-orange-50 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors" title="View">
                          <FaEye size={13} />
                        </button>
                        <button onClick={() => setCancelTarget(r)}
                          className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Cancel">
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddReservationModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={fetchReservations} />
      {viewTarget && <ViewModal reservation={viewTarget} onClose={() => setViewTarget(null)} />}
      {cancelTarget && <CancelModal reservation={cancelTarget} loading={cancelLoading}
        onClose={() => setCancelTarget(null)} onConfirm={handleCancel} />}
    </div>
  );
}
