import dishesCrud from "@/app/lib/crud/Dishes";

export async function fetch_dishes(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_dishes = await dishesCrud.readDishes(hotel_id);

		if (existing_dishes.returncode === 200 && existing_dishes.output.length === 0) {
			return {
				returncode: 409,
				message: "No Tables to be displayed",
				output: []
			};
		}

		return existing_dishes;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
