import suppliersCrud from "@/app/lib/crud/Suppliers";

export async function fetch_suppliers(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_suppliers = await suppliersCrud.readSuppliers(hotel_id);

		if (existing_suppliers.returncode === 200 && existing_suppliers.output.length === 0) {
			return {
				returncode: 409,
				message: "No Suppliers to be displayed",
				output: []
			};
		}

		return existing_suppliers;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
