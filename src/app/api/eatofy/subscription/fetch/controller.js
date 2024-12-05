import subscriptionsCrud from "@/app/lib/crud/Subscriptions";

export async function fetch_subscriptions(tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to read hotel",
				output: []
			};
		}

		const subscriptions_exists = await subscriptionsCrud.readSubscriptions();

		if (subscriptions_exists.output.length === 0) {
			return {
				returncode: 409,
				message: "No Subscription to be displayed",
				output: []
			};
		}

		return subscriptions_exists;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
