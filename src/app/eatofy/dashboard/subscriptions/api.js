// Helper functions for subscription management

// Fetch all subscriptions
export const fetchSubscriptions = async () => {
	try {
		const response = await fetch('/api/eatofy/subscription/fetch', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		if (!response.ok) {
			throw new Error('Failed to fetch subscriptions');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error fetching subscriptions:', error);
		throw error;
	}
};

// Add new subscription
export const addSubscription = async (subscriptionData) => {
	try {
		const response = await fetch('/api/eatofy/subscription/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(subscriptionData),
		});
		
		if (!response.ok) {
			throw new Error('Failed to add subscription');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error adding subscription:', error);
		throw error;
	}
};

// Update subscription
export const updateSubscription = async (subscriptionId, updateData) => {
	try {
		const response = await fetch(`/api/eatofy/subscription/edit`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				subscription_id: subscriptionId,
				...updateData
			}),
		});
		
		if (!response.ok) {
			throw new Error('Failed to update subscription');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error updating subscription:', error);
		throw error;
	}
};

// Remove subscription
export const removeSubscription = async (subscriptionId) => {
	try {
		const response = await fetch(`/api/eatofy/subscription/remove`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				subscription_id: subscriptionId,
			}),
		});
		
		if (!response.ok) {
			throw new Error('Failed to remove subscription');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error removing subscription:', error);
		throw error;
	}
};

// Add hotel subscription
export const addHotelSubscription = async (subscriptionData) => {
	try {
		const response = await fetch('/api/eatofy/hotel_subscription/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(subscriptionData),
		});
		
		if (!response.ok) {
			throw new Error('Failed to add hotel subscription');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error adding hotel subscription:', error);
		throw error;
	}
};

// Edit subscription payment
export const editSubscriptionPayment = async (paymentData) => {
	try {
		const response = await fetch('/api/eatofy/hotel_subscription/edit/payment', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(paymentData),
		});
		
		if (!response.ok) {
			throw new Error('Failed to edit subscription payment');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error editing subscription payment:', error);
		throw error;
	}
};
