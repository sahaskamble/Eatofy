import itemCategoriesCrud from "@/app/lib/crud/ItemCategories";

export async function fetch_categories(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_items = await itemCategoriesCrud.readCategories(hotel_id);

		if (existing_items.returncode === 200 && existing_items.output.length === 0) {
			return {
				returncode: 409,
				message: "No Items to be displayed",
				output: []
			};
		}

		return existing_items;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
