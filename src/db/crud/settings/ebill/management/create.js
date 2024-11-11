import db from "@/db/connector";

export async function create_ebill_email_settings({
	hotel_id,
	visibility,
	email,
	app_password,
	upi_id,
	merchant_name
}) {
	try {

		// Inserting the Data
		const result = await db.ebillEmailSettings.create({
			data: {
				HotelId: hotel_id,
				Visibility: visibility,
				Email: email,
				AppPassword: app_password,
				UPIID: upi_id,
				MerchantName: merchant_name
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
