import billsCrud from "@/app/lib/crud/Bills";
import customerCrud from "@/app/lib/crud/Customers";
import ordersCrud from "@/app/lib/crud/Orders";

export async function add_whole_bill(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

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

        // Order Params
        const type = data['type'] || null;
        const table_id = data['table_id'] || null;
        const waiter_id = data['waiter_id'] || null;
        const hotel_id = tokenData.hotelId || null;
        const menu_data = data['menu_data'] || null;

        // Default Invalid Checker
        if (hotel_id === null || type === null || menu_data === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // If the customer exists taking its id else Creating new one
        let customer_id = null;
        if (customer_name !== null) {
            const customer_exists = await customerCrud.checkCustomer(customer_name, contact, hotel_id);
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

        // Creating new bill
        let bill_id;
        const billData = {
            hotel_id,
            customer_id,
            waiter_id,
            table_id,
            type
        };

        const bill_result = await billsCrud.createBill(billData);
        bill_id = bill_result.output._id;


        // Finally Adding Orders
        let error_flag = false;
        await menu_data.forEach(async (order) => {
            const quantity = order.quantity;
            const note = order.note;
            const total_amount = order.total_amount;
            const menu_id = order.menu_id;
            const status = order.status || "Ordered";

            const order_result = await ordersCrud.addOrder({
                quantity, note, status, total_amount, menu_id, bill_id, hotel_id
            });
            if (order_result.returncode !== 200) {
                error_flag = true;
            }
        });

        if (!error_flag) {
            return {
                returncode: 200,
                message: "Bill Created.",
                output: [{ success: true }]
            }
        } else {
            return {
                returncode: 500,
                message: "Error creating Bill in some sections",
                output: []
            }
        }

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
