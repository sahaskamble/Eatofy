import db from "@/db/connector";

export async function read_ebill_email_settings({
	hotel_id
}) {
	try {

		const result = await db.ebillEmailSettings.findMany({
			where: {
				HotelId: hotel_id,
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
