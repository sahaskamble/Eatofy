import dishesCrud from "@/app/lib/crud/Dishes";

export async function add_dish(data, tokenData) {
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
        const dish_name = data['dish_name'] || null;
        const code = data['code'] || null;
        const type = data['type'] || null;
        const description = data['description'] || null;
        const category_id = data['category_id'] || null;

        // Default Invalid Checker
        if (hotel_id === null || dish_name === null || code === null || type === null || category_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const dish_exists = await dishesCrud.doesDishExists(hotel_id, dish_name, code);
        if (dish_exists.returncode === 200 && dish_exists.output.length !== 0) {
            return {
                returncode: 409,
                message: "Dish with this name already exists",
                output: []
            };
        }

        const Data = {
            hotel_id,
            dish_name,
            code,
            type,
            description,
            category_id
        };

        const result = await dishesCrud.createDish(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
