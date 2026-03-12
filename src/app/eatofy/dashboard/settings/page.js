'use client';

import { useState } from 'react';
import { useEatofyAuth } from '../../contexts/AuthContext';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { toast } from 'react-toastify';
import {
  FaUser, FaLock, FaIdBadge, FaSignOutAlt, FaTrash,
  FaSave, FaEye, FaEyeSlash, FaShieldAlt, FaExclamationTriangle,
} from 'react-icons/fa';

// ─── Delete Account Modal ─────────────────────────────────────────────────────
function DeleteAccountModal({ onClose, onConfirm, loading }) {
  const [confirm, setConfirm] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <FaExclamationTriangle className="text-red-500" size={14} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Delete Account</h3>
            <p className="text-sm text-gray-400">This cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Type <span className="font-mono font-semibold text-red-600">DELETE</span> to confirm.
        </p>
        <input
          type="text" value={confirm} onChange={e => setConfirm(e.target.value)}
          placeholder="Type DELETE"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm mb-4"
        />
        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading || confirm !== 'DELETE'}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, subtitle, icon, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-gray-900 text-sm">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm";
const readonlyCls = "w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50 text-sm text-gray-500 cursor-not-allowed";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user, logout, checkAuth } = useEatofyAuth();
  const me = user?.[0];

  // Profile
  const [profile, setProfile] = useState({
    firstName: me?.firstName ?? '',
    lastName: me?.lastName ?? '',
    email: me?.email ?? '',
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Password
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
  const [pwSaving, setPwSaving] = useState(false);

  // Danger zone
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const res = await fetch('/api/eatofy/staff/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staff_id: me?.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          role: me?.role,
        }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        // Refresh the JWT so navbar and context reflect new name/email
        await fetch('/api/eatofy/authentication/update-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName: profile.firstName, lastName: profile.lastName, email: profile.email }),
        });
        await checkAuth();
        toast.success('Profile updated');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (passwords.next.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch('/api/eatofy/staff/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staff_id: me?.id,
          firstName: me?.firstName,
          lastName: me?.lastName,
          email: me?.email,
          role: me?.role,
          password: passwords.next,
        }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('Password changed successfully');
        setPasswords({ current: '', next: '', confirm: '' });
      } else {
        toast.error(data.message || 'Failed to change password');
      }
    } catch {
      toast.error('Failed to change password');
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch('/api/eatofy/authentication/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: me?.email }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('Account deleted');
        await logout();
      } else {
        toast.error(data.message || 'Failed to delete account');
        setDeleteOpen(false);
      }
    } catch {
      toast.error('Failed to delete account');
      setDeleteOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const togglePw = (key) => setShowPw(p => ({ ...p, [key]: !p[key] }));

  const ROLE_STYLES = {
    Administration: 'bg-red-100 text-red-700',
    Management: 'bg-blue-100 text-blue-700',
    Backoffice: 'bg-purple-100 text-purple-700',
  };

  return (
    <EatofyProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-full mx-auto space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your account preferences</p>
          </div>

          {/* ── Profile ── */}
          <Section title="Profile" subtitle="Update your name and email" icon={<FaUser size={13} />}>
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input type="text" value={profile.firstName}
                    onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                    className={inputCls} required />
                </Field>
                <Field label="Last Name" required>
                  <input type="text" value={profile.lastName}
                    onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                    className={inputCls} required />
                </Field>
              </div>
              <Field label="Email" required>
                <input type="email" value={profile.email}
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className={inputCls} required />
              </Field>
              <div className="flex justify-end">
                <button type="submit" disabled={profileSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50">
                  {profileSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaSave size={12} />}
                  Save Profile
                </button>
              </div>
            </form>
          </Section>

          {/* ── Security ── */}
          <Section title="Security" subtitle="Change your password" icon={<FaLock size={13} />}>
            <form onSubmit={savePassword} className="space-y-4">
              {[
                ['current', 'Current Password'],
                ['next', 'New Password'],
                ['confirm', 'Confirm New Password'],
              ].map(([key, label]) => (
                <Field key={key} label={label} required>
                  <div className="relative">
                    <input
                      type={showPw[key] ? 'text' : 'password'}
                      value={passwords[key]}
                      onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                      className={`${inputCls} pr-10`} required
                    />
                    <button type="button" onClick={() => togglePw(key)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw[key] ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                    </button>
                  </div>
                </Field>
              ))}
              <p className="text-xs text-gray-400">Minimum 6 characters</p>
              <div className="flex justify-end">
                <button type="submit" disabled={pwSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50">
                  {pwSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaShieldAlt size={12} />}
                  Change Password
                </button>
              </div>
            </form>
          </Section>

          {/* ── Account Info ── */}
          <Section title="Account Info" subtitle="Your account details" icon={<FaIdBadge size={13} />}>
            <div className="space-y-3">
              <Field label="Role">
                <div className="pt-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${ROLE_STYLES[me?.role] ?? 'bg-gray-100 text-gray-700'}`}>
                    {me?.role ?? '—'}
                  </span>
                </div>
              </Field>
              <Field label="User ID">
                <input type="text" value={me?.id ?? '—'} readOnly className={`${readonlyCls} font-mono text-xs`} />
              </Field>
            </div>
          </Section>

          {/* ── Danger Zone ── */}
          <Section title="Danger Zone" subtitle="Irreversible actions" icon={<FaExclamationTriangle size={13} />}>
            <div className="space-y-3">
              {/* Logout */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Sign out</p>
                  <p className="text-xs text-gray-400 mt-0.5">End your current session</p>
                </div>
                <button onClick={handleLogout} disabled={logoutLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">
                  {logoutLoading ? <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" /> : <FaSignOutAlt size={12} />}
                  Sign Out
                </button>
              </div>

              {/* Delete */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50">
                <div>
                  <p className="text-sm font-semibold text-red-800">Delete account</p>
                  <p className="text-xs text-red-400 mt-0.5">Permanently remove your account</p>
                </div>
                <button onClick={() => setDeleteOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                  <FaTrash size={11} /> Delete
                </button>
              </div>
            </div>
          </Section>

        </div>
      </div>

      {deleteOpen && (
        <DeleteAccountModal
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDeleteAccount}
          loading={deleteLoading}
        />
      )}
    </EatofyProtectedRoute>
  );
}
