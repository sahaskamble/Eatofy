import purchaseInvoiceCrud from "@/app/lib/crud/PurchasedInvoice";

export async function remove_invoice(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const invoice_id = data['invoice_id'] || null;

        if (invoice_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Item ID is required",
                output: []
            });
        }

        const result = await purchaseInvoiceCrud.deleteInvoice(invoice_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
