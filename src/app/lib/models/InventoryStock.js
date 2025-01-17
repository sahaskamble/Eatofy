import mongoose from "mongoose";
import FloatValidator from "../utils/FloatValidator";
import { StockStatusValidator } from "../utils/SpecialStringsValidator";

export const inventoryStockSchema = new mongoose.Schema(
  {
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true,
    },
    ItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items", // Reference to the `Items` collection
      required: true,
    },
    Quantity: {
      type: Number,
      required: true, // Quantity is mandatory
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Quantity must be a non-negative number."
    },
    Status: {
      type: String,
      default: "Available", // Default status is "Available"
      validate: {
        validator: (value) => StockStatusValidator(value)
      },
      message: "Stock Status must be one of:- 'Available', 'Low Stock', 'Unavailable'."
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

export default mongoose.models.InventoryStock || mongoose.model("InventoryStock", inventoryStockSchema); 
