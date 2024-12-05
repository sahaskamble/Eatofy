import cashDrawerCrud from "@/app/lib/crud/CashDrawer";

export async function check_opening_balace(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const check = await cashDrawerCrud.checkOpeningBalance(hotel_id);

		if (check.returncode === 200 && check.output.length === 0) {
			return {
				returncode: 409,
				message: "No Opening Balance found.",
				output: []
			};
		}

		return check;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

export async function opening_balance(data, tokenData) {
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
		const opening_balance = data['opening_balance'] || null;

		if (hotel_id === null || opening_balance === null) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const Data = { hotel_id, opening_balance }
		const result = await cashDrawerCrud.OpeningBalance(Data);
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
