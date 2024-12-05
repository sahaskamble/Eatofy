import expensesCrud from "@/app/lib/crud/Expenses";

function values_mapper(data, key) {
    const result = {
        Labels: [],
        Amount: []
    };

    // Group expenses by the key (ExpenseName)
    const groupedData = data.reduce((acc, item) => {
        const keyValue = item[key];
        if (!acc[keyValue]) {
            acc[keyValue] = 0;
        }
        acc[keyValue] += item.AmountPaid;
        return acc;
    }, {});

    // Convert grouped data to arrays
    for (const [label, amount] of Object.entries(groupedData)) {
        result.Labels.push(label);
        result.Amount.push(amount);
    }

    return result;
}

export async function fetch_expenses_reports(data, tokenData) {
    try {
        const hotel_id = tokenData.hotelId || null;
        const { from, to } = data;

        // Input validation
        if (!hotel_id || !from || !to) {
            return {
                returncode: 400,
                message: 'Invalid Input',
                output: []
            };
        }

        // Parse and set date range
        const from_date_datetime = new Date(from);
        const to_date_datetime = new Date(to);

        const from_date = new Date(from_date_datetime.setUTCHours(0, 0, 0, 0));
        const to_date = new Date(to_date_datetime.setUTCHours(23, 59, 59, 999));
        const start = new Date(from_date.toISOString());
        const end = new Date(to_date.toISOString());

        // Fetch expenses
        const response = await expensesCrud.readExpenses(hotel_id);

        if (response.returncode !== 200) {
            return response;
        }

        // Filter expenses by date range
        const expenses = response.output.filter((expense) => {
            expense.Datetime = new Date(expense.Date);
            return start <= expense.Datetime && expense.Datetime <= end;
        });

        // Group expenses by name and calculate totals
        const expense_wise = values_mapper(expenses, "ExpenseName");
        const total_amount = expense_wise.Amount.reduce((sum, amount) => sum + amount, 0);

        return {
            returncode: 200,
            message: "Expense Reports",
            output: {
                ExpenseWise: expense_wise,
                FullData: expenses,
                TotalAmount: total_amount
            }
        };

    } catch (error) {
        console.error('Expense reports error:', error);
        return {
            returncode: 500,
            message: error.message || 'Internal server error',
            output: []
        };
    }
}
