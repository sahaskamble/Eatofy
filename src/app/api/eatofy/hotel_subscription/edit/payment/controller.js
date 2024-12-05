import hotelSubscriptionCrud from "@/app/lib/crud/HotelSubscription";

export async function edit_subscription_payment(data, tokenData) {
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
        const payment_status = data['payment_status'] || null;
        const payment_mode = data['payment_mode'] || null;
        const cash = data['cash'] || 0;
        const upi = data['upi'] || 0;
        const credit_card = data['credit_card'] || 0;

        if (hotel_subscription_id === null || payment_status === null || payment_mode === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // Edit Subscription with additional metadata
        const hotelSubscriptionData = {
            hotel_subscription_id,
            payment_status,
            payment_mode,
            cash,
            upi,
            credit_card
        };

        const result = await hotelSubscriptionCrud.updateSubscriptionPayment(hotelSubscriptionData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
