import customersCrud from "@/app/lib/crud/Customers";
import reservationsCrud from "@/app/lib/crud/Reservation";

export async function add_reservation(data, tokenData) {
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
        const date = data['date'] || null;
        const time = data['time'] || null;
        const note = data['note'] || null;
        const contact = data['contact'] || null;
        const no_of_persons = data['no_of_persons'] || null;
        const customer_name = data['customer_name'] || null;

        // Default Invalid Checker
        if (hotel_id == null || customer_name == null || contact == null || date == null || time == null || no_of_persons == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        // If the customer exists taking its id else Creating new one
        let customer_id = "";
        if (customer_name !== null) {
            const customer_exists = await customersCrud.checkCustomer(customer_name, contact, hotel_id);
            if (customer_exists.returncode !== 200 || (customer_exists.output.length === 0 || customer_exists.output === null)) {

                const customerData = {
                    customer_name,
                    contact,
                    email: null,
                    street_address: null,
                    apartment: null,
                    landmark: null,
                    city: null,
                    state: null,
                    zip_code: null,
                    birthday: null,
                    anniversary: null,
                    hotel_id
                };
                const customer_result = await customersCrud.createCustomer(customerData);
                customer_id = customer_result.output._id;
            }
            else {
                customer_id = customer_exists.output._id;
            }
        }

        const Data = {
            date,
            time,
            note,
            no_of_persons,
            customer_id,
            hotel_id
        };

        const result = await reservationsCrud.createReservation(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
