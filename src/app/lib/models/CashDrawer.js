import mongoose from "mongoose";

export const cashDrawerSchema = new mongoose.Schema(
  {
    OpeningBalance: {
      type: Number,
      default: 0.0, // The opening balance for the drawer
    },
    ClosingBalance: {
      type: Number,
      default: 0.0, // The closing balance for the drawer
    },
    TotalSales: {
      type: Number,
      required: false, // Total sales amount (optional)
    },
    SalesAmount: {
      type: Number,
      default: 0.0, // Amount from sales transactions
    },
    DroppedCash: {
      type: Number,
      default: 0.0, // Cash dropped into the drawer
    },
    CashWithdrawn: {
      type: Number,
      default: 0.0, // Amount of cash withdrawn
    },
    Refunds: {
      type: Number,
      default: 0.0, // Total refunds processed
    },
    TotalExpenses: {
      type: Number,
      required: false, // Total expenses recorded (optional)
    },
    ExpensesAmount: {
      type: Number,
      default: 0.0, // Total expenses amount
    },
    Date: {
      type: String,
      required: false, // Date of the cash drawer record (optional)
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true, // Relates this drawer record to a hotel
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.models.CashDrawer 
