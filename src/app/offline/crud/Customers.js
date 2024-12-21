import { OfflineBaseCrud } from "./BaseCrud";

class CustomersCrud extends OfflineBaseCrud {
	constructor() {
		super('Customers');
	}


	async createCustomer({ customer_id = null, customer_name, email, contact, hotel_id, street_address, apartment, city, state, landmark, zip_code, birthday, anniversary }) {
		try {
			const normalizedData = {
				CustomerName: customer_name,
				Email: email || null,
				Contact: contact,
				HotelId: hotel_id,
				// Detailed address fields
				StreetAddress: street_address || null,
				Apartment: apartment || null,
				City: city || null,
				State: state || null,
				Landmark: landmark || null,
				ZipCode: zip_code || null,
				Birthday: birthday || null,
				Anniversary: anniversary || null
			};

			const exists = await this.read({
				CustomerName: customer_name,
				Contact: contact,
				HotelId: hotel_id
			});

			if (exists.output.length > 0) {
				const updateData = {
					CustomerName: customer_name,
					Email: email || null,
					Contact: contact,
					StreetAddress: street_address || null,
					Apartment: apartment || null,
					City: city || null,
					State: state || null,
					Landmark: landmark || null,
					ZipCode: zip_code || null,
					Birthday: birthday || null,
					Anniversary: anniversary || null
				};

				return await this.update(customer_id, updateData);
			}

			return await this.create(normalizedData);
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	async readCustomers(hotel_id) {
		try {
			const result = await this.read('HotelId', hotel_id);
			return result;
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}


}

const customersCrud = new CustomersCrud();
export default customersCrud;
