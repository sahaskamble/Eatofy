import { create_customer } from "@/db/crud/customers/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

export async function add_customer(data) {
	try {

		const customer_name = data['customer_name'] || null;
		const contact = data['contact'] || null;
		const email = data['email'] || null;
		const apartment = data['apartment'] || null;
		const street_address = data['street_address'] || null;
		const landmark = data['landmark'] || null;
		const city = data['city'] || null;
		const state = data['state'] || null;
		const zip_code = data['zip_code'] || null;
		const hotel_id = data['hotel_id'] || null;
		const occassion = data['occassion'] || null;
		const date = data['date'] || null;

		// Default Invalid Checker
		if (hotel_id == null || customer_name == null || contact == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Customer Name
		const existingCustomer = await read_customer({ customer_name, contact });
		if (existingCustomer.returncode == 200) {
			return existingCustomer;
		}

		// Adding the Customer
		const result = await create_customer({
			customer_name,
			contact,
			email,
			hotel_id,
			apartment,
			street_address,
			landmark,
			city,
			state,
			zip_code
		});

		let error_flag = false;
		// If occassion exists
		if (occassion != null && date != null) {
			const occassion_date = await create_customer_occassion({
				customer_id: result.output.id,
				occassion,
				date
			});
			if (occassion_date.returncode != 200) {
				error_flag = true;
			}
		}

		if (!error_flag) {
			return {
				returncode: 200,
				message: "Customer Added",
				output: result.output
			};
		}
		else {
			return {
				returncode: 400,
				message: "Customer was not Added",
				output: []
			};
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
