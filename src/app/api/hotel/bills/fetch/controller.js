import billsCrud from "@/app/lib/crud/Bills";

export async function fetch_whole_bill(data, tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const bill_id = data['bill_id'] || null;

		// Default Invalid Checker
		if (hotel_id === null || bill_id === null) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const existing_bill = await billsCrud.readBill(bill_id);

		if (existing_bill.returncode === 200 && existing_bill.output.length > 0) {
			return {
				returncode: 200,
				message: "Bill Data Fetched.",
				output: existing_bill
			};
		}
		return {
			returncode: 409,
			message: "No Bill to be displayed",
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

export async function fetch_hotel_bills(tokenData) {
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

		const existing_bill = await billsCrud.readBills(hotel_id);

		if (existing_bill.returncode === 200 && existing_bill.output.length > 0) {
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

