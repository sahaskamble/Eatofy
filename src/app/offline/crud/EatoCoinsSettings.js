import { OfflineBaseCrud } from "./BaseCrud";

class EatoCoinsSettings extends OfflineBaseCrud {
	constructor() {
		super('EatoCoinsSettings');
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

const eatoCoinsSettingsCrud = new EatoCoinsSettings();
export default eatoCoinsSettingsCrud;
