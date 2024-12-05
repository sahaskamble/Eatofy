import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";
import menusCrud from "@/app/lib/crud/Menus";

export async function takeaway_bill_fetch(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;

		if (hotel_id === null) {
			return {
				returncode: 400,
				message: "Required Parameters not found.",
				output: []
			}
		}

		// Menu
		const menus = await menusCrud.readTakeawayMenus();

		//Categories
		const categories = await menuCategoriesCrud.readMenuCategories(hotel_id);

		return {
			returncode: 200,
			message: "Takeaway Bill Fetched for the table.",
			output: [{
				Menus: menus.output,
				Categories: categories.output
			}]
		};



	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
