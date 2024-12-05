import purchaseInvoiceCrud from "@/app/lib/crud/PurchasedInvoice";

export async function fetch_invoices(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_invoices = await purchaseInvoiceCrud.readInvoices(hotel_id);

		if (existing_invoices.returncode === 200 && existing_invoices.output.length === 0) {
			return {
				returncode: 409,
				message: "No Invoices to be displayed",
				output: []
			};
		}

		return existing_invoices;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
