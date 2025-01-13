import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";
import { SubscriptionStatusValidator, PaymentStatusValidator, PaymentModeValidator } from "../utils/SpecialStringsValidator";

export const HotelSubscriptionSchema = new mongoose.Schema(
  {
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels collection
      required: true,
    },
    SubscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriptions", // Reference to the Subscriptions collection
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
      validate: {
        validator: (value) => BooleanValidator(value)
      },
      message: "isValid should be either true or false"
    },
    StartDate: {
      type: String, // Stored as a string (e.g., "YYYY-MM-DD")
      required: true,
    },
    EndDate: {
      type: String, // Stored as a string (e.g., "YYYY-MM-DD")
      required: true,
    },
    Status: {
      type: String,
      default: "On Going",
      validate: {
        validator: (value) => SubscriptionStatusValidator(value)
      },
      message: "Status must be one of:- 'Waiting', 'On Going', 'Expired', 'About to Expire'."
    },
    PaymentStatus: {
      type: String,
      default: "Paid",
      validate: {
        validator: (value) => PaymentStatusValidator(value)
      },
      message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    PaymentMode: {
      type: String,
      default: "Cash",
      validate: {
        validator: (value) => PaymentModeValidator(value)
      },
      message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
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
  { timestamps: true }
);

export default mongoose.models.HotelSubscription || mongoose.model("HotelSubscription", HotelSubscriptionSchema);
