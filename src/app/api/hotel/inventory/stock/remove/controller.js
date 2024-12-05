import inventoryStockCrud from "@/app/lib/crud/InventoryStock";

export async function remove_stock(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const stock_id = data['stock_id'] || null;

        if (stock_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Stock ID is required",
                output: []
            });
        }

        const result = await inventoryStockCrud.deleteStock(stock_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
