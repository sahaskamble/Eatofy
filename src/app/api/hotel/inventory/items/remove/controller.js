import itemsCrud from "@/app/lib/crud/Items";

export async function remove_items(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const item_id = data['item_id'] || null;

        if (item_id === null) {
            return {
                returncode: 400,
                message: "Item ID is required",
                output: []
            };
        }

        const result = await itemsCrud.deleteItem(item_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
