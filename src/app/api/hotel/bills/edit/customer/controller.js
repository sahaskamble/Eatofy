import billsCrud from "@/app/lib/crud/Bills";
import customerCrud from "@/app/lib/crud/Customers";

export async function add_customer_in_bill(data, tokenData) {
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
        const bill_id = data['bill_id'] || null;

        // CRM params
        let customer_name = data['customer_name'] || null;
        let contact = data['contact'] || null;
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
        if (hotel_id === null || bill_id === null || customer_name === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // If the customer exists taking its id else Creating new one
        let customer_id = "";
        if (customer_name !== null) {
            const customer_exists = await customerCrud.checkUser(customer_name, contact, hotel_id);
            if (customer_exists.returncode !== 200 || (customer_exists.output.length === 0 || customer_exists.output === null)) {
                const customerData = {
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
                const customer_result = await customerCrud.createCustomer(customerData);
                customer_id = customer_result.output._id;
            }
            else {
                customer_id = customer_exists.output._id;
            }
        }

        const BillData = {
            bill_id,
            customer_id
        };

        const result = await billsCrud.UpdateCustomer(BillData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
