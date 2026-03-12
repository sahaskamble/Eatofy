'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaEnvelope, FaIdBadge, FaCalendarAlt } from 'react-icons/fa';
import EatofyProtectedRoute from '@/app/eatofy/components/ProtectedRoute';

const ROLE_STYLES = {
	Administration: 'bg-red-100 text-red-700',
	Management: 'bg-blue-100 text-blue-700',
	Backoffice: 'bg-purple-100 text-purple-700',
};

export default function ViewUserInfo() {
	const params = useParams();
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => { fetchUser(); }, [params.id]);

	const fetchUser = async () => {
		try {
			const res = await fetch('/api/eatofy/staff/fetch/id', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ staff_id: params.id }),
			});
			const data = await res.json();
			if (data.returncode === 200) setUser(data.output);
			else setError(data.message || 'Failed to load user');
		} catch {
			setError('Failed to load user');
		} finally {
			setLoading(false);
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

	const initials = `${user?.FirstName?.[0] ?? ''}${user?.LastName?.[0] ?? ''}`;

	return (
		<EatofyProtectedRoute>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-full mx-auto space-y-6">

					{/* Header */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<button onClick={() => router.back()}
								className="p-2 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
								<FaArrowLeft className="text-gray-500" />
							</button>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">User Details</h1>
								<p className="text-sm text-gray-400 mt-0.5">Staff account information</p>
							</div>
						</div>
						<button onClick={() => router.push(`/eatofy/dashboard/users/edit/${params.id}`)}
							className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors">
							<FaEdit size={13} /> Edit
						</button>
					</div>

					{/* Profile card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<div className="flex items-center gap-5">
							<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-red-200 flex-shrink-0">
								{initials}
							</div>
							<div>
								<h2 className="text-xl font-bold text-gray-900">{user?.FirstName} {user?.LastName}</h2>
								<span className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${ROLE_STYLES[user?.Role] ?? 'bg-gray-100 text-gray-700'}`}>
									{user?.Role}
								</span>
							</div>
						</div>
					</div>

					{/* Details */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
						{[
							{ icon: <FaEnvelope className="text-red-400" />, label: 'Email', value: user?.Email },
							{ icon: <FaIdBadge className="text-red-400" />, label: 'User ID', value: user?._id, mono: true },
							{ icon: <FaCalendarAlt className="text-red-400" />, label: 'Created', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A' },
						].map(({ icon, label, value, mono }) => (
							<div key={label} className="flex items-center gap-4 px-6 py-4">
								<div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
									{icon}
								</div>
								<div className="min-w-0">
									<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
									<p className={`text-sm text-gray-800 mt-0.5 truncate ${mono ? 'font-mono text-xs' : 'font-medium'}`}>{value ?? '—'}</p>
								</div>
							</div>
						))}
					</div>

				</div>
			</div>
		</EatofyProtectedRoute>
	);
}
