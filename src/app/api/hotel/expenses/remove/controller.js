import expenseCrud from "@/app/lib/crud/Expenses";

export async function remove_expense(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const expense_id = data['expense_id'] || null;

        if (expense_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Expense ID is required",
                output: []
            });
        }

        const result = await expenseCrud.deleteExpense(expense_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
