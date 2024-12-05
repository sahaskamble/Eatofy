import subscriptionsCrud from "@/app/lib/crud/Subscriptions";

export async function add_subscription(data, tokenData) {
    try {
        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const subscription_name = data['subscription_name'] || null;
        const validity = data['validity'] || null;
        const price = data['price'] || null;

        if (subscription_name === null || validity === null || price == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // Create hotel with additional metadata
        const subscriptionData = {
            subscription_name,
            validity,
            price
        };

        const result = await subscriptionsCrud.createSubscription(subscriptionData);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
