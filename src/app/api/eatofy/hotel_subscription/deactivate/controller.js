import hotelSubscriptionCrud from "@/app/lib/crud/HotelSubscription";

export async function deactivate_hotel_account(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_subscription_id = data['hotel_subscription_id'] || null;
        const is_valid = data['is_valid'] || false;
        const status = data['status'] || "Expired";

        if (hotel_subscription_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const hotelSubscriptionData = {
            hotel_subscription_id,
            is_valid,
            status
        };

        const result = await hotelSubscriptionCrud.deactivateAccount(hotelSubscriptionData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
