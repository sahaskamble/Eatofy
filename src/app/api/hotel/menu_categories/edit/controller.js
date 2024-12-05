import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";

export async function edit_menu_category_name(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId;
        const category_id = data['category_id'] || null;
        const category_name = data['category_name'] || null;

        if (hotel_id === null || category_id === null || category_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const table_exists = await menuCategoriesCrud.doesMenuCategoryExists(hotel_id, category_name);
        if (table_exists.returncode !== 200) {
            return {
                returncode: 409,
                message: "Category with this name doesn't exists",
                output: []
            };
        }

        const Data = {
            category_name,
            category_id,
        };

        const result = await menuCategoriesCrud.updateMenuCategory(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
