import mongoose from "mongoose";
import FloatValidator from "../utils/FloatValidator";

export const menusSchema = new mongoose.Schema(
  {
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true, // HotelId is mandatory
    },
    SectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections", // Reference to `Sections` collection
      required: true,
    },
    DishId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dishes", // Reference to `Dishes` collection
      required: true,
    },
    Price: {
      type: Number,
      required: true, // Price is mandatory
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Price must be a non-negative number and must be in decimal format(100.00)."
    },

    // Child Relationship
    Menu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders", // Reference to `Orders` collection
      },
    ],
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Unique constraint on SectionId and DishId
menusSchema.index({ SectionId: 1, DishId: 1 }, { unique: true });

// Add pre-remove middleware
menusSchema.pre('remove', async function(next) {
  try {
    // Delete all related orders
    const Orders = mongoose.model('Orders');
    await Orders.deleteMany({ MenuId: this._id });
    
    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
menusSchema.pre('deleteMany', async function(next) {
  try {
    // Get the menus that will be deleted
    const Menus = mongoose.model('Menus');
    const menus = await Menus.find(this.getFilter());
    
    // Get all menu IDs
    const menuIds = menus.map(menu => menu._id);
    
    // Delete all related orders
    if (menuIds.length > 0) {
      const Orders = mongoose.model('Orders');
      await Orders.deleteMany({ MenuId: { $in: menuIds } });
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Menus || mongoose.model("Menus", menusSchema);
