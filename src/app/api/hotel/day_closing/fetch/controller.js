import cashDrawerCrud from "@/app/lib/crud/CashDrawer";
import inventoryStockCrud from "@/app/lib/crud/InventoryStock";
import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";
import Bills from "@/app/lib/models/Bills";
import Expenses from "@/app/lib/models/Expenses";
import PurchasedInvoice from "@/app/lib/models/PurchasedInvoice";

export async function fetch_day_closing(data, tokenData) {
	try {

		const hotel_id = await tokenData.hotelId || null;
		const date = data['date'] || null;

		if (hotel_id === null || date === null) {
			return { returncode: 400, message: "Missing Required Params", output: [] }
		}

		// Daily Galla Info
		const drawer_info = await cashDrawerCrud.readDrawer(hotel_id, date);
		const drawer_id = drawer_info.output._id;
		const day_drawer_info = await cashDrawerCrud.sumSalesAndExpenses(hotel_id, drawer_id);

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
		const purchase_date = startOfDay.toISOString().split('T')[0];

		// Fetch bills created on this day
		const sales_result = await Bills.find({
			HotelId: hotel_id,
			createdAt: {
				$gte: startOfDay,
				$lte: endOfDay,
			}
		}).populate(['WaiterId', 'CustomerId']);

		// Fetch expenses created on this day
		const expenses_result = await Expenses.find({
			HotelId: hotel_id,
			createdAt: {
				$gte: startOfDay,
				$lte: endOfDay,
			}
		});

		// Fetch purchases created on this day
		const purchases_result = await PurchasedInvoice.find({
			HotelId: hotel_id,
			Date: purchase_date
		}).populate(['SupplierId']);

		// Attendances Fetch
		const date_iso = startOfDay.toISOString().split('T')[0];
		const attendances_result = await staffAttendanceCrud.readAttendance(hotel_id, date_iso);

		// Stock Fetch
		const stock_result = await inventoryStockCrud.readStock(hotel_id);

		return {
			returncode: 200,
			message: "Day Closing",
			output: {
				DrawerData: day_drawer_info.output,
				ExpensesData: expenses_result,
				SalesData: sales_result,
				PurchasesData: purchases_result,
				Inventory: stock_result.output,
				Attendances: attendances_result.output
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
