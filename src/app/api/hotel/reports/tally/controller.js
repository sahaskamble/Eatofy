import cashDrawerCrud from "@/app/lib/crud/CashDrawer";

export async function fetch_tally_reports(data, tokenData) {
    try {
        const hotel_id = tokenData.hotelId || null;
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

        // Get tally data with aggregation
        const tally_response = await cashDrawerCrud.readMany({
            HotelId: hotel_id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (tally_response.returncode !== 200) {
            return {
                returncode: 500,
                message: "Error fetching tally data",
                output: []
            };
        }

        const tally_result = tally_response.output;

        // Calculate metrics
        const tally_metrics = tally_result.reduce((acc, curr) => ({
            SalesAmount: (acc.SalesAmount || 0) + (curr.SalesAmount || 0),
            DroppedCash: (acc.DroppedCash || 0) + (curr.DroppedCash || 0),
            CashWithdrawn: (acc.CashWithdrawn || 0) + (curr.CashWithdrawn || 0),
            Refunds: (acc.Refunds || 0) + (curr.Refunds || 0),
            ExpensesAmount: (acc.ExpensesAmount || 0) + (curr.ExpensesAmount || 0),
            TotalSales: (acc.TotalSales || 0) + (curr.TotalSales || 0),
            TotalExpenses: (acc.TotalExpenses || 0) + (curr.TotalExpenses || 0),
            OpeningBalance: (acc.OpeningBalance || 0) + (curr.OpeningBalance || 0),
            ClosingBalance: (acc.ClosingBalance || 0) + (curr.ClosingBalance || 0)
        }), {});

        // Calculate counts
        let CashWithdrawnCounts = 0, RefundsCounts = 0, DroppedCashCounts = 0;
        tally_result.forEach((entry) => {
            if (entry.DroppedCash > 0) DroppedCashCounts++;
            if (entry.CashWithdrawn > 0) CashWithdrawnCounts++;
            if (entry.Refunds > 0) RefundsCounts++;
        });

        // Prepare chart data
        const chart_data = tally_result.map((record) => {
            const salesAmount = record.SalesAmount || 0;
            const cashWithdrawn = record.CashWithdrawn || 0;
            const droppedCash = record.DroppedCash || 0;
            const refunds = record.Refunds || 0;
            const expensesAmount = record.ExpensesAmount || 0;

            return {
                date: record.Date,
                profitOrLoss: salesAmount - (cashWithdrawn + droppedCash + refunds + expensesAmount)
            };
        });

        return {
            returncode: 200,
            message: "Tally Reports",
            output: {
                Metrics: tally_metrics,
                Count: {
                    CashWithdraw: CashWithdrawnCounts,
                    DroppedCash: DroppedCashCounts,
                    Refunds: RefundsCounts
                },
                Data: tally_result,
                Chart: {
                    Dates: chart_data.map(item => item.date),
                    ProfitLoss: chart_data.map(item => item.profitOrLoss)
                }
            }
        };
    } catch (error) {
        console.error('Tally reports error:', error);
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}