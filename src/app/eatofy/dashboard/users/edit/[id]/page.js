'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import EatofyProtectedRoute from '@/app/eatofy/components/ProtectedRoute';

export default function EditUserInfo() {
	const params = useParams();
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		password: ''
	});

	const eatofyRoles = ['Administration', 'Management', 'Backoffice'];

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
				const userData = data.output;
				setUser(userData);
				setFormData({
					firstName: userData.FirstName || '',
					lastName: userData.LastName || '',
					email: userData.Email || '',
					role: userData.Role || '',
					password: ''
				});
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			const submitData = {
				staff_id: params.id,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				role: formData.role
			};

			if (formData.password) {
				submitData.password = formData.password;
			}

			const response = await fetch('/api/eatofy/staff/edit', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submitData),
			});

			const data = await response.json();

			if (data.returncode === 200) {
				alert('User updated successfully');
				router.push(`/eatofy/dashboard/users/view/${params.id}`);
			} else {
				alert(data.message || 'Failed to update user');
			}
		} catch (error) {
			console.error('Failed to update user:', error);
			alert('Failed to update user');
		} finally {
			setSaving(false);
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
							<h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									First Name *
								</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Last Name *
								</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email *
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Role *
								</label>
								<select
									name="role"
									value={formData.role}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								>
									<option value="">Select Role</option>
									{eatofyRoles.map(role => (
										<option key={role} value={role}>{role}</option>
									))}
								</select>
							</div>

							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									New Password (leave blank to keep current)
								</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									placeholder="Enter new password or leave blank"
								/>
							</div>
						</div>

						<div className="flex justify-end gap-4 pt-6 border-t">
							<button
								type="button"
								onClick={() => router.back()}
								className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={saving}
								className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
							>
								{saving ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
										Saving...
									</>
								) : (
									<>
										<FaSave />
										Save Changes
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</EatofyProtectedRoute>
	);
}
