import inventoryStockCrud from "@/app/lib/crud/InventoryStock";

export async function edit_stock(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId;
        const stock_id = data['stock_id'] || null;
        const quantity = data['quantity'] || null;

        // Default Invalid Checker
        if (stock_id === null || quantity === null || hotel_id == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }


        const Data = {
            stock_id, quantity
        };

        const result = await inventoryStockCrud.editStock(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
