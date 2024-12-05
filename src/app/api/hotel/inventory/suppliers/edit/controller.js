import suppliersCrud from "@/app/lib/crud/Suppliers";

export async function edit_supplier(data, tokenData) {
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
        const supplier_id = data['supplier_id'] || null;
        const supplier_name = data['supplier_name'] || null;
        const contact = data['contact'] || null;
        const email = data['email'] || null;
        const gstin = data['gstin'] || null;
        const address = data['address'] || null;
        const supplier_type = data['supplier_type'] || null;

        // Default Invalid Checker
        if (hotel_id === null || supplier_id === null || supplier_name === null || contact === null || email === null || gstin === null || hotel_id == null || supplier_type == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }


        const supplier_exists = await suppliersCrud.checkSupplier(supplier_name, contact, hotel_id);
        if (supplier_exists.returncode !== 200 && supplier_exists.output.length === 0) {
            return {
                returncode: 409,
                message: "Supplier with this name doesn't exists",
                output: []
            };
        }

        const Data = {
            supplier_name,
            contact,
            email,
            gstin,
            address,
            supplier_type,
            supplier_id
        };

        const result = await suppliersCrud.editSupplierDetails(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
