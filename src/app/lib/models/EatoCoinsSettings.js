import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";

export const eatocoinsSettingsSchema = new mongoose.Schema(
  {
    Visibility: {
      type: Boolean,
      default: false, // Determines if Eatocoins are enabled
      validate: {
        validator: (value) => BooleanValidator(value)
      },
      message: "Visibility should be either true or false"
    },
    CreditLimitAmt: {
      type: Number,
      default: 0, // Minimum purchase amount required to credit coins to the wallet
    },
    CreditLimitPercent: {
      type: Number,
      default: 0, // Percentage of the purchase amount credited to the wallet
    },
    RedeemLimitAmount: {
      type: Number,
      default: 0, // Minimum amount above which wallet coins can be redeemed
    },
    RedeemLimitPercent: {
      type: Number,
      default: 0, // Maximum percentage of discount allowed via Eatocoins
    },
    Rate: {
      type: Number,
      default: 0, // Conversion rate for Eatocoins
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true,
      unique: true
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.models.EatocoinsSettings || mongoose.model("EatocoinsSettings", eatocoinsSettingsSchema);
