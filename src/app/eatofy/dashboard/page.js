'use client';

import { useEatofyAuth } from '../contexts/AuthContext';
import EatofyProtectedRoute from '../components/ProtectedRoute';
import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import {
  FaStore,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
  FaUsers,
  FaBox,
  FaCog,
  FaExclamationTriangle,
  FaArrowRight,
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

// ─── helpers ────────────────────────────────────────────────────────────────

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function StatusBadge({ days }) {
  if (days === null) return <span className="badge badge-gray">Unknown</span>;
  if (days < 0) return <span className="badge badge-red">Expired</span>;
  if (days <= 7) return <span className="badge badge-orange">Expires in {days}d</span>;
  if (days <= 30) return <span className="badge badge-yellow">Expires in {days}d</span>;
  return <span className="badge badge-green">Active</span>;
}

// ─── stat card ───────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, accent }) {
  const accents = {
    red: 'from-red-500 to-red-700 shadow-red-200',
    green: 'from-emerald-500 to-emerald-700 shadow-emerald-200',
    gray: 'from-gray-500 to-gray-700 shadow-gray-200',
    amber: 'from-amber-400 to-amber-600 shadow-amber-200',
  };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accents[accent]} flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── quick action ─────────────────────────────────────────────────────────────

function QuickAction({ icon, label, href, desc }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all"
    >
      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-lg group-hover:bg-red-500 group-hover:text-white transition-colors flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">{label}</p>
        <p className="text-xs text-gray-400 truncate">{desc}</p>
      </div>
      <FaArrowRight className="text-gray-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, dashboard, hotels, fetchDashboardData } = useEatofyAuth();

  // Always re-fetch on mount so _subscription data is fresh
  useEffect(() => { fetchDashboardData(); }, []);

  const totalHotels = dashboard?.total_hotels ?? 0;
  const subscribedCount = dashboard?.total_subscribed_hotels ?? 0;
  const unsubscribedCount = Math.max(0, totalHotels - subscribedCount);
  const subscriptionRate = totalHotels > 0 ? Math.round((subscribedCount / totalHotels) * 100) : 0;

  // Build list of subscribed hotels with expiry info
  const subscribedHotels = useMemo(() => {
    const raw = dashboard?.subscribed_hotels?.output ?? [];
    return raw
      .map((h) => ({
        id: h._id,
        name: h.HotelName,
        email: h.Email,
        endDate: h._subscription?.EndDate ?? null,
        daysLeft: daysUntil(h._subscription?.EndDate),
        payStatus: h._subscription?.PaymentStatus ?? '—',
      }))
      .sort((a, b) => (a.daysLeft ?? 9999) - (b.daysLeft ?? 9999));
  }, [dashboard]);

  // Alerts: expiring ≤ 7 days or already expired
  const alerts = subscribedHotels.filter(
    (h) => h.daysLeft !== null && h.daysLeft <= 7
  );

  const firstName = user?.[0]?.firstName ?? '';
  const lastName = user?.[0]?.lastName ?? '';
  const role = user?.[0]?.role ?? '';
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`;

  return (
    <EatofyProtectedRoute>
      <style>{`
        .badge { display:inline-flex; align-items:center; padding:2px 10px; border-radius:9999px; font-size:11px; font-weight:600; }
        .badge-green  { background:#d1fae5; color:#065f46; }
        .badge-yellow { background:#fef9c3; color:#92400e; }
        .badge-orange { background:#ffedd5; color:#9a3412; }
        .badge-red    { background:#fee2e2; color:#991b1b; }
        .badge-gray   { background:#f3f4f6; color:#374151; }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-200">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
                <span className="text-red-600">{firstName}</span>
              </h1>
              <p className="text-sm text-gray-400">{role} · Eatofy Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
            <MdDashboard className="text-red-500" />
            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {/* ── Alerts ── */}
        {alerts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {alerts.length} subscription{alerts.length > 1 ? 's' : ''} expiring soon
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                {alerts.map((a) => a.name).join(', ')}
              </p>
            </div>
            <Link href="/eatofy/dashboard/hotels" className="ml-auto text-xs font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap flex items-center gap-1">
              View <FaArrowRight />
            </Link>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FaStore />} label="Total Hotels" value={totalHotels} sub="Registered on platform" accent="red" />
          <StatCard icon={<FaCheckCircle />} label="Subscribed" value={subscribedCount} sub="Active subscriptions" accent="green" />
          <StatCard icon={<FaTimesCircle />} label="Unsubscribed" value={unsubscribedCount} sub="No active subscription" accent="gray" />
          <StatCard icon={<FaChartPie />} label="Subscription Rate" value={`${subscriptionRate}%`} sub="Of total hotels" accent="amber" />
        </div>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Subscribed Hotels Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">Subscribed Hotels</h2>
              <Link href="/eatofy/dashboard/hotels" className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1">
                View all <FaArrowRight />
              </Link>
            </div>

            {subscribedHotels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                <FaStore size={32} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">No subscribed hotels yet</p>
                <p className="text-xs mt-1">Hotels with active plans will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="px-5 py-3 text-left">Hotel</th>
                      <th className="px-5 py-3 text-left">Email</th>
                      <th className="px-5 py-3 text-left">Expiry</th>
                      <th className="px-5 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {subscribedHotels.slice(0, 8).map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {h.name?.[0] ?? '?'}
                            </div>
                            {h.name ?? '—'}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-500 truncate max-w-[160px]">{h.email ?? '—'}</td>
                        <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                          {h.endDate ? new Date(h.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge days={h.daysLeft} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions + Summary */}
          <div className="space-y-4">

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <QuickAction icon={<FaStore />} label="Manage Hotels" href="/eatofy/dashboard/hotels" desc="Add, edit or view all hotels" />
                <QuickAction icon={<FaUsers />} label="Manage Users" href="/eatofy/dashboard/users" desc="Admin and staff accounts" />
                <QuickAction icon={<FaBox />} label="Subscriptions" href="/eatofy/dashboard/subscriptions" desc="Plans, payments & renewals" />
                <QuickAction icon={<FaCog />} label="Settings" href="/eatofy/dashboard/settings" desc="System configuration" />
              </div>
            </div>

            {/* Subscription Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4">Subscription Breakdown</h2>
              {totalHotels === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {/* Subscribed bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                      <span>Subscribed</span>
                      <span>{subscribedCount} / {totalHotels}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${subscriptionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Expiring soon bar */}
                  {(() => {
                    const expiringSoon = subscribedHotels.filter(h => h.daysLeft !== null && h.daysLeft >= 0 && h.daysLeft <= 30).length;
                    const pct = subscribedCount > 0 ? Math.round((expiringSoon / subscribedCount) * 100) : 0;
                    return (
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                          <span>Expiring ≤ 30 days</span>
                          <span>{expiringSoon}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Unsubscribed bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                      <span>Unsubscribed</span>
                      <span>{unsubscribedCount} / {totalHotels}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full transition-all duration-700"
                        style={{ width: `${100 - subscriptionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </EatofyProtectedRoute>
  );
}
