import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";

export async function fetch_categories(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_categories = await menuCategoriesCrud.readMenuCategories(hotel_id);

		if (existing_categories.returncode === 200 && existing_categories.output.length === 0) {
			return {
				returncode: 409,
				message: "No Tables to be displayed",
				output: []
			};
		}

		return existing_categories;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
