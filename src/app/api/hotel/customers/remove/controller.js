import customersCrud from "@/app/lib/crud/Customers";

export async function remove_customer(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const customer_id = data['customer_id'] || null;

        if (customer_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Customer ID is required",
                output: []
            });
        }

        const result = await customersCrud.deleteCustomers({ _id: customer_id });
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
