import db from "@/db/connector";

export async function fetch_tally_reports(data) {

	try {

		const hotel_id = data['hotel_id'] || null;
		const from = data['from'] || null;
		const to = data['to'] || null;

		// Default Invalid Checker
		if (hotel_id === null || from === null || to === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

		// Logic for getting Sales and Expenses data for that day 
		const _from = new Date(from);
		const _to = new Date(to);

		const start = new Date(_from.setUTCHours(0, 0, 0, 0));
		const end = new Date(_to.setUTCHours(23, 59, 59, 999));
		const startOfDay = new Date(start.toISOString());
		const endOfDay = new Date(end.toISOString());

		// Metrics of Overall sum
		const tally_metrics = await db.cashDrawer.aggregate({
			_sum: {
				SalesAmount: true,
				DroppedCash: true,
				CashWithdrawn: true,
				Refunds: true,
				ExpensesAmount: true,
				TotalSales: true,
				TotalExpenses: true,
				OpeningBalance: true,
				ClosingBalance: true
			},
			where: {
				HotelId: hotel_id,
				createdAt: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
		});

		// Table Data
		const tally_result = await db.cashDrawer.findMany({
			where: {
				HotelId: hotel_id,
				createdAt: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
		});

		let CashWithdrawnCounts = 0, RefundsCounts = 0, DroppedCashCounts = 0;
		tally_result.map((entry) => {
			if (entry.DroppedCash > 0) {
				DroppedCashCounts = DroppedCashCounts + 1;
			}
			if (entry.CashWithdrawn > 0) {
				CashWithdrawnCounts = CashWithdrawnCounts + 1;
			}
			if (entry.Refunds > 0) {
				RefundsCounts = RefundsCounts + 1;
			}
		})

		// Chart Data
		let dates_array = [], profitOrLoss_Array = [];

		tally_result.map((record) => {
			const salesAmount = record.SalesAmount || 0;
			const cashWithdrawn = record.CashWithdrawn || 0;
			const droppedCash = record.DroppedCash || 0;
			const refunds = record.Refunds || 0;
			const expensesAmount = record.ExpensesAmount || 0;

			// Calculate profit or loss
			const profitOrLoss = (salesAmount) - (cashWithdrawn + droppedCash + refunds + expensesAmount);

			dates_array.push(record.Date);
			profitOrLoss_Array.push(profitOrLoss);

		})

		return {
			returncode: 200,
			message: "Tally Reports",
			output: {
				Metrics: tally_metrics._sum,
				Count: {
					CashWithdraw: CashWithdrawnCounts,
					DroppedCash: DroppedCashCounts,
					Refunds: RefundsCounts
				},
				Data: tally_result,
				Chart: {
					Dates: dates_array,
					ProfitLoss: profitOrLoss_Array
				}
			}
		}
	}
	catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
} 
