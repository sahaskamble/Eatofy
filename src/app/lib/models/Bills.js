import mongoose from "mongoose";
import { OrderTypeValidator, PaymentModeValidator, PaymentStatusValidator } from "../utils/SpecialStringsValidator";

export const billsSchema = new mongoose.Schema(
  {
    Type: {
      type: String,
      required: true, // Type of bill (e.g., Dine-in, Takeaway, Delivery)
      validate: {
        validator: (value) => OrderTypeValidator(value)
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
        validator: (value) => PaymentModeValidator(value)
      },
      message: "Payment Mode must be one of:- 'Cash', 'UPI', 'Credit-Card', 'Due', 'Part'."
    },
    PaymentStatus: {
      type: String,
      default: "Paid",
      validate: {
        validator: (value) => PaymentStatusValidator(value)
      },
      message: "Payment Status must be one of:- 'Paid', 'Unpaid', 'Part-Paid'."
    },
    Status: {
      type: String,
      default: "Open",
      validate: {
        validator: (value) => { ["Open", "Closed"].includes(value); }
      },
      message: "Bil Status must be either 'Open' or 'Closed'."
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

// Pre-remove middleware for single document
billsSchema.pre('deleteOne', { document: true }, async function(next) {
  try {
    const Orders = mongoose.model('Orders');
    
    // Delete all related orders
    await Orders.deleteMany({ BillId: this._id });

    // Update table status if exists
    if (this.TableId) {
      const Tables = mongoose.model('Tables');
      await Tables.findByIdAndUpdate(
        this.TableId,
        { Status: "Available" }
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Pre-deleteMany middleware for multiple documents
billsSchema.pre('deleteMany', async function(next) {
  try {
    const Bills = mongoose.model('Bills');
    const bills = await Bills.find(this.getFilter());

    if (bills.length > 0) {
      const billIds = bills.map(bill => bill._id);
      const tableIds = bills.filter(bill => bill.TableId).map(bill => bill.TableId);

      // Delete all related orders
      const Orders = mongoose.model('Orders');
      await Orders.deleteMany({ BillId: { $in: billIds } });

      // Update table statuses
      if (tableIds.length > 0) {
        const Tables = mongoose.model('Tables');
        await Tables.updateMany(
          { _id: { $in: tableIds } },
          { Status: "Available" }
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Bills || mongoose.model("Bills", billsSchema);
