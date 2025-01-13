import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";
import { ExpenseCategoryValidator, PaymentModeValidator, PaymentStatusValidator } from "../utils/SpecialStringsValidator";
import FloatValidator from "../utils/FloatValidator";

export const expensesSchema = new mongoose.Schema(
  {
    ExpenseName: {
      type: String,
      required: true, // Name of the expense (e.g., electricity, rent, etc.)
      validate: {
        validator: (value) => ExpenseCategoryValidator(value)
      },
      message: "Expense Category must be one of:- 'Salary', 'Purchases', 'Miscellaneous'."

    },
    Note: {
      type: String, // Optional additional details about the expense
    },
    Date: {
      type: String,
      required: true, // Date of the expense in string format
    },
    PayableTo: {
      type: String,
      required: true, // The recipient of the payment
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Bearer Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"

    },
    AmountPayable: {
      type: Number,
      default: 0.0, // The balance amount payable
    },
    AmountPaid: {
      type: Number,
      required: true, // The amount that has been paid so far
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Amount Paid must be a non-negative number."
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true,
    },
    PaymentMode: {
      type: String,
      default: "Cash",
      validate: {
        validator: (value) => PaymentModeValidator(value)
      },
      message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    PaymentStatus: {
      type: String,
      default: "Paid",
      validate: {
        validator: (value) => PaymentStatusValidator(value)
      },
      message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    Cash: {
      type: Number,
      default: 0.0
    },
    UPI: {
      type: Number,
      default: 0.0
    },
    CreditCard: {
      type: Number,
      default: 0.0
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.models.Expenses || mongoose.model("Expenses", expensesSchema);
