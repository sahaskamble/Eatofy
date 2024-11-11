import { update_closing_balance } from "../../../../../db/crud/cash_drawer/management/update";
import { read_day_drawer_info } from "@/db/crud/cash_drawer/management/read";
import { sum_of_sales_and_expenses } from "./utils";

export async function closing_balance(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const closing_balance = data['closing_balance'] || 0;
		const dropped_cash = data['dropped_cash'] || 0;
		const cash_withdrawn = data['cash_withdrawn'] || 0;
		const refunds = data['refunds'] || 0;

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

		// Get drawer_id
		const today_drawer = await read_day_drawer_info({
			hotel_id,
			date: formattedDate
		});

		const drawer_id = today_drawer?.output[0]?.id || null;
		if (drawer_id != null || drawer_id != "") {
			await sum_of_sales_and_expenses(hotel_id, drawer_id);
		}

		// Adding the Opening Balance
		const result = await update_closing_balance({
			drawer_id,
			close: `${istDate}`,
			closing_balance,
			dropped_cash,
			cash_withdrawn,
			refunds
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
