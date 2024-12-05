import ordersCrud from "@/app/lib/crud/Orders";

export async function undo_cancellation(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId;
        const order_id = data['order_id'] || null;

        // Default Invalid Checker
        if (hotel_id === null || order_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const order_exists = await ordersCrud.readOrders(order_id);
        if (order_exists.returncode === 200 || order_exists.output.length > 0) {
            const result = await ordersCrud.undoCancelOrder(order_id, "Ordered");
            return result;
        } else {
            return {
                returncode: 400,
                message: "Order doesn't exists",
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
