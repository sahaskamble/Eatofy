import dishesCrud from "@/app/lib/crud/Dishes";

export async function edit_dish(data, tokenData) {
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
        const dish_id = data['dish_id'] || null;
        const dish_name = data['dish_name'] || null;
        const code = data['code'] || null;
        const type = data['type'] || null;
        const description = data['description'] || null;

        // Default Invalid Checker
        if (hotel_id === null || dish_name === null || code === null || type === null || dish_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const dish_exists = await dishesCrud.doesDishExists(hotel_id, dish_name, code);
        if (dish_exists.returncode !== 200 && dish_exists.output.length === 0) {
            return {
                returncode: 409,
                message: "Dish with this name doesn't exists",
                output: []
            };
        }

        const Data = {
            dish_id,
            dish_name,
            code,
            type,
            description
        };

        const result = await dishesCrud.updateDishInfo(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
