import inventoryStockCrud from "@/app/lib/crud/InventoryStock";
import stockReportCrud from "@/app/lib/crud/StockReport";

export async function inventory_day_push(tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }
        const hotel_id = tokenData.hotelId || null;
        if (hotel_id === null) {
            return {
                returncode: 400,
                message: "Token not found",
                output: []
            }
        }

        const stock_report = await inventoryStockCrud.readStock(hotel_id);
        let error_flag = false; let errors = [];
        stock_report.output.forEach(async (stock) => {
            const Data = {
                hotel_id,
                item_id: stock.ItemId,
                quantity: stock.Quantity,
            }

            const result = await stockReportCrud.createInstance(Data);
            if (result.returncode !== 200 || result.output.length === 0) {
                error_flag = true;
                errors.push(result.message);
            }

        });
        if (error_flag) {
            return {
                returncode: 500,
                message: "Error adding Stock.",
                output: errors
            };
        } else {
            return {
                returncode: 200,
                message: "Stock Report Added.",
                output: []
            }
        }


    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
