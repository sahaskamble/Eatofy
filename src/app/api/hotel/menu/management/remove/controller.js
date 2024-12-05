import menusCrud from "@/app/lib/crud/Menus";

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

        const menu_id = data['menu_id'] || null;

        if (menu_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Menu ID is required",
                output: []
            });
        }

        const result = await menusCrud.deleteMenusById(menu_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
