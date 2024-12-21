import { OfflineBaseCrud } from "./BaseCrud";

class GSTSettings extends OfflineBaseCrud {
	constructor() {
		super('GSTSettings');
	}

	async readSettings(hotel_id) {
		try {
			const result = await this.read('HotelId', hotel_id);
			return result;
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			}
		}
	}
}

const gstSettingsCrud = new GSTSettings();
export default gstSettingsCrud
