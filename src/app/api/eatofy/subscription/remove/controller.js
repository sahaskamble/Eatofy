import subscriptionsCrud from "@/app/lib/crud/Subscriptions";

export async function remove_subscriptions(data, tokenData) {
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

        if (subscription_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Hotel ID is required",
                output: []
            });
        }

        // Delete the hotel
        const result = await subscriptionsCrud.deleteSubscription(subscription_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
