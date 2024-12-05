import billsCrud from "@/app/lib/crud/Bills";
import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";
import menusCrud from "@/app/lib/crud/Menus";
import ordersCrud from "@/app/lib/crud/Orders";
import tablesCrud from "@/app/lib/crud/Tables";

export async function dine_in_bill_fetch(data, tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const table_id = data['table_id'] || null;

		if (hotel_id === null || table_id === null) {
			return {
				returncode: 400,
				message: "Required Parameters not found.",
				output: []
			}
		}

		// Table
		const table_info = await tablesCrud.readTable(table_id);
		if (table_info.returncode === 200) {
			const section_id = table_info.output.SectionId;

			// Existing Bill
			const existing_bill = await billsCrud.dineInRead(table_id);
			let fetched_orders;
			if (existing_bill.returncode === 200 || existing_bill.output.length != 0) {

				//Orders
				const orders = await ordersCrud.readOrders(existing_bill?.output._id);

				if (orders.returncode == 200 || orders.output.length != 0) {
					fetched_orders = orders.output;
				}
			}

			// Menu
			const menus = await menusCrud.readMenusBySectionId(section_id);

			//Categories
			const categories = await menuCategoriesCrud.readMenuCategories(hotel_id);
			const bill_output = existing_bill.output;

			return {
				returncode: 200,
				message: "Dine-In Bill Fetched for the table.",
				output: [{
					ExistingBill: bill_output,
					Menus: menus.output,
					Categories: categories.output,
					Orders: fetched_orders,
					TableInfo: table_info.output
				}]
			};

		}

		return table_info;


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
