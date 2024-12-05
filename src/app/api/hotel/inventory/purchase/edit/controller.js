import purchaseInvoiceCrud from "@/app/lib/crud/PurchasedInvoice";

export async function invoice_payment(data, tokenData) {
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

        // Item Params
        const invoice_id = data['invoice_id'] || null;
        const amount_paid = data['amount_paid'] || null;
        const balance_amount = data['balance_amount'] || null;
        const payment_mode = data['payment_mode'] || null;
        const payment_status = data['payment_status'] || null;
        const cash = data['cash'] || null;
        const upi = data['upi'] || null;
        const credit_card = data['credit_card'] || null;

        // Default Invalid Checker
        if (hotel_id === null || invoice_id === null || payment_mode === null || payment_status === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const invoice_exists = await purchaseInvoiceCrud.readInvoice(invoice_id);
        if (invoice_exists.returncode !== 200 && invoice_exists.output.length === 0) {
            return {
                returncode: 409,
                message: "Invoice doesn't exists",
                output: []
            };
        }

        const Data = {
            invoice_id,
            payment_mode,
            payment_status,
            amount_paid,
            balance_amount,
            cash,
            upi,
            credit_card
        };

        const result = await purchaseInvoiceCrud.editInvoice(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
