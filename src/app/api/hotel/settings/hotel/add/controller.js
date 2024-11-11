import { create_hotel_info_settings } from "../../../../../../db/crud/settings/hotel_info/management/create";
import { read_hotel_info_settings } from "../../../../../../db/crud/settings/hotel_info/management/read";
import { update_hotel_info_settings } from "../../../../../../db/crud/settings/hotel_info/management/update";

export async function add_hotel_info_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['visibility'] || false;
		const gstin_no = data['gstin_no'] || false;


		// Default Invalid Checker
		if (hotel_id === null || gstin_no === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Settings
		const existingSettings = await read_hotel_info_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const setting_id = existingSettings.output[0].id;
			const result = await update_hotel_info_settings({
				setting_id, visibility, gstin_no
			});
			return result;
		}

		// Inserting the Section
		const result = await create_hotel_info_settings({
			hotel_id,
			visibility,
			gstin_no
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
