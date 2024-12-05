import billsCrud from "@/app/lib/crud/Bills";

export async function add_table_in_bill(data, tokenData) {
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
        const bill_id = data['bill_id'] || null;
        const table_id = data['table_id'] || null;

        // Default Invalid Checker
        if (hotel_id === null || bill_id === null || table_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const BillData = {
            bill_id,
            table_id
        };

        const result = await billsCrud.UpdateCustomer(BillData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
