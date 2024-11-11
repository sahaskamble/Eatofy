import db from "@/db/connector";

// Galla
export async function read_day_drawer_info({
	hotel_id,
	date
}) {
	try {

		const result = await db.cashDrawer.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
				Date: date
			},
			orderBy: [
				{
					createdAt: "asc"
				}
			],

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

// Tally Report
export async function read_drawer_info({
	hotel_id,
}) {
	try {

		const result = await db.cashDrawer.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: [
				{
					Date: "asc"
				}
			],

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
