import customersCrud from "@/app/lib/crud/Customers";

export async function fetch_customers(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_customers = await customersCrud.readCustomers(hotel_id);

		if (existing_customers.returncode === 200 && existing_customers.output.length === 0) {
			return {
				returncode: 409,
				message: "No Tables to be displayed",
				output: []
			};
		}

		return existing_customers;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
