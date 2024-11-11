import { create_ebill_email_settings } from "../../../../../../../db/crud/settings/ebill/management/create";
import { read_ebill_email_settings } from "../../../../../../../db/crud/settings/ebill/management/read";
import { update_ebill_email_settings } from "../../../../../../../db/crud/settings/ebill/management/update";

export async function add_ebill_email_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['visibility'] || false;
		const email = data['email'] || null;
		const app_password = data['app_password'] || null;
		const upi_id = data['upi_id'] || null;
		const merchant_name = data['merchant_name'] || null;

		// Default Invalid Checker
		if (hotel_id === null || email === null || app_password === null || upi_id === null || merchant_name === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Settings
		const existingSettings = await read_ebill_email_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const setting_id = existingSettings.output[0].id;
			const result = await update_ebill_email_settings({
				setting_id, visibility, email, app_password, upi_id, merchant_name
			});
			return result;
		}

		// Inserting the Section
		const result = await create_ebill_email_settings({
			hotel_id,
			visibility,
			email,
			app_password,
			merchant_name,
			upi_id
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
