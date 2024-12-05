import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";

export const menuCategorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Category Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // References the `Hotels` collection
      required: true,
    },

    // Child Relationship
    Dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishes", // References the `Dishes` collection
      },
    ],
  },
  { timestamps: true }
);

// Unique constraint on HotelId and CategoryName
menuCategorySchema.index({ HotelId: 1, CategoryName: 1 }, { unique: true });

// Add pre-remove middleware
menuCategorySchema.pre('remove', async function(next) {
  try {
    // Check if dish has any active menus
    const Dishes = mongoose.model('Dishes');
    const activeDishes = await Dishes.find({ CategoryId: this._id });

    if (activeDishes.length > 0) {
      // Delete all related menus first
      await Dishes.deleteMany({ CategoryId: this._id });
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
menuCategorySchema.pre('deleteMany', async function(next) {
  try {
    // Get the dishes that will be deleted
    const Categories = mongoose.model('MenuCategory');
    const categories = await Categories.find(this.getFilter());
    const Ids = categories.map(category => category._id);

    // Delete all related menus
    if (Ids.length > 0) {
      const Dishes = mongoose.model('Dishes');
      await Dishes.deleteMany({ CategoryId: { $in: Ids } });
    }

    next();
  } catch (error) {
    next(error);
  }
});


export default mongoose.models.MenuCategory 
