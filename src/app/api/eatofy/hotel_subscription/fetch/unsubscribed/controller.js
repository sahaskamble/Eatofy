import hotelSubscriptionCrud from "@/app/lib/crud/HotelSubscription";

export async function fetch_invalid_subscriptions(tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to read hotel",
				output: []
			};
		}

		const result = await hotelSubscriptionCrud.getHotelsWithInvalidOrNoSubscription();

		if (result.output.length === 0) {
			return {
				returncode: 409,
				message: "No Subscription to be displayed",
				output: []
			};
		}

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
