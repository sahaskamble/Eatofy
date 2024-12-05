import itemCategoriesCrud from "@/app/lib/crud/ItemCategories";
import itemsCrud from "@/app/lib/crud/Items";

export async function add_item(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId || null;

        // Category params
        let category_name = data['category_name'] || null;
        const unit = data['unit'] || null;

        // Item Params
        const item_name = data['item_name'] || null;

        // Default Invalid Checker
        if (hotel_id === null || category_name === null || unit === null || item_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // If the category exists taking its id else Creating new one
        let category_id = null;
        if (category_id === null) {
            const category_exists = await itemCategoriesCrud.checkCategoryExists(category_name, hotel_id);
            if (category_exists.returncode !== 200 || category_exists.output.length === 0) {
                const categoryData = {
                    category_name,
                    unit,
                    hotel_id
                };
                const category_result = await itemCategoriesCrud.addCategory(categoryData);
                console.log(category_result);
                category_id = category_result.output._id;
            }
            else {
                console.log(category_exists);
                category_id = category_exists.output._id;
            }
        }

        // Existing Check
        const item_exists = await itemsCrud.checkItemExists(item_name, hotel_id);
        if (item_exists.returncode === 200 && item_exists.output.length !== 0) {
            return {
                returncode: 409,
                message: "Item with this name already exists",
                output: []
            };
        }


        // Adding Item
        const Data = {
            hotel_id,
            category_id,
            item_name
        };

        const result = await itemsCrud.addItem(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
