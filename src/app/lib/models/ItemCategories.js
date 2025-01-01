import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";

export const itemCategorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true, // CategoryName is mandatory
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Category Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true, // HotelId is mandatory
    },

    // Child Relationship
    Items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items", // Reference to `Items` collection
      },
    ],
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Unique constraint on HotelId and CategoryName
itemCategorySchema.index({ HotelId: 1, CategoryName: 1 }, { unique: true });

// Add pre-remove middleware
itemCategorySchema.pre('remove', async function(next) {
  try {
    // Delete all items in this category
    const Items = mongoose.model('Items');
    await Items.deleteMany({ CategoryId: this._id });

    // Update inventory stock to remove category reference
    const InventoryStock = mongoose.model('InventoryStock');
    await InventoryStock.updateMany(
      { CategoryId: this._id },
      { $unset: { CategoryId: 1 } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
itemCategorySchema.pre('deleteMany', async function(next) {
  try {
    // Get categories to be deleted
    const ItemCategories = mongoose.model('ItemCategories');
    const categories = await ItemCategories.find(this.getFilter());
    const categoryIds = categories.map(category => category._id);

    if (categoryIds.length > 0) {
      // Run cleanup operations in parallel
      await Promise.all([
        // Delete all items in these categories
        mongoose.model('Items').deleteMany({ CategoryId: { $in: categoryIds } }),
        // Update inventory stock to remove category references
        mongoose.model('InventoryStock').updateMany(
          { CategoryId: { $in: categoryIds } },
          { $unset: { CategoryId: 1 } }
        )
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.ItemCategories || mongoose.model("ItemCategories", itemCategorySchema);
