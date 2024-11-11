import db from "@/db/connector";

// Closing Balance
export async function update_closing_balance({
	drawer_id,
	close,
	closing_balance,
	dropped_cash,
	cash_withdrawn,
	refunds
}) {
	try {

		// Updating the record
		const result = await db.cashDrawer.updateMany({
			where: {
				id: drawer_id
			},
			data: {
				Close: close,
				ClosingBalance: closing_balance,
				DroppedCash: dropped_cash,
				CashWithdrawn: cash_withdrawn,
				Refunds: refunds
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Sales and Expenses Amount Data Update
export async function update_sales_and_expense({
	drawer_id,
	total_sales,
	total_expenses,
	sales_amount,
	expenses_amount
}) {
	try {

		// Updating the record
		const result = await db.cashDrawer.update({
			where: {
				id: drawer_id
			},
			data: {
				TotalSales: total_sales,
				SalesAmount: sales_amount,
				TotalExpenses: total_expenses,
				ExpensesAmount: expenses_amount
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
