import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";

export const invoicePrinterSettingsSchema = new mongoose.Schema(
  {
    Visibility: {
      type: Boolean,
      default: false, // Determines if the Invoice printer settings are enabled
      validate: {
        validator: (value) => BooleanValidator(value)
      },
      message: "Visibility should be either true or false"
    },
    NetworkIP: {
      type: String,
      default: null, // IP address for network printers
    },
    Encoding: {
      type: String,
      default: null, // Encoding for the printer
    },
    BluetoothMac: {
      type: String,
      default: null, // MAC address for Bluetooth printers
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true,
      unique: true
    },
    Status: {
      type: String,
      default: "Active", // Status of the invoice printer settings
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.models.InvoicePrinterSettings || mongoose.model("InvoicePrinterSettings", invoicePrinterSettingsSchema); 
