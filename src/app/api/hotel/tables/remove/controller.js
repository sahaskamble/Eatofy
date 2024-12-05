import tablesCrud from "@/app/lib/crud/Tables";

export async function remove_table(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const table_id = data['table_id'] || null;

        if (table_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Table ID is required",
                output: []
            });
        }

        const result = await tablesCrud.deleteTables({ _id: table_id });
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
