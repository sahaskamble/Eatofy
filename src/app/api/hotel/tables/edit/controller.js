import tablesCrud from "@/app/lib/crud/Tables";

export async function edit_section_info(data, tokenData) {
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
        const table_name = data['table_name'] || null;
        const persons_occupiable = data['persons_occupiable'] || null;

        if (hotel_id === null || table_id === null || table_name === null || persons_occupiable == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const table_exists = await tablesCrud.doesTableExists(hotel_id, table_name);
        if (table_exists.returncode !== 200) {
            return {
                returncode: 409,
                message: "Table with this name doesn't exists",
                output: []
            };
        }

        const Data = {
            table_name,
            table_id,
            persons_occupiable
        };

        const result = await tablesCrud.updateTableInfo(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
