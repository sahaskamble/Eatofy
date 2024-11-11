import db from "@/db/connector";
import { update_sales_and_expense } from "../../../../../db/crud/cash_drawer/management/update";

export async function sum_of_sales_and_expenses(hotel_id, drawer_id) {
	// Get the current date in UTC, then adjust it for IST
	const now = new Date();

	const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
	const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

	const startOfDay = new Date(start.toISOString());
	const endOfDay = new Date(end.toISOString());

	// Aggregate the total amount for bills created on this day
	const sales_result = await db.bills.aggregate({
		_sum: {
			Amount: true,  // Sum up all Amount fields
		},
		_count: {
			id: true,  // Count the number of bills
		},
		where: {
			HotelId: hotel_id,
			createdAt: {
				gte: startOfDay,
				lte: endOfDay,
			},
		},
	});

	// Aggregate the total amount for expenses created on this day
	const expenses_result = await db.expenses.aggregate({
		_sum: {
			AmountPaid: true,  // Sum up all AmountPaid fields
		},
		_count: {
			id: true,  // Count the number of expenses
		},
		where: {
			HotelId: hotel_id,
			createdAt: {
				gte: startOfDay,
				lte: endOfDay,
			},
		},
	});

	const total_sales = sales_result._count.id || 0;
	const sales_amount = sales_result._sum.Amount || 0;
	const total_expenses = expenses_result._count.id || 0;
	const expenses_amount = expenses_result._sum.AmountPaid || 0;

	const result = await update_sales_and_expense({
		drawer_id,
		total_sales,
		total_expenses,
		sales_amount,
		expenses_amount
	});

	return result;
}
