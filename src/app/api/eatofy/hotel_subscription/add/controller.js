import hotelSubscriptionCrud from "@/app/lib/crud/HotelSubscription";

export async function add_hotel_subscription(data, tokenData) {
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
        const hotel_id = data['hotel_id'] || null;
        const subscription_id = data['subscription_id'] || null;
        const is_valid = data['is_valid'] || false;
        const start_date = data['start_date'] || null;
        const end_date = data['end_date'] || null;
        const payment_status = data['payment_status'] || null;
        const payment_mode = data['payment_mode'] || null;
        const cash = data['cash'] || 0;
        const upi = data['upi'] || 0;
        const credit_card = data['credit_card'] || 0;

        if (hotel_id === null || subscription_id === null || start_date === null || end_date === null || payment_status === null || payment_mode === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // Create hotel Subscription with additional metadata
        const hotelsubscriptionData = {
            hotel_id,
            subscription_id,
            is_valid,
            start_date,
            end_date,
            payment_status,
            payment_mode,
            cash,
            upi,
            credit_card
        };

        const result = await hotelSubscriptionCrud.createHotelSubscription(hotelsubscriptionData);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
