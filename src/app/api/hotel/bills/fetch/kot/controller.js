import billsCrud from "@/app/lib/crud/Bills";

export async function fetch_hotel_kots(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;

		// Default Invalid Checker
		if (hotel_id === null) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const existing_bill = await billsCrud.kotRead(hotel_id);

		console.log(existing_bill);
		if (existing_bill.returncode === 200) {
			return existing_bill;
		}
		return {
			returncode: 409,
			message: "No Bills to be displayed",
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

