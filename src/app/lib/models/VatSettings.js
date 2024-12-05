import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";

export const vatSettingsSchema = new mongoose.Schema(
  {
    Visibility: {
      type: Boolean,
      default: false, // Determines whether VAT is enabled
      validate: {
        validator: (value) => BooleanValidator(value)
      },
      message: "Visibility should be either true or false"
    },
    VATPercent: {
      type: Number,
      default: 0.0, // Percentage value of VAT
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true,
      unique: true
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Add pre-remove middleware
vatSettingsSchema.pre('remove', async function(next) {
  try {
    // Update all bills to remove VAT references
    const Bills = mongoose.model('Bills');
    await Bills.updateMany(
      { HotelId: this.HotelId },
      { 
        $set: { 
          VatRate: '0 %',
          VatAmount: 0
        } 
      }
    );
    
    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
vatSettingsSchema.pre('deleteMany', async function(next) {
  try {
    // Get the settings that will be deleted
    const VatSettings = mongoose.model('VatSettings');
    const settings = await VatSettings.find(this.getFilter());
    const hotelIds = settings.map(setting => setting.HotelId);

    if (hotelIds.length > 0) {
      // Update all bills to remove VAT references
      const Bills = mongoose.model('Bills');
      await Bills.updateMany(
        { HotelId: { $in: hotelIds } },
        { 
          $set: { 
            VatRate: '0 %',
            VatAmount: 0
          } 
        }
      );
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.VatSettings || mongoose.model("VatSettings", vatSettingsSchema);
