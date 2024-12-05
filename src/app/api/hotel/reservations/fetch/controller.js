import reservationsCrud from "@/app/lib/crud/Reservation";

export async function fetch_reservations(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_reservations = await reservationsCrud.readReservations(hotel_id);

		if (existing_reservations.returncode === 200 && existing_reservations.output.length === 0) {
			return {
				returncode: 409,
				message: "No Reservations to be displayed",
				output: []
			};
		}

		return existing_reservations;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
