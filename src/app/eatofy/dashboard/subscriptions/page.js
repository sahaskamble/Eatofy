'use client';

import { useEatofyAuth } from '../../contexts/AuthContext';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaBox, FaTag, FaClock, FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

// ─── API helpers ─────────────────────────────────────────────────────────────

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return res.json();
}

// ─── Plan Modal (create + edit) ───────────────────────────────────────────────

function PlanModal({ plan, onClose, onSuccess }) {
  const isEdit = !!plan;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    subscription_name: plan?.SubscriptionName ?? '',
    validity: plan?.Validity ?? '',
    price: plan?.Price ?? '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subscription_name.trim() || !form.validity || !form.price) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const payload = isEdit
        ? { subscription_id: plan._id, ...form, validity: parseInt(form.validity), price: parseInt(form.price) }
        : { ...form, validity: parseInt(form.validity), price: parseInt(form.price) };

      const data = await apiFetch(
        isEdit ? '/api/eatofy/subscription/edit' : '/api/eatofy/subscription/add',
        { method: isEdit ? 'PUT' : 'POST', body: JSON.stringify(payload) }
      );

      if (data.returncode === 200) {
        toast.success(isEdit ? 'Plan updated' : 'Plan created');
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch {
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Plan' : 'Create Plan'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Plan Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.subscription_name}
              onChange={e => setForm(f => ({ ...f, subscription_name: e.target.value }))}
              placeholder="e.g. Basic, Pro, Enterprise"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Validity (days) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.validity}
                onChange={e => setForm(f => ({ ...f, validity: e.target.value }))}
                placeholder="30"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                placeholder="999"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm"
                required
              />
            </div>
          </div>

          {/* Preview */}
          {form.subscription_name && form.validity && form.price && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-red-700">{form.subscription_name}</span>
              <span className="text-gray-500">{form.validity} days</span>
              <span className="font-bold text-gray-800">₹{parseInt(form.price).toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isEdit ? 'Saving...' : 'Creating...'}</>
                : isEdit ? 'Save Changes' : 'Create Plan'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({ plan, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/eatofy/subscription/remove', {
        method: 'DELETE',
        body: JSON.stringify({ subscription_id: plan._id }),
      });
      if (data.returncode === 200) {
        toast.success('Plan deleted');
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <FaTrash className="text-red-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 text-center">Delete Plan?</h2>
        <p className="text-sm text-gray-400 text-center mt-1">
          "<span className="font-medium text-gray-600">{plan.SubscriptionName}</span>" will be permanently removed.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : 'Delete'
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, onEdit, onDelete }) {
  const pricePerDay = plan.Validity > 0
    ? (plan.Price / plan.Validity).toFixed(1)
    : '—';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <FaBox className="text-red-500" size={16} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{plan.SubscriptionName}</h3>
            <p className="text-xs text-gray-400 mt-0.5">₹{pricePerDay}/day</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(plan)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit plan">
            <FaEdit size={13} />
          </button>
          <button onClick={() => onDelete(plan)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete plan">
            <FaTrash size={13} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
            <FaClock className="text-amber-500" size={11} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Validity</p>
            <p className="text-sm font-bold text-gray-800">{plan.Validity} days</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
            <FaRupeeSign className="text-emerald-500" size={11} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-sm font-bold text-gray-800">₹{parseInt(plan.Price).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  const { user } = useEatofyAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planModal, setPlanModal] = useState(null); // null | 'create' | plan object (edit)
  const [deleteModal, setDeleteModal] = useState(null); // null | plan object

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/eatofy/subscription/fetch');
      setSubscriptions(data.output || []);
    } catch {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSubscriptions(); }, []);

  const totalRevenuePotential = subscriptions.reduce((s, p) => s + (parseInt(p.Price) || 0), 0);

  return (
    <EatofyProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
            <p className="text-sm text-gray-400 mt-0.5">Create and manage the plans you offer to hotels</p>
          </div>
          <button
            onClick={() => setPlanModal('create')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-red-200"
          >
            <FaPlus size={11} /> New Plan
          </button>
        </div>

        {/* Summary row */}
        {!loading && subscriptions.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Plans', value: subscriptions.length, icon: <FaBox />, color: 'bg-red-50 text-red-500' },
              { label: 'Avg. Validity', value: `${Math.round(subscriptions.reduce((s, p) => s + parseInt(p.Validity || 0), 0) / subscriptions.length)} days`, icon: <FaClock />, color: 'bg-amber-50 text-amber-500' },
              { label: 'Price Range', value: `₹${Math.min(...subscriptions.map(p => parseInt(p.Price || 0))).toLocaleString('en-IN')} – ₹${Math.max(...subscriptions.map(p => parseInt(p.Price || 0))).toLocaleString('en-IN')}`, icon: <FaRupeeSign />, color: 'bg-emerald-50 text-emerald-500' },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-sm flex-shrink-0`}>{icon}</div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-bold text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Plans grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-gray-400">
            <FaBox size={36} className="mb-3 opacity-30" />
            <p className="font-semibold text-gray-500">No subscription plans yet</p>
            <p className="text-sm mt-1 mb-5">Create your first plan to get started</p>
            <button
              onClick={() => setPlanModal('create')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <FaPlus size={11} /> Create First Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subscriptions.map(plan => (
              <PlanCard
                key={plan._id}
                plan={plan}
                onEdit={p => setPlanModal(p)}
                onDelete={p => setDeleteModal(p)}
              />
            ))}

            {/* Add new plan card */}
            <button
              onClick={() => setPlanModal('create')}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50/30 flex flex-col items-center justify-center gap-2 p-5 text-gray-400 hover:text-red-400 transition-all min-h-[160px]"
            >
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
                <FaPlus size={14} />
              </div>
              <span className="text-sm font-medium">Add New Plan</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {planModal && (
        <PlanModal
          plan={planModal === 'create' ? null : planModal}
          onClose={() => setPlanModal(null)}
          onSuccess={loadSubscriptions}
        />
      )}
      {deleteModal && (
        <DeleteModal
          plan={deleteModal}
          onClose={() => setDeleteModal(null)}
          onSuccess={loadSubscriptions}
        />
      )}
    </EatofyProtectedRoute>
  );
}
