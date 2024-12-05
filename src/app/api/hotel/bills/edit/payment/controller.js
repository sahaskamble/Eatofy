import billsCrud from "@/app/lib/crud/Bills";

export async function bill_payment(data, tokenData) {
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

        // Payment params
        let eatocoins = data['eatocoins'] || 0;
        const balance_amount = data['balance_amount'] || 0;
        let discount_rate = data['discount_rate'] || 0;
        let discount_amount = data['discount_amount'] || 0;
        let delivery_rate = data['delivery_rate'] || 0;
        let delivery_amount = data['delivery_amount'] || 0;
        const payment_mode = data['payment_mode'] || null;
        const payment_status = data['payment_status'] || null;

        // CRM params
        let customer_name = data['customer_name'] || null;
        let contact = data['contact'] || null;
        const email = data['email'] || null;


        // Default Invalid Checker
        if (bill_id === null || payment_mode === null || payment_status === null) {
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
                };
                const customer_result = await customerCrud.createCustomer(customerData);
                customer_id = customer_result.output._id;
            }
            else {
                customer_id = customer_exists.output._id;
            }

            const BillData = {
                bill_id,
                customer_id
            };

            await billsCrud.UpdateCustomer(BillData);
        }


        const result = await billsCrud.BillPayment({
            balance_amount,
            eatocoins,
            delivery_rate,
            delivery_amount,
            discount_rate,
            discount_amount,
            bill_id,
            payment_mode,
            payment_status,
            hotel_id
        });

        return result;


    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
