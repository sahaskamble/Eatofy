import { OfflineBaseCrud } from "./BaseCrud";

class MenuCategory extends OfflineBaseCrud {
	constructor() {
		super('MenuCategory');
	}

	async readMenuCategories(hotel_id) {
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

const menuCategoryCrud = new MenuCategory();
export default menuCategoryCrud;
