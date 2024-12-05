import hotelsCrud from "@/app/lib/crud/Hotels";

export async function fetch_hotel(data, tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Owner', 'Backoffice'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to create hotel",
				output: []
			};
		}

		const hotel_id = data['hotel_id'] || null;

		if (hotel_id === null) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const hotel_exists = await hotelsCrud.readHotelByID(hotel_id);

		if (hotel_exists.returncode != 200) {
			return {
				returncode: 409,
				message: "Hotel with this name doesn't exists",
				output: []
			};
		}

		return {
			returncode: 200,
			message: "Hotel Info fetched.",
			output: hotel_exists.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
