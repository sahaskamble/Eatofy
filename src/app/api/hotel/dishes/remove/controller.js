import dishesCrud from "@/app/lib/crud/Dishes";

export async function remove_dishes(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const dish_id = data['dish_id'] || null;

        if (dish_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Dish ID is required",
                output: []
            });
        }

        const result = await dishesCrud.deleteDishesById(dish_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
