import { read_hotel_info_settings } from "../../../../../../db/crud/settings/hotel_info/management/read";

export async function fetch_hotel_info_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if (hotel_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_hotel_info_settings({
			hotel_id
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
