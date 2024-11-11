import { read_expenses_asc } from "@/db/crud/expenses/management/read";
import { values_mapper } from "./utils";

export async function fetch_expenses_reports(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const from = data['from'] || null;
		const to = data['to'] || null;

		// Default Invalid Checker
		if (hotel_id == null || from == null || to == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}
		const from_date_datetime = new Date(from);
		const to_date_datetime = new Date(to);

		const from_date = new Date(from_date_datetime.setUTCHours(0, 0, 0, 0));
		const to_date = new Date(to_date_datetime.setUTCHours(23, 59, 59, 999));
		const start = new Date(from_date.toISOString());
		const end = new Date(to_date.toISOString());

		// Expenses
		const response = await read_expenses_asc({
			hotel_id
		});

		const expense_res = response.output;
		let expenses = expense_res.filter((expense) => {
			expense.Datetime = new Date(expense.Date);
			return start <= expense.Datetime && expense.Datetime <= end;
		});

		const expense_wise = values_mapper(expenses, "ExpenseName");
		let amount = 0;
		expense_wise.Amount.map((expense) => { amount += expense });

		return {
			returncode: 200,
			message: "Expense Reports",
			output: {
				ExpenseWise: expense_wise,
				FullData: expenses,
				TotalAmount: amount
			}
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
