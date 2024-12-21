import tablesCrud from "@/app/lib/crud/Tables";

export async function fetch_tables(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_tables = await tablesCrud.readTables(hotel_id);

		if (existing_tables.returncode === 200 && existing_tables.output.length === 0) {
			return {
				returncode: 409,
				message: "No Tables to be displayed",
				output: []
			};
		}

		return existing_tables;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
