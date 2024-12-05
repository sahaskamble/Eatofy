import inventoryStockCrud from "@/app/lib/crud/InventoryStock";

export async function add_stock(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const hotel_id = tokenData.hotelId || null;
        const item_id = data['item_id'] || null;
        const quantity = data['quantity'] || null;
        const unit = data['unit'] || null;

        // Default Invalid Checker
        if (item_id === null || quantity === null || hotel_id == null || unit === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const Data = {
            item_id, quantity, hotel_id, unit
        };

        const result = await inventoryStockCrud.addStock(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
