import db from "@/db/connector";

// Details Update
export async function update_ebill_email_settings({
	setting_id,
	visibility,
	email,
	app_password,
	upi_id,
	merchant_name
}) {
	try {

		// Updating the record
		const result = await db.ebillEmailSettings.update({
			where: {
				id: setting_id
			},
			data: {
				Visibility: visibility,
				Email: email,
				AppPassword: app_password,
				UPIID: upi_id,
				MerchantName: merchant_name
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
