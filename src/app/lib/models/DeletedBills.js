import mongoose from "mongoose";
import { OrderTypeValidator, PaymentModeValidator, PaymentStatusValidator } from "../utils/SpecialStringsValidator";

const billsSchema = new mongoose.Schema(
  {
    Type: {
      type: String,
      required: true, // Type of bill (e.g., Dine-in, Takeaway, Delivery)
      validate: {
        validator: OrderTypeValidator
      },
      message: "Bill Type must be one of:- 'Takeaway', 'Delivery', 'Dine-In', 'Swiggy', 'Zomato', 'QR-Orders'."
    },
    TableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tables", // Reference to the Tables model (optional)
    },
    WaiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staffs", // Reference to the Staffs model (optional)
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model (optional)
      required: true,
    },
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers", // Reference to the Customers model (optional)
    },
    VatRate: {
      type: String, // VAT rate (optional)
      default: "0 %",
    },
    VatAmount: {
      type: Number, // VAT amount (optional)
      default: 0.0,
    },
    TotalAmount: {
      type: Number,
      default: 0.0, // Total bill amount
    },
    CGSTRate: {
      type: String,
      default: "0 %", // Central GST rate
    },
    SGSTRate: {
      type: String,
      default: "0 %", // State GST rate
    },
    SGSTAmount: {
      type: Number,
      default: 0.0, // State GST amount
    },
    CGSTAmount: {
      type: Number,
      default: 0.0, // Central GST amount
    },
    EatocoinsRate: {
      type: String, // Rate of Eatocoins usage (optional)
      default: "0 %",
    },
    EatocoinsAmount: {
      type: Number, // Amount deducted using Eatocoins (optional)
      default: 0.0,
    },
    MenuTotal: {
      type: Number,
      default: 0.0, // Total amount for menu items
    },
    Amount: {
      type: Number,
      default: 0.0, // Net bill amount
    },
    BalanceAmount: {
      type: Number,
      default: 0.0, // Balance to be paid
    },
    DeliveryChargesRate: {
      type: String, // Rate for delivery charges (optional)
      default: "0 %",
    },
    DeliveryChargesAmount: {
      type: Number, // Delivery charges amount (optional)
      default: 0.0,
    },
    DiscountRate: {
      type: String, // Discount rate (optional)
      default: "0 %",
    },
    DiscountPrice: {
      type: Number, // Discount price (optional)
      default: 0.0,
    },
    PaymentMode: {
      type: String,
      default: "Cash",
      validate: {
        validator: PaymentModeValidator
      },
      message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    PaymentStatus: {
      type: String,
      default: "Paid",
      validate: {
        validator: PaymentStatusValidator
      },
      message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },

    Orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders", // Reference to the Orders model
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.models.DeletedBills || mongoose.model('DeletedBills', billsSchema)
