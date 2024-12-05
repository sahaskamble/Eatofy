import itemCategoriesCrud from "@/app/lib/crud/ItemCategories";

export async function remove_item_category(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const category_id = data['category_id'] || null;

        if (category_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Category ID is required",
                output: []
            });
        }

        const result = await itemCategoriesCrud.deleteCategory(category_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
