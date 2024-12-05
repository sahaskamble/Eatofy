import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";

export const dishesSchema = new mongoose.Schema(
  {
    DishName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Dish Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Code: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      default: null, // For Combos Specification eg;(2 Burgers & 1 Pepsi)
    },
    Type: {
      type: String,
      required: true, // Dish type (e.g., Veg, Non-veg)
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Dish Type should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory", // Reference to `MenuCategory` collection
      required: true,
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to `Hotels` collection
      required: true,
    },

    // Child Relationship
    Menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menus", // Reference to `Menus` collection
      },
    ],
  },
  { timestamps: true }
);

// Unique constraint on HotelId and Code
dishesSchema.index({ HotelId: 1, Code: 1 }, { unique: true });

// Add pre-remove middleware
dishesSchema.pre('remove', async function(next) {
  try {
    const Menus = mongoose.model('Menus');
    const Orders = mongoose.model('Orders');

    // Check if dish has any active orders
    const activeOrders = await Orders.find({
      'Items.DishId': this._id,
      Status: { $in: ['Pending', 'Processing', 'Ready'] }
    });

    if (activeOrders.length > 0) {
      throw new Error('Cannot delete dish with active orders');
    }

    // Delete all related menus
    await Menus.deleteMany({ DishId: this._id });

    // Update completed orders to mark deleted dishes
    await Orders.updateMany(
      { 'Items.DishId': this._id, Status: 'Completed' },
      { $set: { 'Items.$[elem].Deleted': true } },
      { arrayFilters: [{ 'elem.DishId': this._id }] }
    );

    // Remove from MenuCategory's Dishes array
    const MenuCategory = mongoose.model('MenuCategory');
    await MenuCategory.updateMany(
      { Dishes: this._id },
      { $pull: { Dishes: this._id } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
dishesSchema.pre('deleteMany', async function(next) {
  try {
    const Dishes = mongoose.model('Dishes');
    const dishes = await Dishes.find(this.getFilter());
    const dishIds = dishes.map(dish => dish._id);

    if (dishIds.length > 0) {
      const [Orders, Menus, MenuCategory] = await Promise.all([
        mongoose.model('Orders'),
        mongoose.model('Menus'),
        mongoose.model('MenuCategory')
      ]);

      // Check for active orders
      const activeOrders = await Orders.find({
        'Items.DishId': { $in: dishIds },
        Status: { $in: ['Pending', 'Processing', 'Ready'] }
      });

      if (activeOrders.length > 0) {
        throw new Error('Cannot delete dishes with active orders');
      }

      // Run cleanup operations in parallel
      await Promise.all([
        // Delete related menus
        Menus.deleteMany({ DishId: { $in: dishIds } }),
        // Update completed orders
        Orders.updateMany(
          { 'Items.DishId': { $in: dishIds }, Status: 'Completed' },
          { $unset: { ItemId: 1 } }
        ),
        // Remove from MenuCategory's Dishes arrays
        MenuCategory.updateMany(
          { Dishes: { $in: dishIds } },
          { $pull: { Dishes: { $in: dishIds } } }
        )
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Dishes || mongoose.model("Dishes", dishesSchema);
