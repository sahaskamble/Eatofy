import inventoryStockCrud from "@/app/lib/crud/InventoryStock";

export async function fetch_stock(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_stock = await inventoryStockCrud.readStock(hotel_id);

		if (existing_stock.returncode === 200 && existing_stock.output.length === 0) {
			return {
				returncode: 409,
				message: "No Stock to be displayed",
				output: []
			};
		}

		return existing_stock;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
