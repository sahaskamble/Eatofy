import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";
import Reservation from "./Reservation";

export const customerSchema = new mongoose.Schema(
  {
    CustomerName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Customer Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Contact: {
      type: String,
      required: false,
    },
    Email: {
      type: String,
      required: false,
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotel model
      required: true,
    },
    EatocoinsWallet: {
      type: Number,
      default: 0, // Default to 0 if not provided
    },
    StreetAddress: {
      type: String,
      required: false,
    },
    Apartment: {
      type: String,
      required: false,
    },
    City: {
      type: String,
      required: false,
    },
    State: {
      type: String,
      required: false,
    },
    Landmark: {
      type: String,
      required: false,
    },
    ZipCode: {
      type: String,
      required: false,
    },
    Birthday: {
      type: String,
      required: false,
    },
    Anniversary: {
      type: String,
      required: false,
    },

    // Child Relationship
    Bills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bills", // Reference to the Bill model
    }],
    Reservation: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations", // Reference to the TableReservation model
    }],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Add pre-remove middleware
customerSchema.pre('remove', async function(next) {
  try {
    // Check for active bills
    const Bills = mongoose.model('Bills');
    const activeBills = await Bills.find({
      CustomerId: this._id,
      Status: 'Open'
    });

    if (activeBills.length > 0) {
      throw new Error('Cannot delete customer with active bills');
    }

    // Update completed bills to remove customer reference
    await Bills.deleteMany({ CustomerId: this._id });

    // Delete any reservations
    const Reservation = mongoose.model('Reservations');
    await Reservation.deleteMany({ CustomerId: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
customerSchema.pre('deleteMany', async function(next) {
  try {
    // Get customers to be deleted
    const Customers = mongoose.model('Customers');
    const customers = await Customers.find(this.getFilter());
    const customerIds = customers.map(customer => customer._id);

    if (customerIds.length > 0) {
      // Check for active bills
      const Bills = mongoose.model('Bills');
      const activeBills = await Bills.find({
        CustomerId: { $in: customerIds },
        Status: 'Open'
      });

      if (activeBills.length > 0) {
        throw new Error('Cannot delete customers with active bills');
      }

      // Update completed bills and delete reservations in parallel
      await Promise.all([
        Bills.deleteMany({ CustomerId: { $in: customerIds } }),
        Reservation.deleteMany({ CustomerId: { $in: customerIds } })
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Customers || mongoose.model("Customers", customerSchema);
