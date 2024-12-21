import { OfflineBaseCrud } from "./BaseCrud";
import billsCrud from "./Bills";

class TablesCrud extends OfflineBaseCrud {
	constructor() {
		super("Tables");
	}

	async readTables(hotel_id) {
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

	async readTable(table_id) {
		try {
			const result = await this.read('_id', table_id);
			return result;
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	async readTablesBySection(section_id) {
		try {
			const result = await this.read('SectionId', section_id);
			return result;
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	async updateTableStatus(table_id, status) {
		try {
			// If setting to occupied, check if there are any open bills
			if (status === "Occupied") {
				const openBills = await billsCrud.read("TableId", table_id);

				if (openBills.output[0].Status === "Open") {
					return {
						returncode: 400,
						message: "Cannot occupy table without an open bill",
						output: []
					};
				}
			}


			const result = await this.update(table_id, { Status: status });
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

const tablesCrud = new TablesCrud();
export default tablesCrud;
