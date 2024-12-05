import itemsCrud from "@/app/lib/crud/Items";

export async function edit_item(data, tokenData) {
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

        // Item Params
        const item_name = data['item_name'] || null;
        const item_id = data['item_id'] || null;

        // Default Invalid Checker
        if (hotel_id === null || item_name === null || item_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }



        const item_exists = await itemsCrud.checkItemExists(item_name, hotel_id);
        if (item_exists.returncode !== 200 && item_exists.output.length === 0) {
            return {
                returncode: 409,
                message: "Item with this name doesn't exists",
                output: []
            };
        }

        const Data = {
            item_id,
            item_name
        };

        const result = await itemsCrud.editItem(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
