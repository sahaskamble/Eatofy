import menuCategoriesCrud from "@/app/lib/crud/MenuCategory";

export async function add_menu_category(data, tokenData) {
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
        const category_name = data['category_name'] || null;

        // Default Invalid Checker
        if (hotel_id == null || category_name == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const category_exists = await menuCategoriesCrud.doesMenuCategoryExists(hotel_id, category_name);
        if (category_exists.returncode === 200 && category_exists.output.length !== 0) {
            return {
                returncode: 409,
                message: "Menu Category with this name already exists",
                output: []
            };
        }

        const Data = {
            category_name,
            hotel_id
        };

        const result = await menuCategoriesCrud.createMenuCategory(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
