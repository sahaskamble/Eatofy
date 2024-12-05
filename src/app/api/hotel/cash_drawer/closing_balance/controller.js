import cashDrawerCrud from "@/app/lib/crud/CashDrawer";

export async function closing_balance(data, tokenData) {
	try {
		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.hotelId || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to create hotel",
				output: []
			};
		}

		// Extract data from FormData or direct JSON
		const hotel_id = tokenData.hotelId || null;
		const closing_balance = data['closing_balance'] || 0;
		const dropped_cash = data['dropped_cash'] || 0;
		const cash_withdrawn = data['cash_withdrawn'] || 0;
		const refunds = data['refunds'] || 0;

		if (hotel_id === null) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const Data = { hotel_id, closing_balance, dropped_cash, cash_withdrawn, refunds }
		const result = await cashDrawerCrud.ClosingBalance(Data);
		const sum = await cashDrawerCrud.sumSalesAndExpenses(hotel_id, result.output._id);
		console.log(sum);
		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
