import stockReportCrud from "@/app/lib/crud/StockReport";

export async function fetch_stock_report(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_report = await stockReportCrud.readStockReport(hotel_id);

		if (existing_report.returncode === 200 && existing_report.output.length === 0) {
			return {
				returncode: 409,
				message: "No Sections to be displayed",
				output: []
			};
		}

		return existing_report;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
