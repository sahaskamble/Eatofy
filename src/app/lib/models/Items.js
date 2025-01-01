import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";

export const itemSchema = new mongoose.Schema(
  {
    ItemName: {
      type: String,
      required: true, // ItemName is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Item Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true, // HotelId is mandatory
    },
    Unit: {
      type: String, // KG, LTR, etc.
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Unit should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemCategory", // Reference to the `ItemCategories` collection
      required: true, // CategoryId is mandatory
    },

    // Child Relationship
    InventoryStock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InventoryStock", // Reference to `InventoryStock` collection
      },
    ],
    PurchasedStock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchasedStock", // Reference to `PurchasedStock` collection
      },
    ],
    StockReport: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StockReport", // Reference to `StockReport` collection
      },
    ],
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Add pre-remove middleware
itemSchema.pre('remove', async function(next) {
  try {
    // Check for and delete inventory stock
    const InventoryStock = mongoose.model('InventoryStock');
    await InventoryStock.deleteMany({ ItemId: this._id });

    // Delete purchased stock records
    const PurchasedStock = mongoose.model('PurchasedStock');
    await PurchasedStock.deleteMany({ ItemId: this._id });

    // Delete stock reports
    const StockReport = mongoose.model('StockReport');
    await StockReport.deleteMany({ ItemId: this._id });

    // Update purchased invoices to remove item reference
    const PurchasedInvoice = mongoose.model('PurchasedInvoice');
    await PurchasedInvoice.updateMany(
      { ItemId: this._id },
      { $unset: { ItemId: 1 } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
itemSchema.pre('deleteMany', async function(next) {
  try {
    // Get items to be deleted
    const Items = mongoose.model('Items');
    const items = await Items.find(this.getFilter());
    const itemIds = items.map(item => item._id);

    if (itemIds.length > 0) {
      // Run cleanup operations in parallel
      await Promise.all([
        // Delete inventory records
        mongoose.model('InventoryStock').deleteMany({ ItemId: { $in: itemIds } }),
        // Delete purchased stock records
        mongoose.model('PurchasedStock').deleteMany({ ItemId: { $in: itemIds } }),
        // Delete stock reports
        mongoose.model('StockReport').deleteMany({ ItemId: { $in: itemIds } }),
        // Update purchased invoices
        mongoose.model('PurchasedInvoice').updateMany(
          { ItemId: { $in: itemIds } },
          { $unset: { ItemId: 1 } }
        )
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Items || mongoose.model("Items", itemSchema);
