import db from "@/db/connector";

// Details Update
export async function update_hotel_info_settings({
	setting_id,
	gstin_no
}) {
	try {

		// Updating the record
		const result = await db.hotelInfoSettings.update({
			where: {
				id: setting_id
			},
			data: {
				GSTINNO: gstin_no,
				Visibility: visibility
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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
