import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";

export const kotPrinterSettingsSchema = new mongoose.Schema(
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

// Add pre-remove middleware
kotPrinterSettingsSchema.pre('remove', async function(next) {
  try {
    // Since printer settings are critical, we should verify no active orders exist
    const Orders = mongoose.model('Orders');
    const activeOrders = await Orders.find({
      HotelId: this.HotelId,
      Status: { $in: ['Ordered', 'Accepted'] }
    });

    if (activeOrders.length > 0) {
      throw new Error('Cannot delete KOT printer settings while active orders exist');
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
kotPrinterSettingsSchema.pre('deleteMany', async function(next) {
  try {
    // Get the settings that will be deleted
    const KotPrinterSettings = mongoose.model('KotPrinterSettings');
    const settings = await KotPrinterSettings.find(this.getFilter());
    const hotelIds = settings.map(setting => setting.HotelId);

    if (hotelIds.length > 0) {
      // Check for active orders
      const Orders = mongoose.model('Orders');
      const activeOrders = await Orders.find({
        HotelId: { $in: hotelIds },
        Status: { $in: ['Ordered', 'Accepted'] }
      });

      if (activeOrders.length > 0) {
        throw new Error('Cannot delete KOT printer settings while active orders exist');
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.KotPrinterSettings || mongoose.model("KotPrinterSettings", kotPrinterSettingsSchema);
