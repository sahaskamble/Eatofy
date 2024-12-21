import { OfflineBaseCrud } from "./BaseCrud";

class VATSettings extends OfflineBaseCrud {
	constructor() {
		super('VATSettings');
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

const vatSettingsCrud = new VATSettings();
export default vatSettingsCrud;
