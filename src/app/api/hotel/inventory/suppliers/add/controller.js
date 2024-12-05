import suppliersCrud from "@/app/lib/crud/Suppliers";

export async function add_supplier(data, tokenData) {
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
        const supplier_name = data['supplier_name'] || null;
        const contact = data['contact'] || null;
        const email = data['email'] || null;
        const gstin = data['gstin'] || null;
        const address = data['address'] || null;
        const supplier_type = data['supplier_type'] || null;

        // Default Invalid Checker
        if (supplier_name === null || contact === null || email === null || gstin === null || hotel_id == null || supplier_type == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const supplier_exists = await suppliersCrud.checkSupplier(supplier_name, contact, hotel_id);
        if (supplier_exists.returncode === 200 && supplier_exists.output.length !== 0) {
            return {
                returncode: 409,
                message: "Supplier with this name already exists",
                output: []
            };
        }

        const Data = {
            supplier_name,
            contact,
            email,
            gstin,
            address,
            hotel_id,
            supplier_type
        };

        const result = await suppliersCrud.addSupplier(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
