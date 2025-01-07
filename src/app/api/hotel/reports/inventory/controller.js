import stockReportCrud from "@/app/lib/crud/StockReport";
import { stock_values_mapper, values_mapper } from "./utils";

export const datetime_formatter = (date) => {
    // Get the day, month, and year
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Combine the day, month, and year with the ordinal suffix
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}

export async function fetch_inventory_reports(data, tokenData) {
    try {
        const hotel_id = tokenData.hotelId || null;
        const from = data['from'] || null;
        const to = data['to'] || null;

        // Default Invalid Checker
        if (hotel_id == null || from == null || to == null) {
            return {
                returncode: 400,
                message: 'Invalid Input',
                output: []
            }
        }
        const from_date_datetime = new Date(from);
        const to_date_datetime = new Date(to);

        const from_date = new Date(from_date_datetime.setUTCHours(0, 0, 0, 0));
        const to_date = new Date(to_date_datetime.setUTCHours(23, 59, 59, 999));

        const inventory_data = await Inventory_Data(hotel_id, from_date, to_date);
        return {
            returncode: 200,
            message: "Fetched Inventory Report",
            output: inventory_data
        }

    } catch (error) {
        console.error(error)
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}

const Inventory_Data = async (hotel_id, from_date, to_date) => {
    const inventory_data = await stockReportCrud.readMany({
        HotelId: hotel_id,
        createdAt: {
            $gte: from_date,
            $lte: to_date
        }
    }, {
        populate: "ItemId"
    });

    const metrics = stock_values_mapper(inventory_data.output);
    const date_wise = values_mapper(inventory_data.output);


    if (inventory_data.returncode !== 200) {
        throw new Error("Error fetching inventory data");
    }

    return {
        Data: inventory_data.output,
        Metrics: metrics,
        Chart: date_wise
    }

}
