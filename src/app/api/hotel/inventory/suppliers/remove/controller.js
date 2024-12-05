import suppliersCrud from "@/app/lib/crud/Suppliers";

export async function remove_supplier(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const supplier_id = data['supplier_id'] || null;

        if (supplier_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Supplier ID is required",
                output: []
            });
        }

        const result = await suppliersCrud.deleteSupplier(supplier_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
