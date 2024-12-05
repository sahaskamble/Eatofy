import tablesCrud from "@/app/lib/crud/Tables";

export async function add_tables(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const hotel_id = tokenData.hotelId || null;
        const section_id = data['section_id'] || null;
        const count = data['count'] || null;

        // Default Invalid Checker
        if (hotel_id == null || section_id == null || count == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        let data1, table_name, persons_occupiable, error_flag = false;
        for (let table_index = 1; table_index <= count; table_index++) { // Fix off-by-one error

            table_name = `Table ${table_index}`;
            persons_occupiable = "4";

            const table_exists = await tablesCrud.doesTableExists(hotel_id, table_name);
            if (table_exists.returncode !== 200) {

                data1 = {
                    hotel_id,
                    section_id,
                    table_name,
                    persons_occupiable
                };

                const temp_result = await tablesCrud.createTable(data1);
                if (temp_result.returncode != 200) {
                    error_flag = true;
                }
            }
        }

        if (error_flag) {
            return {
                returncode: 503,
                message: "Some Tables weren't added",
                output: []
            }
        }

        return {
            returncode: 200,
            message: "Tables were added Successfully",
            output: []
        }


    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
