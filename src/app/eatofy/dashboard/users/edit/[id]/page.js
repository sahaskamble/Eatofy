'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import EatofyProtectedRoute from '@/app/eatofy/components/ProtectedRoute';
import { toast } from 'react-toastify';

const ROLES = ['Administration', 'Management', 'Backoffice'];

export default function EditUserInfo() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [form, setForm] = useState({
		firstName: '', lastName: '', email: '', role: '', password: ''
	});

	useEffect(() => { fetchUser(); }, [params.id]);

	const fetchUser = async () => {
		try {
			const res = await fetch('/api/eatofy/staff/fetch/id', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ staff_id: params.id }),
			});
			const data = await res.json();
			if (data.returncode === 200) {
				const u = data.output;
				setForm({ firstName: u.FirstName || '', lastName: u.LastName || '', email: u.Email || '', role: u.Role || '', password: '' });
			} else {
				setError(data.message || 'Failed to load user');
			}
		} catch {
			setError('Failed to load user');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			const body = {
				staff_id: params.id,
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				role: form.role,
			};
			if (form.password) body.password = form.password;

			const res = await fetch('/api/eatofy/staff/edit', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json();
			if (data.returncode === 200) {
				toast.success('User updated successfully');
				router.push(`/eatofy/dashboard/users/view/${params.id}`);
			} else {
				toast.error(data.message || 'Failed to update user');
			}
		} catch {
			toast.error('Failed to update user');
		} finally {
			setSaving(false);
		}
	};

	if (loading) return (
		<EatofyProtectedRoute>
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
			</div>
		</EatofyProtectedRoute>
	);

	if (error) return (
		<EatofyProtectedRoute>
			<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-sm w-full">
					<p className="text-red-500 font-semibold mb-2">Error</p>
					<p className="text-gray-500 text-sm mb-4">{error}</p>
					<button onClick={() => router.back()}
						className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600">
						Go Back
					</button>
				</div>
			</div>
		</EatofyProtectedRoute>
	);

	return (
		<EatofyProtectedRoute>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-full mx-auto space-y-6">

					{/* Header */}
					<div className="flex items-center gap-4">
						<button onClick={() => router.back()}
							className="p-2 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
							<FaArrowLeft className="text-gray-500" />
						</button>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
							<p className="text-sm text-gray-400 mt-0.5">Update account details</p>
						</div>
					</div>

					{/* Form Card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{[['firstName', 'First Name', 'text'], ['lastName', 'Last Name', 'text']].map(([key, label, type]) => (
									<div key={key}>
										<label className="block text-sm font-semibold text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
										<input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
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
								<label className="block text-sm font-semibold text-gray-700 mb-1">Role <span className="text-red-500">*</span></label>
								<select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required
									className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm">
									<option value="">Select role</option>
									{ROLES.map(r => <option key={r} value={r}>{r}</option>)}
								</select>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">New Password
									<span className="ml-1 text-xs text-gray-400 font-normal">(leave blank to keep current)</span>
								</label>
								<input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
									placeholder="Enter new password"
									className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm" />
							</div>

							<div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
								<button type="button" onClick={() => router.back()} disabled={saving}
									className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50">
									Cancel
								</button>
								<button type="submit" disabled={saving}
									className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
									{saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaSave size={13} />}
									Save Changes
								</button>
							</div>
						</form>
					</div>

				</div>
			</div>
		</EatofyProtectedRoute>
	);
}
