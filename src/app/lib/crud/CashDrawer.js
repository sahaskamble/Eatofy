import CashDrawer from "../models/CashDrawer";
import { BaseCrud } from "./BaseCrud";
import Bills from "../models/Bills";
import Expenses from "../models/Expenses";

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
      const result = await this.readOne({ HotelId: hotel_id, Date: date });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
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
      // Get current date in IST
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      // Aggregate sales
      const salesResult = await Bills.aggregate([
        {
          $match: {
            HotelId: hotel_id,
            createdAt: {
              $gte: startOfDay,
              $lte: endOfDay
            },
            Status: { $ne: "Inactive" }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$Amount" },
            count: { $sum: 1 }
          }
        }
      ]);

      // Aggregate expenses
      const expensesResult = await Expenses.aggregate([
        {
          $match: {
            HotelId: hotel_id,
            createdAt: {
              $gte: startOfDay,
              $lte: endOfDay
            },
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$AmountPaid" },
            count: { $sum: 1 }
          }
        }
      ]);

      const totalSales = salesResult[0]?.count || 0;
      const salesAmount = salesResult[0]?.totalAmount || 0;
      const totalExpenses = expensesResult[0]?.count || 0;
      const expensesAmount = expensesResult[0]?.totalAmount || 0;

      // Update cash drawer
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
