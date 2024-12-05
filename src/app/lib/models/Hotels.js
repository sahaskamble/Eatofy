import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";

export const HotelSchema = new mongoose.Schema(
  {
    HotelName: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "HotelName should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Email should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Address: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Address should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Logo: {
      type: Buffer
    },
    Speciality: {
      type: [String],
      default: []
    },
    Contacts: {
      type: [String],
      default: []
    },
    Website: {
      type: String,
      default: "https://example.com"
    },
    FSSAICode: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "FSSAICode should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    GSTIN: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "GSTIN should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
  },
  { timestamps: true }
);

// Add pre-remove middleware
HotelSchema.pre('remove', async function(next) {
  try {
    // Get all model references
    const Bills = mongoose.model('Bills');
    const Sections = mongoose.model('Sections');
    const MenuCategory = mongoose.model('MenuCategory');
    const Suppliers = mongoose.model('Suppliers');
    const ItemCategories = mongoose.model('ItemCategories');
    const Staffs = mongoose.model('Staffs');

    const Reservations = mongoose.model('Reservations');
    const CashDrawer = mongoose.model('CashDrawer');
    const GstSettings = mongoose.model('GstSettings');
    const VatSettings = mongoose.model('VatSettings');
    const KotPrinterSettings = mongoose.model('KotPrinterSettings');
    const InvoicePrinterSettings = mongoose.model('InvoicePrinterSettings');
    const EbillEmailSettings = mongoose.model('EbillEmailSettings');

    // Delete all related data in parallel
    await Promise.all([
      // Delete Multi-level Operational Data
      Bills.deleteMany({ HotelId: this._id }),
      Sections.deleteMany({ HotelId: this._id }),
      MenuCategory.deleteMany({ HotelId: this._id }),
      Suppliers.deleteMany({ HotelId: this._id }),
      ItemCategories.deleteMany({ HotelId: this._id }),
      Staffs.deleteMany({ HotelId: this._id }),

      // Delete Single-level Operational Data
      Reservations.deleteMany({ HotelId: this._id }),
      CashDrawer.deleteMany({ HotelId: this._id }),

      // Delete settings
      GstSettings.deleteMany({ HotelId: this._id }),
      VatSettings.deleteMany({ HotelId: this._id }),
      KotPrinterSettings.deleteMany({ HotelId: this._id }),
      InvoicePrinterSettings.deleteMany({ HotelId: this._id }),
      EbillEmailSettings.deleteMany({ HotelId: this._id })
    ]);

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
HotelSchema.pre('deleteMany', async function(next) {
  try {
    // Get the hotels that will be deleted
    const Hotels = mongoose.model('Hotels');
    const hotels = await Hotels.find(this.getFilter());
    const hotelIds = hotels.map(hotel => hotel._id);

    if (hotelIds.length > 0) {
      // Multi-level
      const Bills = mongoose.model('Bills');
      const Sections = mongoose.model('Sections');
      const MenuCategory = mongoose.model('MenuCategory');
      const Suppliers = mongoose.model('Suppliers');
      const Staffs = mongoose.model('Staffs');
      const Customers = mongoose.model('Customers');

      // Single-Level
      const Reservations = mongoose.model('Reservations');
      const CashDrawer = mongoose.model('CashDrawer');
      const Expenses = mongoose.model('Expenses');

      // Delete settings
      const GstSettings = mongoose.model('GstSettings');
      const VatSettings = mongoose.model('VatSettings');
      const KotPrinterSettings = mongoose.model('KotPrinterSettings');
      const InvoicePrinterSettings = mongoose.model('InvoicePrinterSettings');
      const EbillEmailSettings = mongoose.model('EbillEmailSettings');
      const Notifications = mongoose.model('Notifications');

      // Delete all related data in parallel
      await Promise.all([
        // Multi-level
        Bills.deleteMany({ HotelId: { $in: hotelIds } }),
        Sections.deleteMany({ HotelId: { $in: hotelIds } }),
        MenuCategory.deleteMany({ HotelId: { $in: hotelIds } }),
        Suppliers.deleteMany({ HotelId: { $in: hotelIds } }),
        Staffs.deleteMany({ HotelId: { $in: hotelIds } }),
        Customers.deleteMany({ HotelId: { $in: hotelIds } }),

        // Single-Level
        Reservations.deleteMany({ HotelId: { $in: hotelIds } }),
        CashDrawer.deleteMany({ HotelId: { $in: hotelIds } }),
        Expenses.deleteMany({ HotelId: { $in: hotelIds } }),

        // Delete settings
        GstSettings.deleteMany({ HotelId: { $in: hotelIds } }),
        VatSettings.deleteMany({ HotelId: { $in: hotelIds } }),
        KotPrinterSettings.deleteMany({ HotelId: { $in: hotelIds } }),
        InvoicePrinterSettings.deleteMany({ HotelId: { $in: hotelIds } }),
        EbillEmailSettings.deleteMany({ HotelId: { $in: hotelIds } }),
        Notifications.deleteMany({ HotelId: { $in: hotelIds } })
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Hotels = mongoose.models.Hotels || mongoose.model("Hotels", HotelSchema);
export default Hotels;
