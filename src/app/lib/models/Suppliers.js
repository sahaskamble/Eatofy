import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";

export const supplierSchema = new mongoose.Schema(
  {
    SupplierName: {
      type: String,
      required: true, // SupplierName is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Supplier Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    SupplierType: {
      type: String,
      required: true, // SupplierType is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Supplier Type should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Contact: {
      type: String,
      required: true, // Contact is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Contact should not contain invalid characters like /, \\, \", ;, ', +, `, or ^ & must be of 10 characters."
    },
    Email: {
      type: String,
      default: null
    },
    GSTIN: {
      type: String,
      required: true, // GSTIN is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "GSTIN should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"

    },
    Address: {
      type: String,
      required: true, // Address is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Address should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"

    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true, // Hotel reference is optional
    },

    // Child Relationship
    StockInvoice: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchasedInvoice", // Reference to `PurchasedInvoice` collection
      },
    ],
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Unique constraint on HotelId and Contact
supplierSchema.index({ HotelId: 1, Contact: 1 }, { unique: true });

// Add pre-remove middleware
supplierSchema.pre('remove', async function(next) {
  try {

    // Check for and delete related menus
    const PurchasedInvoice = mongoose.model('PurchasedInvoice');
    await PurchasedInvoice.deleteMany({ SupplierId: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
supplierSchema.pre('deleteMany', async function(next) {
  try {
    // Get the sections that will be deleted
    const Suppliers = mongoose.model('Suppliers');
    const suppliers = await Suppliers.find(this.getFilter());
    const supplierIds = suppliers.map(supplier => supplier._id);

    if (supplierIds.length > 0) {
      // Delete all related menus
      const PurchasedInvoice = mongoose.model('PurchasedInvoice');
      await PurchasedInvoice.deleteMany({ SupplierId: { $in: supplierIds } });
    }

    next();
  } catch (error) {
    next(error);
  }
});
export default mongoose.models.Suppliers || mongoose.model("Suppliers", supplierSchema); 
