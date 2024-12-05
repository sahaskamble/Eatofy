import billsCrud from "@/app/lib/crud/Bills";
import expensesCrud from "@/app/lib/crud/Expenses";
import cashDrawerCrud from "@/app/lib/crud/CashDrawer";

export async function fetch_galla_reports(data, tokenData) {
    try {
        const hotel_id = tokenData.hotelId || null;
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
        const drawer_info = await cashDrawerCrud.readDrawer(hotel_id, date);
        const drawer_id = drawer_info.output._id;
        await cashDrawerCrud.sumSalesAndExpenses(hotel_id, drawer_id);

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

        // Get sales data
        const sales_response = await billsCrud.readMany({
            HotelId: hotel_id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            },
        });

        // Get expenses data
        const expenses_response = await expensesCrud.readMany({
            HotelId: hotel_id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            },
        });

        if (sales_response.returncode !== 200 || expenses_response.returncode !== 200) {
            return {
                returncode: 500,
                message: "Error fetching sales or expenses data",
                output: []
            };
        }

        return {
            returncode: 200,
            message: "Galla Reports",
            output: {
                DrawerData: drawer_info.output,
                ExpensesData: expenses_response.output,
                SalesData: sales_response.output
            }
        };

    } catch (error) {
        console.error('Galla reports error:', error);
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
