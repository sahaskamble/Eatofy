import expenseCrud from "@/app/lib/crud/Expenses";

export async function edit_expense(data, tokenData) {
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
        const expense_id = data['expense_id'] || null;
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
        if (hotel_id === null || expense_name === null || date === null || payable_to === null || payment_status === null || payment_mode === null || expense_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }


        const expense_exists = await expenseCrud.checkExpense(expense_id);
        if (expense_exists.output !== true) {
            return {
                returncode: 409,
                message: "Customer with this name doesn't exists",
                output: []
            };
        }

        const Data = {
            expense_id,
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

        const result = await expenseCrud.editExpense(Data);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
