import eatocoinsSettingsCrud from "@/app/lib/crud/EatocoinsSettings";
export async function fetch_settings(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_settings = await eatocoinsSettingsCrud.readAllSettings(hotel_id);

		if (existing_settings.returncode === 404) {
			return {
				returncode: 409,
				message: "No Staffs to be displayed",
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
