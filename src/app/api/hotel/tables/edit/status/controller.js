import tablesCrud from "@/app/lib/crud/Tables";

export async function edit_section_status(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId;
        const table_id = data['table_id'] || null;
        const status = data['status'] || null;

        if (hotel_id === null || table_id === null || status === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const Data = {
            table_id,
            status
        };

        const result = await tablesCrud.updateTableStatus(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
