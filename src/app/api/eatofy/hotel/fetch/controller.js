import hotelsCrud from "@/app/lib/crud/Hotels";

export async function fetch_hotel_by_name(data, tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to create hotel",
				output: []
			};
		}

		const hotel_name = data['hotel_name'] || null;

		if (hotel_name === null) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const hotel_exists = await hotelsCrud.doesHotelExists(hotel_name);
		if (hotel_exists.returncode != 200) {
			return {
				returncode: 409,
				message: "Hotel with this name doesn't exists",
				output: []
			};
		}

		return hotel_exists;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

export async function fetch_hotels(tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to read hotel",
				output: []
			};
		}

		const hotels_exists = await hotelsCrud.readAllHotels();

		if (hotels_exists.output.length === 0) {
			return {
				returncode: 409,
				message: "No Hotels to be displayed",
				output: []
			};
		}

		return hotels_exists;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
