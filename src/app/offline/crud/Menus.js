import { OfflineBaseCrud } from "./BaseCrud";

class MenusCrud extends OfflineBaseCrud {
	constructor() {
		super('Menus');
	}

	async readMenus(hotel_id) {
		try {
			const result = await this.read('HotelId', hotel_id);
			return result;
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	async readMenusBySectionId(section_id) {
		try {
			const result = await this.read('SectionId._id', section_id);
			return result;
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	// Takeaway
	async readTakeawayMenus() {
		try {

			const result = await this.read("SectionId.Type", "Takeaway");

			return result;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	// Delivery
	async readDeliveryMenus() {
		try {

			const result = await this.read("SectionId.Type", "Delivery");

			return result;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	// Swiggy
	async readSwiggyMenus() {
		try {

			const result = await this.read("SectionId.Type", "Swiggy");

			return result;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	// Zomto
	async readZomatoMenus() {
		try {

			const result = await this.read("SectionId.Type", "Zomato");

			return result;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	// QR Menus
	async readQRMenus() {
		try {

			const result = await this.read("SectionId.Type", "QR-Orders");

			return result;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

}

const menusCrud = new MenusCrud();
export default menusCrud;
