import expenseCrud from "@/app/lib/crud/Expenses";

export async function add_expense(data, tokenData) {
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
        const expense_name = data['expense_name'] || null;
        const date = data['date'] || null;
        const note = data['note'] || null;
        const payable_to = data['payable_to'] || null;
        const amount_paid = data['amount_paid'] || 0;
        const amount_payable = data['amount_payable'] || 0;
        const payment_status = data['payment_status'] || null;
        const payment_mode = data['payment_mode'] || null;
        const cash = data['cash'] || 0;
        const upi = data['upi'] || 0;
        const credit_card = data['credit_card'] || 0;

        // Default Invalid Checker
        if (hotel_id === null || expense_name === null || date === null || payable_to === null || payment_status === null || payment_mode === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const Data = {
            hotel_id,
            expense_name,
            note,
            date,
            payable_to,
            amount_payable,
            amount_paid,
            payment_status,
            payment_mode,
            cash,
            upi,
            credit_card
        };

        const result = await expenseCrud.addExpense(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
