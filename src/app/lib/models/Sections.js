import mongoose from "mongoose";
import { OrderTypeValidator } from "../utils/SpecialStringsValidator";
import StringValidators from "../utils/StringValidator";

export const SectionsSchema = new mongoose.Schema(
  {
    SectionName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Section Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"

    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels collection
      required: true,
    },
    Type: {
      type: String,
      default: "Dine-In",
      validate: {
        validator: (value) => OrderTypeValidator(value)
      },
      message: "Section Type must be one of:- 'Takeaway', 'Delivery', 'Dine-In', 'Swiggy', 'Zomato', 'QR-Orders'."
    },

    // Children Relationship
    Menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menus", // Reference to the Menus collection
      },
    ],
    Tables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tables", // Reference to the Tables collection
      },
    ],
  },
  { timestamps: true }
);

// Unique constraint on HotelId and SectionName
SectionsSchema.index({ HotelId: 1, SectionName: 1 }, { unique: true });

// Add pre-remove middleware
SectionsSchema.pre('remove', async function(next) {
  try {
    // Check for and delete related menus
    const Menus = mongoose.model('Menus');
    await Menus.deleteMany({ SectionId: this._id });

    // Check for and delete related tables
    const Tables = mongoose.model('Tables');
    await Tables.deleteMany({ SectionId: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
SectionsSchema.pre('deleteMany', async function(next) {
  try {
    // Get the sections that will be deleted
    const Sections = mongoose.model('Sections');
    const sections = await Sections.find(this.getFilter());
    const sectionIds = sections.map(section => section._id);

    if (sectionIds.length > 0) {
      // Delete all related menus
      const Menus = mongoose.model('Menus');
      await Menus.deleteMany({ SectionId: { $in: sectionIds } });

      // Update tables to remove section references
      const Tables = mongoose.model('Tables');
      await Tables.deleteMany({ SectionId: { $in: sectionIds } });
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Sections || mongoose.model("Sections", SectionsSchema);
