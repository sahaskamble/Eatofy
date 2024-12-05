import mongoose from "mongoose";
import FloatValidator from "../utils/FloatValidator";
import { PaymentModeValidator, PaymentStatusValidator } from "../utils/SpecialStringsValidator";

export const purchasedInvoiceSchema = new mongoose.Schema(
  {
    InvoiceNo: {
      type: String,
      default: null, // Invoice number is optional
    },
    Date: {
      type: String, // Date of the invoice
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
    AmountPaid: {
      type: Number,
      required: true, // Paid amount is mandatory
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Amount Paid must be a non-negative number."
    },
    BalanceAmount: {
      type: Number,
      default: 0.0, // Default balance amount is 0.00
    },
    PaymentStatus: {
      type: String,
      default: "Paid",
      validate: {
        validator: (value) => PaymentStatusValidator(value)
      },
      message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    SupplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suppliers", // Reference to the `Suppliers` collection
      required: true,
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true,
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

    // Child Relationship
    Stock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchasedStock", // Reference to `PurchasedStock` collection
      },
    ],
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Add pre-remove middleware
purchasedInvoiceSchema.pre('remove', async function(next) {
  try {
    // Check payment status
    if (this.PaymentStatus === 'Unpaid' || this.PaymentStatus === 'Part-Paid') {
      throw new Error('Cannot delete invoice with pending payments');
    }

    // Check for and delete related menus
    const PurchasedStock = mongoose.model('PurchasedStock');
    await PurchasedStock.deleteMany({ InvoiceId: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
purchasedInvoiceSchema.pre('deleteMany', async function(next) {
  try {
    // Get the sections that will be deleted
    const PurchasedInvoice = mongoose.model('PurchasedInvoice');
    const invoices = await PurchasedInvoice.find(this.getFilter());
    const invoicesIds = invoices.map(invoice => invoice._id);

    if (invoicesIds.length > 0) {
      // Delete all related menus
      const PurchasedStock = mongoose.model('PurchasedStock');
      await PurchasedStock.deleteMany({ InvoiceId: { $in: invoicesIds } });
    }

    next();
  } catch (error) {
    next(error);
  }
});


export default mongoose.models.PurchasedInvoice 
