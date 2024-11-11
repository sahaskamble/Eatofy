import db from "@/db/connector";

export async function create_customer({
	customer_name,
	contact,
	email,
	eatocoins,
	hotel_id,
	apartment,
	street_address,
	landmark,
	city,
	state,
	zip_code
}) {

	try {

		// Inserting the record
		const result = await db.customers.create({
			data: {
				CustomerName: customer_name,
				Contact: contact,
				Email: email,
				EatocoinsWallet: eatocoins || 0,
				HotelId: hotel_id,
				StreetAddress: street_address,
				Apartment: apartment,
				Landmark: landmark,
				City: city,
				State: state,
				ZipCode: zip_code
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}

}
