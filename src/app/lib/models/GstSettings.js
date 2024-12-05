import mongoose from "mongoose";
import BooleanValidator from "../utils/BooleanValidator";

export const gstSettingsSchema = new mongoose.Schema(
  {
    Visibility: {
      type: Boolean,
      default: false, // Determines whether GST is applied or not
      validate: {
        validator: (value) => BooleanValidator(value)
      },
      message: "Visibility should be either true or false"
    },
    GSTPercent: {
      type: Number,
      default: 0.0, // Percentage value of GST
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
gstSettingsSchema.pre('remove', async function(next) {
  try {
    // Update all bills to remove GST references
    const Bills = mongoose.model('Bills');
    await Bills.updateMany(
      { HotelId: this.HotelId },
      { 
        $set: { 
          CGSTRate: '0 %',
          SGSTRate: '0 %',
          CGSTAmount: 0,
          SGSTAmount: 0
        } 
      }
    );
    
    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
gstSettingsSchema.pre('deleteMany', async function(next) {
  try {
    // Get the settings that will be deleted
    const GstSettings = mongoose.model('GstSettings');
    const settings = await GstSettings.find(this.getFilter());
    const hotelIds = settings.map(setting => setting.HotelId);

    if (hotelIds.length > 0) {
      // Update all bills to remove GST references
      const Bills = mongoose.model('Bills');
      await Bills.updateMany(
        { HotelId: { $in: hotelIds } },
        { 
          $set: { 
            CGSTRate: '0 %',
            SGSTRate: '0 %',
            CGSTAmount: 0,
            SGSTAmount: 0
          } 
        }
      );
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.GstSettings || mongoose.model("GstSettings", gstSettingsSchema);
