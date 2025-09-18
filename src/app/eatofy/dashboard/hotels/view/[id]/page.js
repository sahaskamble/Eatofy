'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCertificate, FaUtensils } from 'react-icons/fa';
import Image from 'next/image';
import EatofyProtectedRoute from '@/app/eatofy/components/ProtectedRoute';

export default function ViewHotelInfo() {
	const params = useParams();
	const router = useRouter();
	const [hotel, setHotel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
				setHotel(data.output);
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
							<h1 className="text-2xl font-bold text-gray-900">Hotel Details</h1>
						</div>
						<button
							onClick={() => router.push(`/eatofy/dashboard/hotels/edit/${params.id}`)}
							className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
						>
							<FaEdit /> Edit Hotel
						</button>
					</div>

					{/* Hotel Info */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Logo and Basic Info */}
						<div className="lg:col-span-1">
							<div className="bg-gray-50 rounded-lg p-6 text-center">
								<div className="w-32 h-32 mx-auto mb-4 relative">
									<Image
										src={hotel?.Logo ? `data:image/*;base64,${hotel.Logo}` : '/placeholder-hotel.png'}
										alt={hotel?.HotelName || 'Hotel Logo'}
										fill
										className="rounded-full object-cover"
									/>
								</div>
								<h2 className="text-xl font-bold text-gray-900 mb-2">{hotel?.HotelName}</h2>
								<p className="text-gray-600 mb-4">{hotel?.Speciality}</p>
							</div>
						</div>

						{/* Detailed Information */}
						<div className="lg:col-span-2">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Contact Information */}
								<div className="bg-gray-50 rounded-lg p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<FaPhone className="text-red-500" />
										Contact Information
									</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<FaEnvelope className="text-gray-500" />
											<span className="text-gray-700">{hotel?.Email}</span>
										</div>
										<div className="flex items-center gap-3">
											<FaPhone className="text-gray-500" />
											<span className="text-gray-700">{hotel?.Contacts?.[0]}</span>
										</div>
										{hotel?.Website && (
											<div className="flex items-center gap-3">
												<FaGlobe className="text-gray-500" />
												<a
													href={hotel.Website}
													target="_blank"
													rel="noopener noreferrer"
													className="text-red-500 hover:text-red-600 underline"
												>
													{hotel.Website}
												</a>
											</div>
										)}
									</div>
								</div>

								{/* Address */}
								<div className="bg-gray-50 rounded-lg p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<FaMapMarkerAlt className="text-red-500" />
										Address
									</h3>
									<p className="text-gray-700 leading-relaxed">{hotel?.Address}</p>
								</div>

								{/* Legal Information */}
								<div className="bg-gray-50 rounded-lg p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<FaCertificate className="text-red-500" />
										Legal Information
									</h3>
									<div className="space-y-3">
										<div>
											<span className="text-sm font-medium text-gray-500">FSSAI Code:</span>
											<p className="text-gray-700">{hotel?.FSSAICode}</p>
										</div>
										<div>
											<span className="text-sm font-medium text-gray-500">GSTIN:</span>
											<p className="text-gray-700">{hotel?.GSTIN}</p>
										</div>
									</div>
								</div>

								{/* Speciality */}
								<div className="bg-gray-50 rounded-lg p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<FaUtensils className="text-red-500" />
										Speciality
									</h3>
									<p className="text-gray-700">{hotel?.Speciality}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Additional Information */}
					<div className="mt-6 bg-gray-50 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div>
								<span className="font-medium text-gray-500">Hotel ID:</span>
								<p className="text-gray-700">{hotel?._id}</p>
							</div>
							<div>
								<span className="font-medium text-gray-500">Created:</span>
								<p className="text-gray-700">
									{hotel?.createdAt ? new Date(hotel.createdAt).toLocaleDateString() : 'N/A'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</EatofyProtectedRoute>
	);
}
