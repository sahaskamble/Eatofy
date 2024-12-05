import menusCrud from "@/app/lib/crud/Menus";

export async function edit_menu_price(data, tokenData) {
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
        const menu_id = data['menu_id'] || null;
        const price = data['price'] || null;

        // Default Invalid Checker
        if (hotel_id === null || menu_id === null || price === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const Data = {
            menu_id, price
        };

        const result = await menusCrud.updateMenuPrice(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
