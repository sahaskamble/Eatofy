import { add_opening_balance } from "../../../../../db/crud/cash_drawer/management/create";
import { sum_of_sales_and_expenses } from "../closing_balance/utils";

export async function opening_balance(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const opening_balance = data['opening_balance'] || null;

		// Default Invalid Checker
		if (hotel_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Create a new Date instance in UTC and format it in IST
		const now = new Date().toLocaleString("en-US", {
			timeZone: "Asia/Kolkata",
		});

		// Parse the IST date back to a Date object
		const istDate = new Date(now);

		// Format the date as "1 December 2023"
		const formattedDate = new Intl.DateTimeFormat("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		}).format(istDate);

		// Adding the Opening Balance
		const result = await add_opening_balance({
			hotel_id,
			open: `${istDate}`,
			opening_balance,
			date: formattedDate
		});

		const drawer_id = result?.output[0]?.id || null;
		if (drawer_id != null || drawer_id != "") {
			await sum_of_sales_and_expenses(hotel_id, drawer_id);
		}

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
