import CashDrawer from "../models/CashDrawer";
import { BaseCrud } from "./BaseCrud";
import Expenses from "../models/Expenses";
import billsCrud from "./Bills";
import expenseCrud from "./Expenses";

class CashDrawerCrud extends BaseCrud {
  constructor() {
    super(CashDrawer);
  }

  async checkOpeningBalance(hotel_id) {
    try {

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

      const result = await this.readMany(
        { HotelId: hotel_id, Date: formattedDate }
      );
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readDrawer(hotel_id, date) {
    try {
      return await this.readOne({ HotelId: hotel_id, Date: date });
    } catch (error) {
      return { returncode: 500, message: error.message, output: [] }
    }
  }

  async OpeningBalance(data) {
    try {

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

      const normalizedData = {
        HotelId: data.hotel_id,
        Date: formattedDate,
        OpeningBalance: data.opening_balance
      }

      const result = await this.create(normalizedData);
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async ClosingBalance(data) {
    try {
      const updateData = {
        ClosingBalance: data.closing_balance,
        DroppedCash: data.dropped_cash,
        CashWithdrawn: data.cash_withdrawn,
        Refunds: data.refunds
      }
      const hotel_id = data.hotel_id;
      const result = await this.update(
        { HotelId: hotel_id },
        updateData,
        { new: true }
      );
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async sumSalesAndExpenses(hotel_id, drawer_id) {
    try {
      const drawer = await this.readOne({ _id: drawer_id });
      if (!drawer) {
        throw new Error('Cash drawer not found');
      }
      const [day, month, year] = drawer.output.Date.split(' ');
      // Create start and end dates directly in UTC for the calendar date
      const startOfDay = new Date(Date.UTC(
        parseInt(year),
        new Date(`${month} 1, ${year}`).getMonth(),
        parseInt(day),
        0, // 00:00 UTC
        0
      ));
      const endOfDay = new Date(Date.UTC(
        parseInt(year),
        new Date(`${month} 1, ${year}`).getMonth(),
        parseInt(day),
        23, // 23:59:59.999 UTC
        59,
        59,
        999
      ));
      // Aggregate sales with proper date range
      const salesData = await billsCrud.readMany({
        HotelId: hotel_id,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        },
      });
      // Calculate totals from salesData
      const totalSales = salesData.output.length;
      const salesAmount = salesData.output.reduce((sum, bill) => sum + (bill.Amount || 0), 0);
      // Aggregate expenses
      const expensesResult = await expenseCrud.readMany({
        HotelId: hotel_id,
        Date: drawer.output.Date
      });
      // Calculate expenses
      const totalExpenses = expensesResult.output.length || 0;
      const expensesAmount = expensesResult.output.reduce((sum, invoice) => sum + (invoice.AmountPaid || 0), 0);
      // Update cash drawer with the calculated values
      const updateResult = await this.update(
        { _id: drawer_id },
        {
          TotalSales: totalSales,
          TotalExpenses: totalExpenses,
          SalesAmount: salesAmount,
          ExpensesAmount: expensesAmount
        },
        { new: true }
      );
      return updateResult;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: null
      };
    }
  }


}

const cashDrawerCrud = new CashDrawerCrud();
export default cashDrawerCrud;
