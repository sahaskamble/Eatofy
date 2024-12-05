import customersCrud from "@/app/lib/crud/Customers";

export async function add_customer(data, tokenData) {
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
        const customer_name = data['customer_name'] || null;
        const contact = data['contact'] || null;
        const email = data['email'] || null;
        const birthday = data['birthday'] || null;
        const anniversary = data['anniversary'] || null;
        const apartment = data['apartment'] || null;
        const street_address = data['street_address'] || null;
        const landmark = data['landmark'] || null;
        const city = data['city'] || null;
        const state = data['state'] || null;
        const zip_code = data['zip_code'] || null;

        // Default Invalid Checker
        if (hotel_id === null || customer_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const customer_exists = await customersCrud.checkCustomer(customer_name, contact, hotel_id);
        if (customer_exists.returncode === 200 && customer_exists.output.length !== 0) {
            return {
                returncode: 409,
                message: "Customer with this name already exists",
                output: []
            };
        }

        const Data = {
            customer_name,
            contact,
            email,
            street_address,
            apartment,
            landmark,
            city,
            state,
            zip_code,
            birthday,
            anniversary,
            hotel_id
        };

        const result = await customersCrud.createCustomer(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
