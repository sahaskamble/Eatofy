import { OfflineBaseCrud } from "./BaseCrud";

class StaffsCrud extends OfflineBaseCrud {
	constructor() {
		super('Staffs');
	}

	async fetchStaffByHotelId(hotel_id) {
		try {

			const staff = await this.read('HotelId', hotel_id);
			if (staff.returncode !== 200) {
				return {
					returncode: 401,
					message: "Staffs doesn't exist",
					output: []
				};
			}
			return staff;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	async fetchStaffByEmail(email) {
		try {

			const staff = await this.read('Email', email);
			if (staff.returncode !== 200) {
				return {
					returncode: 401,
					message: "Staff doesn't exist",
					output: []
				};
			}
			return staff;

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

}

const staffsCrud = new StaffsCrud();
export default staffsCrud
