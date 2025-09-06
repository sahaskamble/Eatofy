'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaUser, FaEnvelope, FaUserTag } from 'react-icons/fa';
import EatofyProtectedRoute from '@/app/eatofy/components/ProtectedRoute';

export default function ViewUserInfo() {
	const params = useParams();
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchUserDetails();
	}, [params.id]);

	const fetchUserDetails = async () => {
		try {
			const response = await fetch('/api/eatofy/staff/fetch/id', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ staff_id: params.id }),
			});

			const data = await response.json();

			if (data.returncode === 200) {
				setUser(data.output);
			} else {
				setError(data.message || 'Failed to fetch user details');
			}
		} catch (error) {
			console.error('Error fetching user details:', error);
			setError('Failed to fetch user details');
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<EatofyProtectedRoute>
				<div className="flex justify-center items-center h-screen">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
				</div>
			</EatofyProtectedRoute>
		);
	}

	if (error) {
		return (
			<EatofyProtectedRoute>
				<div className="bg-gray-200 p-4 rounded-xl">
					<div className="bg-white rounded-xl shadow-lg p-6">
						<div className="text-center">
							<div className="text-red-500 text-xl mb-4">Error</div>
							<p className="text-gray-600 mb-4">{error}</p>
							<button
								onClick={() => router.back()}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
							>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</EatofyProtectedRoute>
		);
	}

	return (
		<EatofyProtectedRoute>
			<div className="bg-gray-200 p-4 rounded-xl">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-4">
							<button
								onClick={() => router.back()}
								className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
							>
								<FaArrowLeft className="text-gray-600" />
							</button>
							<h1 className="text-2xl font-bold text-gray-900">User Details</h1>
						</div>
						<button
							onClick={() => router.push(`/eatofy/dashboard/users/edit/${params.id}`)}
							className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
						>
							<FaEdit /> Edit User
						</button>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="bg-gray-50 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<FaUser className="text-red-500" />
								Personal Information
							</h3>
							<div className="space-y-3">
								<div>
									<span className="text-sm font-medium text-gray-500">Full Name:</span>
									<p className="text-gray-700">{user?.FirstName} {user?.LastName}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-gray-500">First Name:</span>
									<p className="text-gray-700">{user?.FirstName}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-gray-500">Last Name:</span>
									<p className="text-gray-700">{user?.LastName}</p>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<FaEnvelope className="text-red-500" />
								Contact Information
							</h3>
							<div className="space-y-3">
								<div>
									<span className="text-sm font-medium text-gray-500">Email:</span>
									<p className="text-gray-700">{user?.Email}</p>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<FaUserTag className="text-red-500" />
								Role Information
							</h3>
							<div className="space-y-3">
								<div>
									<span className="text-sm font-medium text-gray-500">Role:</span>
									<span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
										{user?.Role}
									</span>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
							<div className="space-y-3 text-sm">
								<div>
									<span className="font-medium text-gray-500">User ID:</span>
									<p className="text-gray-700">{user?._id}</p>
								</div>
								<div>
									<span className="font-medium text-gray-500">Created:</span>
									<p className="text-gray-700">
										{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</EatofyProtectedRoute>
	);
}
