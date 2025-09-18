'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import EatofyProtectedRoute from '@/app/eatofy/components/ProtectedRoute';

export default function EditHotelInfo() {
	const params = useParams();
	const router = useRouter();
	const [hotel, setHotel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [formData, setFormData] = useState({
		hotel_name: '',
		email: '',
		address: '',
		speciality: '',
		contacts: '',
		website: '',
		fssai_code: '',
		gstin: '',
		logo: null
	});

	useEffect(() => {
		fetchHotelDetails();
	}, [params.id]);

	const fetchHotelDetails = async () => {
		try {
			const response = await fetch('/api/eatofy/hotel/fetch/id', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ hotel_id: params.id }),
			});

			const data = await response.json();

			if (data.returncode === 200) {
				const hotelData = data.output;
				setHotel(hotelData);
				setFormData({
					hotel_name: hotelData.HotelName || '',
					email: hotelData.Email || '',
					address: hotelData.Address || '',
					speciality: hotelData.Speciality || '',
					contacts: hotelData.Contacts?.[0] || '',
					website: hotelData.Website || '',
					fssai_code: hotelData.FSSAICode || '',
					gstin: hotelData.GSTIN || '',
					logo: null
				});
				if (hotelData.Logo) {
					setSelectedImage(`data:image/*;base64,${hotelData.Logo}`);
				}
			} else {
				setError(data.message || 'Failed to fetch hotel details');
			}
		} catch (error) {
			console.error('Error fetching hotel details:', error);
			setError('Failed to fetch hotel details');
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

	const handleLogoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData(prev => ({
				...prev,
				logo: file
			}));
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			// Update hotel details
			const detailsResponse = await fetch('/api/eatofy/hotel/edit/details', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					hotel_id: params.id,
					hotel_name: formData.hotel_name,
					email: formData.email,
					address: formData.address,
					speciality: formData.speciality,
					contacts: formData.contacts,
					website: formData.website,
					fssai_code: formData.fssai_code,
					gstin: formData.gstin
				}),
			});

			const detailsData = await detailsResponse.json();

			if (detailsData.returncode !== 200) {
				throw new Error(detailsData.message || 'Failed to update hotel details');
			}

			// Update logo if a new one was selected
			if (formData.logo) {
				const logoFormData = new FormData();
				logoFormData.append('hotel_id', params.id);
				logoFormData.append('logo', formData.logo);

				const logoResponse = await fetch('/api/eatofy/hotel/edit/logo', {
					method: 'PUT',
					body: logoFormData,
				});

				const logoData = await logoResponse.json();

				if (logoData.returncode !== 200) {
					throw new Error(logoData.message || 'Failed to update hotel logo');
				}
			}

			alert('Hotel updated successfully');
			router.push(`/eatofy/dashboard/hotels/view/${params.id}`);
		} catch (error) {
			console.error('Failed to update hotel:', error);
			alert(error.message || 'Failed to update hotel');
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
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-4">
							<button
								onClick={() => router.back()}
								className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
							>
								<FaArrowLeft className="text-gray-600" />
							</button>
							<h1 className="text-2xl font-bold text-gray-900">Edit Hotel</h1>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Logo Upload */}
						<div className="bg-gray-50 rounded-lg p-6">
							<label className="block text-sm font-medium text-gray-700 mb-4">
								Hotel Logo
							</label>
							<div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
								<div className="space-y-1 text-center">
									{selectedImage ? (
										<div className="flex flex-col items-center">
											<div className="relative w-32 h-32 mb-4">
												<Image
													src={selectedImage}
													alt="Preview"
													fill
													className="rounded-lg object-cover"
												/>
											</div>
											<button
												type="button"
												onClick={() => {
													setSelectedImage(null);
													setFormData(prev => ({ ...prev, logo: null }));
												}}
												className="text-sm text-red-600 hover:text-red-700"
											>
												Remove Image
											</button>
										</div>
									) : (
										<>
											<FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
											<div className="flex text-sm text-gray-600">
												<label htmlFor="logo" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
													<span>Upload a file</span>
													<input
														id="logo"
														name="logo"
														type="file"
														accept="image/*"
														className="sr-only"
														onChange={handleLogoChange}
													/>
												</label>
											</div>
											<p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
										</>
									)}
								</div>
							</div>
						</div>

						{/* Hotel Information */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Hotel Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Hotel Name *
								</label>
								<input
									type="text"
									name="hotel_name"
									value={formData.hotel_name}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>

							{/* Email */}
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

							{/* Contact */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Contact Number *
								</label>
								<input
									type="tel"
									name="contacts"
									value={formData.contacts}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>

							{/* Website */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Website
								</label>
								<input
									type="url"
									name="website"
									value={formData.website}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									placeholder="https://"
								/>
							</div>

							{/* FSSAI Code */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									FSSAI Code *
								</label>
								<input
									type="text"
									name="fssai_code"
									value={formData.fssai_code}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>

							{/* GSTIN */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									GSTIN *
								</label>
								<input
									type="text"
									name="gstin"
									value={formData.gstin}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
									required
								/>
							</div>
						</div>

						{/* Address */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Address *
							</label>
							<textarea
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								rows="3"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
								required
							/>
						</div>

						{/* Speciality */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Speciality *
							</label>
							<input
								type="text"
								name="speciality"
								value={formData.speciality}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
								required
							/>
						</div>

						{/* Action Buttons */}
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
