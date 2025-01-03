import expenseCrud from "@/app/lib/crud/Expenses";
import inventoryStockCrud from "@/app/lib/crud/InventoryStock";
import purchaseInvoiceCrud from "@/app/lib/crud/PurchasedInvoice";
import purchaseStockCrud from "@/app/lib/crud/PurchasedStock";
import suppliersCrud from "@/app/lib/crud/Suppliers";
import FormatDate from "@/app/lib/utils/DateFormatter";

export async function add_invoice(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId || null;

        // Invoice params
        const invoice_no = data['invoice_no'] || null;
        const payment_mode = data['payment_mode'] || null;
        const amount_paid = data['amount_paid'] || null;
        const balance_amount = data['balance_amount'] || null;
        const payment_status = data['payment_status'] || null;
        const supplier_id = data['supplier_id'] || null;
        const invoice_date = data['invoice_date'] || null;
        const cash = data['cash'] || null;
        const upi = data['upi'] || null;
        const credit_card = data['credit_card'] || null;

        // Item Params
        const stock_data = data['stock_data'] || null;

        // Default Invalid Checker
        if (payment_status == null || payment_status == null || supplier_id == null || hotel_id == null || invoice_date == null || invoice_no == null || stock_data == null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const invoiceData = {
            invoice_no,
            payment_mode,
            payment_status,
            amount_paid,
            balance_amount,
            supplier_id,
            invoice_date,
            hotel_id,
            cash,
            upi,
            credit_card
        };

        const invoice_result = await purchaseInvoiceCrud.createInvoice(invoiceData);
        const invoice_id = invoice_result.output._id;
        const supplier_info = await suppliersCrud.readSupplier(supplier_id);

        let error_flag = false; let errors = [];
        await stock_data.forEach(async (stock) => {
            const data = {
                invoice_id,
                item_id: stock.item_id,
                quantity: stock.quantity,
                per_price: stock.per_price,
                total_price: stock.total_price
            }

            const stockResult = await purchaseStockCrud.addItems(data);
            console.log(stockResult);
            const inventoryResult = await inventoryStockCrud.addStock({
                hotel_id, item_id: stock.item_id, quantity: stock.quantity
            });
            console.log(inventoryResult);

            if ((stockResult.returncode !== 200 || stockResult.output.length === 0) && (inventoryResult.returncode !== 200 || inventoryResult.output.length === 0)) {
                error_flag = true;
                errors.push(stockResult.message)
                errors.push(inventoryResult.message)
            }
        });

        const today = new Date()
        const date = FormatDate(today);
        const expenseResult = await expenseCrud.addExpense({
            expense_name: "Purchases",
            date,
            payable_to: supplier_info.output.SupplierName,
            amount_payable: balance_amount,
            amount_paid,
            hotel_id,
            payment_mode,
            payment_status,
            cash,
            upi,
            credit_card
        });

        if (error_flag && expenseResult.returncode !== 200) {
            return {
                returncode: 503,
                message: "Some Errors occured",
                output: errors
            }
        }
        else {
            return {
                returncode: 200,
                message: "Invoice Added",
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
