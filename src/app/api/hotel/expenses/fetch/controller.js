import expenseCrud from "@/app/lib/crud/Expenses";

export async function fetch_expenses(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_expenses = await expenseCrud.readExpenses(hotel_id);

		if (existing_expenses.returncode === 200 && existing_expenses.output.length === 0) {
			return {
				returncode: 409,
				message: "No Expenses  be displayed",
				output: []
			};
		}

		return existing_expenses;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
