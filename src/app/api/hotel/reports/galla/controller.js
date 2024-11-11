import db from "@/db/connector";
import { read_day_drawer_info } from "@/db/crud/cash_drawer/management/read";
import { sum_of_sales_and_expenses } from "../../cash_drawer/closing_balance/utils"

export async function fetch_galla_reports(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const date = data['date'] || null;

		// Default Invalid Checker
		if (hotel_id === null || date === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

		// Daily Galla Info
		const drawer_info = await read_day_drawer_info({
			hotel_id, date
		});

		const drawer_id = drawer_info.output[0].id;
		await sum_of_sales_and_expenses(hotel_id, drawer_id);


		// Logic for getting Sales and Expenses data for that day 
		const [day, month, year] = date.split(" ");

		// Convert the month name to a zero-based month index
		const monthIndex = new Date(`${month} 1, 2024`).getMonth();

		// Create a UTC date
		const request_date = new Date(Date.UTC(year, monthIndex, day));

		// Start and end of the day in UTC
		const start = new Date(Date.UTC(request_date.getUTCFullYear(), request_date.getUTCMonth(), request_date.getUTCDate()));
		const end = new Date(Date.UTC(request_date.getUTCFullYear(), request_date.getUTCMonth(), request_date.getUTCDate(), 23, 59, 59, 999));

		const startOfDay = new Date(start.toISOString());
		const endOfDay = new Date(end.toISOString());

		// Aggregate the total amount for bills created on this day
		const sales_result = await db.bills.findMany({
			where: {
				HotelId: hotel_id,
				createdAt: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
			include: {
				Waiter: true,
				Customer: true
			}
		});

		// Aggregate the total amount for expenses created on this day
		const expenses_result = await db.expenses.findMany({
			where: {
				HotelId: hotel_id,
				createdAt: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
		});

		return {
			returncode: 200,
			message: "Galla Reports",
			output: {
				DrawerData: drawer_info.output[0],
				ExpensesData: expenses_result,
				SalesData: sales_result
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
