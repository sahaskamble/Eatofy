'use client';

import { useEatofyAuth } from '../../contexts/AuthContext';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCloudUploadAlt, FaEye, FaBox } from 'react-icons/fa';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// ─── helpers ────────────────────────────────────────────────────────────────

function daysUntil(dateStr) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
}

function SubscriptionBadge({ hotel, subscribedMap }) {
  const sub = subscribedMap[hotel._id];
  if (!sub) return <span className="badge badge-gray">No Subscription</span>;
  const days = daysUntil(sub.EndDate);
  if (days === null || days < 0) return <span className="badge badge-red">Expired</span>;
  if (days <= 7) return <span className="badge badge-orange">Expires in {days}d</span>;
  if (days <= 30) return <span className="badge badge-yellow">Expires in {days}d</span>;
  return <span className="badge badge-green">Active</span>;
}
// ─── Add Subscription Modal ──────────────────────────────────────────────────

function AddSubscriptionModal({ hotel, onClose, onSuccess }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    subscription_id: '',
    start_date: '',
    end_date: '',
    payment_status: '',
    payment_mode: '',
    cash: '',
    upi: '',
    credit_card: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/eatofy/subscription/fetch');
        const data = await res.json();
        setPlans(data.output || []);
        if (data.output?.length > 0) {
          setForm(f => ({ ...f, subscription_id: data.output[0]._id }));
        }
      } catch {
        toast.error('Failed to load subscription plans');
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  // Auto-calculate end date when plan or start date changes
  useEffect(() => {
    if (!form.subscription_id || !form.start_date) return;
    const plan = plans.find(p => p._id === form.subscription_id);
    if (!plan?.Validity) return;
    const end = new Date(form.start_date);
    end.setDate(end.getDate() + parseInt(plan.Validity));
    setForm(f => ({ ...f, end_date: end.toISOString().split('T')[0] }));
  }, [form.subscription_id, form.start_date, plans]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subscription_id || !form.start_date || !form.end_date || !form.payment_status || !form.payment_mode) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/eatofy/hotel_subscription/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel_id: hotel._id,
          subscription_id: form.subscription_id,
          is_valid: true,
          start_date: form.start_date,
          end_date: form.end_date,
          payment_status: form.payment_status,
          payment_mode: form.payment_mode,
          cash: parseInt(form.cash) || 0,
          upi: parseInt(form.upi) || 0,
          credit_card: parseInt(form.credit_card) || 0,
        }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success(`Subscription added to ${hotel.HotelName}`);
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to add subscription');
      }
    } catch {
      toast.error('Failed to add subscription');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = plans.find(p => p._id === form.subscription_id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Subscription</h2>
            <p className="text-sm text-gray-400 mt-0.5">{hotel.HotelName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        {fetching ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-16 px-6">
            <FaBox size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No subscription plans found</p>
            <p className="text-sm text-gray-400 mt-1">Create plans from the Subscriptions page first</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Plan selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subscription Plan <span className="text-red-500">*</span></label>
              <select
                value={form.subscription_id}
                onChange={e => setForm(f => ({ ...f, subscription_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-sm"
                required
              >
                {plans.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.SubscriptionName} — ₹{p.Price} / {p.Validity} days
                  </option>
                ))}
              </select>
              {selectedPlan && (
                <p className="text-xs text-gray-400 mt-1">
                  Validity: {selectedPlan.Validity} days · Price: ₹{selectedPlan.Price}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">End Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.end_date}
                  onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-sm"
                  required
                />
                <p className="text-xs text-gray-400 mt-0.5">Auto-calculated from plan validity</p>
              </div>
            </div>

            {/* Payment */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Status <span className="text-red-500">*</span></label>
                <select
                  value={form.payment_status}
                  onChange={e => setForm(f => ({ ...f, payment_status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-sm"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Part-Paid">Part-Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode <span className="text-red-500">*</span></label>
                <select
                  value={form.payment_mode}
                  onChange={e => setForm(f => ({ ...f, payment_mode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-sm"
                  required
                >
                  <option value="">Select mode</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit-Card">Credit Card</option>
                  <option value="Part">Part</option>
                  <option value="Due">Due</option>
                </select>
              </div>
            </div>

            {/* Amount breakdown */}
            <div className="grid grid-cols-3 gap-3">
              {[['cash', 'Cash (₹)'], ['upi', 'UPI (₹)'], ['credit_card', 'Card (₹)']].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                  <input
                    type="number"
                    min="0"
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-sm"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Adding...</> : 'Add Subscription'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HotelsPage() {
  const { hotels, loading, fetchHotelData } = useEatofyAuth();
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [subModal, setSubModal] = useState(null); // hotel object or null
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | subscribed | unsubscribed
  const [subscribedMap, setSubscribedMap] = useState({}); // hotelId -> { EndDate, ... }
  const [formData, setFormData] = useState({
    hotel_name: '', email: '', address: '', speciality: '', contacts: '',
    website: '', fssai_code: '', gstin: '', logo: null,
    first_name: '', last_name: '', owner_address: '', owner_contact: '',
    password: '', department_name: '', designation: ''
  });
  const router = useRouter();

  // Fetch subscribed hotels directly — don't rely on the dashboard context
  // which may be stale or not yet hydrated when this page mounts.
  const fetchSubscribedMap = useCallback(async () => {
    try {
      const res = await fetch('/api/eatofy/hotel_subscription/fetch/subscribed');
      const data = await res.json();
      if (data.returncode === 200) {
        const map = {};
        (data.output ?? []).forEach(h => {
          // After CRUD fix, _subscription contains EndDate etc.
          // Falls back to empty object for backwards compat.
          map[h._id] = h._subscription ?? {};
        });
        setSubscribedMap(map);
      }
    } catch {
      // non-fatal — badges just won't show
    }
  }, []);

  useEffect(() => { fetchSubscribedMap(); }, [fetchSubscribedMap]);

  // Filtered hotels
  const filteredHotels = useMemo(() => {
    let list = hotels ?? [];
    if (filter === 'subscribed') list = list.filter(h => subscribedMap[h._id]);
    if (filter === 'unsubscribed') list = list.filter(h => !subscribedMap[h._id]);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(h =>
        h.HotelName?.toLowerCase().includes(q) ||
        h.Email?.toLowerCase().includes(q) ||
        h.Address?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [hotels, subscribedMap, filter, search]);

  const handleInput = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(p => ({ ...p, logo: file }));
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(formData).forEach(k => fd.append(k, formData[k]));
      const res = await fetch('/api/eatofy/hotel/add', { method: 'POST', body: fd });
      if (res.ok) {
        await fetchHotelData();
        setIsAddHotelOpen(false);
        resetForm();
        toast.success('Hotel added successfully');
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to add hotel');
      }
    } catch {
      toast.error('Failed to add hotel');
    }
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const res = await fetch('/api/eatofy/hotel/remove/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotel_id: hotelId })
      });
      if (res.ok) {
        await fetchHotelData();
        toast.success('Hotel deleted');
      } else {
        toast.error('Failed to delete hotel');
      }
    } catch {
      toast.error('Failed to delete hotel');
    }
  };

  const resetForm = () => {
    setFormData({
      hotel_name: '', email: '', address: '', speciality: '', contacts: '',
      website: '', fssai_code: '', gstin: '', logo: null,
      first_name: '', last_name: '', owner_address: '', owner_contact: '',
      password: '', department_name: '', designation: ''
    });
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
      </div>
    );
  }

  const totalCount = hotels?.length ?? 0;
  const subscribedCount = Object.keys(subscribedMap).length;
  const unsubscribedCount = totalCount - subscribedCount;

  return (
    <EatofyProtectedRoute>
      <style>{`
        .badge { display:inline-flex;align-items:center;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600; }
        .badge-green  { background:#d1fae5;color:#065f46; }
        .badge-yellow { background:#fef9c3;color:#92400e; }
        .badge-orange { background:#ffedd5;color:#9a3412; }
        .badge-red    { background:#fee2e2;color:#991b1b; }
        .badge-gray   { background:#f3f4f6;color:#374151; }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotels</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage all registered hotels and their subscriptions</p>
          </div>
          <button
            onClick={() => setIsAddHotelOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-red-200"
          >
            <FaPlus size={12} /> Add Hotel
          </button>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { key: 'all', label: 'All Hotels', count: totalCount, color: 'bg-gray-100 text-gray-700' },
            { key: 'subscribed', label: 'Subscribed', count: subscribedCount, color: 'bg-emerald-100 text-emerald-700' },
            { key: 'unsubscribed', label: 'Unsubscribed', count: unsubscribedCount, color: 'bg-red-100 text-red-700' },
          ].map(({ key, label, count, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2 ${filter === key ? 'border-red-500 ring-1 ring-red-400' : 'border-transparent'} ${color}`}
            >
              {label} <span className="ml-1 opacity-70">({count})</span>
            </button>
          ))}

          {/* Search */}
          <div className="ml-auto relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search hotels..."
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white w-56"
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredHotels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
              </svg>
              <p className="font-medium">No hotels found</p>
              <p className="text-sm mt-1">Try adjusting your filter or search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">#</th>
                    <th className="px-5 py-3 text-left">Hotel</th>
                    <th className="px-5 py-3 text-left">Contact</th>
                    <th className="px-5 py-3 text-left">Location</th>
                    <th className="px-5 py-3 text-left">Subscription</th>
                    <th className="px-5 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredHotels.map((hotel, i) => {
                    const isSubscribed = !!subscribedMap[hotel._id];
                    return (
                      <tr key={hotel._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-gray-400 font-medium">{i + 1}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              {hotel.Logo ? (
                                <Image
                                  src={`data:image/*;base64,${hotel.Logo}`}
                                  alt={hotel.HotelName}
                                  width={36} height={36}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-red-500 bg-red-50">
                                  {hotel.HotelName?.[0]}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{hotel.HotelName}</p>
                              <p className="text-xs text-gray-400">{hotel.Email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-500">{hotel.Contacts?.[0] ?? '—'}</td>
                        <td className="px-5 py-3 text-gray-500 max-w-[200px] truncate">{hotel.Address ?? '—'}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <SubscriptionBadge hotel={hotel} subscribedMap={subscribedMap} />
                            {!isSubscribed && (
                              <button
                                onClick={() => setSubModal(hotel)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                              >
                                <FaPlus size={9} /> Add
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => router.push(`/eatofy/dashboard/hotels/view/${hotel._id}`)}
                              className="p-2 bg-orange-50 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors"
                              title="View"
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              onClick={() => router.push(`/eatofy/dashboard/hotels/edit/${hotel._id}`)}
                              className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(hotel._id)}
                              className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Subscription Modal */}
      {subModal && (
        <AddSubscriptionModal
          hotel={subModal}
          onClose={() => setSubModal(null)}
          onSuccess={() => { fetchHotelData(); fetchSubscribedMap(); }}
        />
      )}

      {/* Add Hotel Modal */}
      {isAddHotelOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-gray-900">Add New Hotel</h2>
              <button onClick={() => { setIsAddHotelOpen(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes className="text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddHotel} className="p-6 space-y-4">
              {/* Logo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hotel Logo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                  {selectedImage ? (
                    <div className="flex flex-col items-center gap-3">
                      <Image src={selectedImage} alt="Preview" width={80} height={80} className="rounded-xl object-cover" />
                      <button type="button" onClick={() => { setSelectedImage(null); setFormData(p => ({ ...p, logo: null })); }}
                        className="text-sm text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ) : (
                    <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600">
                      <FaCloudUploadAlt size={28} />
                      <span className="text-sm font-medium text-red-500">Upload logo</span>
                      <span className="text-xs">PNG, JPG up to 5MB</span>
                      <input id="logo-upload" name="logo" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['hotel_name', 'Hotel Name', 'text', true],
                  ['email', 'Email', 'email', true],
                  ['contacts', 'Contact Number', 'tel', true],
                  ['website', 'Website', 'text', false],
                  ['fssai_code', 'FSSAI Code', 'text', true],
                  ['gstin', 'GSTIN', 'text', true],
                ].map(([name, label, type, req]) => (
                  <div key={name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {req && <span className="text-red-500">*</span>}</label>
                    <input type={type} name={name} value={formData[name]} onChange={handleInput} required={req} placeholder={name === 'website' ? 'https://' : ''}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                  <textarea name="address" value={formData.address} onChange={handleInput} rows={2} required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Speciality <span className="text-red-500">*</span></label>
                  <input type="text" name="speciality" value={formData.speciality} onChange={handleInput} required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
                </div>
              </div>

              {/* Owner section */}
              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Owner Account</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ['first_name', 'First Name', 'text'],
                    ['last_name', 'Last Name', 'text'],
                    ['owner_contact', 'Contact', 'tel'],
                    ['password', 'Password', 'password'],
                    ['department_name', 'Department', 'text'],
                    ['designation', 'Designation', 'text'],
                  ].map(([name, label, type]) => (
                    <div key={name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
                      <input type={type} name={name} value={formData[name]} onChange={handleInput} required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Owner Address <span className="text-red-500">*</span></label>
                    <textarea name="owner_address" value={formData.owner_address} onChange={handleInput} rows={2} required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setIsAddHotelOpen(false); resetForm(); }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                  Save Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </EatofyProtectedRoute>
  );
}
