import mongoose from "mongoose";
import FloatValidator from "../utils/FloatValidator";

export const purchasedStockSchema = new mongoose.Schema(
  {
    InvoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchasedInvoice", // Reference to the `PurchasedInvoice` collection
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
    UnitPrice: {
      type: Number,
      required: true, // Unit Price is mandatory
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Unit Price must be a non-negative number."
    },
    TotalPrice: {
      type: Number,
      required: true, // Total Price is mandatory
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Total Price must be a non-negative number."
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Pre-remove middleware for single document
purchasedStockSchema.pre('deleteOne', { document: true }, async function(next) {
  try {

    // Update menu if needed
    if (this.InvoiceId) {
      const PurchasedInvoice = mongoose.model('PurchasedInvoice');
      await PurchasedInvoice.findByIdAndUpdate(this.InvoiceId, {
        $pull: { Stock: this._id }
      });
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Pre-deleteMany middleware for multiple documents
purchasedStockSchema.pre('deleteMany', async function(next) {
  try {
    const PurchasedStock = mongoose.model('PurchasedStock');
    const stock = await PurchasedStock.find(this.getFilter());

    if (stock.length > 0) {
      const stockIds = stock.map(item => item.InvoiceId).filter(Boolean);

      if (stockIds.length > 0) {
        const PurchasedInvoice = mongoose.model('PurchasedInvoice');
        await PurchasedInvoice.updateMany(
          { _id: { $in: stockIds } },
          { $pull: { Stock: { $in: stock.map(item => item._id) } } }
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Unique constraint on InvoiceId and ItemId
purchasedStockSchema.index({ InvoiceId: 1, ItemId: 1 }, { unique: true });

export default mongoose.models.PurchasedStock || mongoose.model("PurchasedStock", purchasedStockSchema); 
