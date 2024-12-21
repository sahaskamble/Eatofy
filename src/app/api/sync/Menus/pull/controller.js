import menusCrud from "@/app/lib/crud/Menus";

export async function fetch_whole_menus(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_menus = await menusCrud.readMenus(hotel_id);

		if (existing_menus.returncode === 200 && existing_menus.output.length > 0) {
			return {
				returncode: 200,
				message: "Menus Data Fetched.",
				output: existing_menus.output
			};
		}
		return {
			returncode: 409,
			message: "No Menus & Sections to be displayed",
			output: []
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
