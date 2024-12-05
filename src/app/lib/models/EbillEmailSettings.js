import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";

export const ebillEmailSettingsSchema = new mongoose.Schema(
  {
    Visibility: {
      type: Boolean,
      default: false, // Determines if the Ebill email settings are enabled
      validate: {
        validator: (value) => BooleanValidator(value)
      },
      message: "Visibility should be either true or false"
    },
    Email: {
      type: String,
      default: null,// Email used for Ebill email notifications
    },
    AppPassword: {
      type: String,
      default: null, // App password for email account
    },
    UPIID: {
      type: String,
      default: null, // UPI ID for transactions
    },
    MerchantName: {
      type: String,
      default: null, // Name of the merchant for the Ebill email
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.models.EbillEmailSettings 
