import subscriptionsCrud from "@/app/lib/crud/Subscriptions";

export async function edit_subscription_info(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const subscription_id = data['subscription_id'] || null;
        const subscription_name = data['subscription_name'] || null;
        const validity = data['validity'] || null;
        const price = data['price'] || null;

        if (subscription_name === null || subscription_id === null || validity === null || price === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // Edit Subscription with additional metadata
        const subscriptionData = {
            subscription_name,
            validity,
            price,
            subscription_id
        };

        const result = await subscriptionsCrud.updateSubscription(subscriptionData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
