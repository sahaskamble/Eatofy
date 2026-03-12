'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEye, FaSearch, FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import EatofyProtectedRoute from '../../components/ProtectedRoute';
import { toast } from 'react-toastify';

const ROLES = ['Administration', 'Management', 'Backoffice'];

const ROLE_STYLES = {
  Administration: 'bg-red-100 text-red-700',
  Management: 'bg-blue-100 text-blue-700',
  Backoffice: 'bg-purple-100 text-purple-700',
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ user, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <FaTrash className="text-red-500" size={14} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Delete User</h3>
            <p className="text-sm text-gray-400">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-900">{user?.FirstName} {user?.LastName}</span>?
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add User Modal ───────────────────────────────────────────────────────────
function AddUserModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/eatofy/authentication/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('User added successfully');
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to add user');
      }
    } catch {
      toast.error('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Staff Member</h2>
            <p className="text-sm text-gray-400 mt-0.5">Create a new Eatofy account</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
                <input type="text" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Role <span className="text-red-500">*</span></label>
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm">
              <option value="">Select a role</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const router = useRouter();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/eatofy/staff/fetch');
      const data = await res.json();
      if (data.returncode === 200) setStaff(data.output ?? []);
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch('/api/eatofy/staff/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: deleteTarget.Email }),
      });
      const data = await res.json();
      if (data.returncode === 200) {
        toast.success('User deleted');
        fetchUsers();
        setDeleteTarget(null);
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    } catch {
      toast.error('Failed to delete user');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let list = staff;
    if (roleFilter !== 'all') list = list.filter(u => u.Role === roleFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(u =>
        `${u.FirstName} ${u.LastName}`.toLowerCase().includes(q) ||
        u.Email?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [staff, roleFilter, search]);

  const roleCounts = useMemo(() =>
    ROLES.reduce((acc, r) => ({ ...acc, [r]: staff.filter(u => u.Role === r).length }), {}),
    [staff]
  );

  if (loading) return (
    <EatofyProtectedRoute>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
      </div>
    </EatofyProtectedRoute>
  );

  return (
    <EatofyProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage Eatofy staff accounts</p>
          </div>
          <button onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-red-200">
            <FaPlus size={12} /> Add User
          </button>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setRoleFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2 bg-gray-100 text-gray-700 ${roleFilter === 'all' ? 'border-red-500 ring-1 ring-red-400' : 'border-transparent'}`}>
            All <span className="opacity-70">({staff.length})</span>
          </button>
          {ROLES.map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2 ${ROLE_STYLES[r]} ${roleFilter === r ? 'border-red-500 ring-1 ring-red-400' : 'border-transparent'}`}>
              {r} <span className="opacity-70">({roleCounts[r] ?? 0})</span>
            </button>
          ))}

          {/* Search */}
          <div className="ml-auto relative">
            <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white w-52" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FaUsers size={32} className="mb-3 opacity-30" />
              <p className="font-medium">No users found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">#</th>
                    <th className="px-5 py-3 text-left">Name</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Role</th>
                    <th className="px-5 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((user, i) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-400 font-medium">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {user.FirstName?.[0]}{user.LastName?.[0]}
                          </div>
                          <span className="font-semibold text-gray-800">{user.FirstName} {user.LastName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{user.Email}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${ROLE_STYLES[user.Role] ?? 'bg-gray-100 text-gray-700'}`}>
                          {user.Role}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => router.push(`/eatofy/dashboard/users/view/${user._id}`)}
                            className="p-2 bg-orange-50 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors" title="View">
                            <FaEye size={13} />
                          </button>
                          <button onClick={() => router.push(`/eatofy/dashboard/users/edit/${user._id}`)}
                            className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                            <FaEdit size={13} />
                          </button>
                          <button onClick={() => setDeleteTarget(user)}
                            className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
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
      </div>

      {isAddOpen && <AddUserModal onClose={() => setIsAddOpen(false)} onSuccess={fetchUsers} />}
      {deleteTarget && (
        <DeleteModal user={deleteTarget} loading={deleteLoading}
          onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
      )}
    </EatofyProtectedRoute>
  );
}
