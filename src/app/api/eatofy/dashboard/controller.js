import hotelSubscriptionCrud from "@/app/lib/crud/HotelSubscription";

export async function fetch_dashboard(tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.role || !['Administration', 'Management'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to read hotel",
				output: []
			};
		}

		const subscribed_result = await hotelSubscriptionCrud.getHotelsWithValidSubscription();
		const unsubscribed_result = await hotelSubscriptionCrud.getHotelsWithInvalidOrNoSubscription();

		if (subscribed_result.returncode === 200) {

			return {
				returncode: 200,
				message: "Dashboard details will be fetched.",
				output: {
					"total_hotels": parseInt(subscribed_result.output.length) + parseInt(unsubscribed_result.output.length),
					"total_subscribed_hotels": subscribed_result.output.length,
					"subscribed_hotels": subscribed_result
				}
			};
		}
		else {
			return {
				returncode: 409,
				message: "Couldn't fetch dashboard details right now.",
				output: []
			}
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
