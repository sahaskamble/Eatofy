import db from "@/db/connector";

// Without Image
export async function create_hotel_info_settings({
	hotel_id,
	visibility,
	gstin_no
}) {
	try {

		// Inserting the Data
		const result = await db.hotelInfoSettings.create({
			data: {
				HotelId: hotel_id,
				GSTINNO: gstin_no,
				Visibility: visibility
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
