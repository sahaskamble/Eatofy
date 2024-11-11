import db from "@/db/connector";

// Without Image
export async function add_opening_balance({
	hotel_id,
	open,
	opening_balance,
	date
}) {
	try {

		// Inserting the Data
		const result = await db.cashDrawer.create({
			data: {
				HotelId: hotel_id,
				Open: open,
				OpeningBalance: opening_balance,
				Date: date
			},
		});
		// Disconnect the Database
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {

		// Error thrown
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
