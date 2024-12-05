import ebillEmailSettingsCrud from "@/app/lib/crud/EbillEmailSettings";

export async function fetch_settings(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_settings = await ebillEmailSettingsCrud.readSettings(hotel_id);

		if (existing_settings.returncode === 404) {
			return {
				returncode: 409,
				message: "No Settings to be displayed",
				output: []
			};
		}

		return existing_settings;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
