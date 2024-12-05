import mongoose from "mongoose";
import FloatValidator from "../utils/FloatValidator";

export const ordersSchema = new mongoose.Schema(
  {
    Quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: function(value) {
          return !isNaN(value) && FloatValidator(value);
        },
        message: props => `${props.value} is not a valid quantity. Quantity must be a positive number.`
      }
    },
    Note: {
      type: String,
      default: null
    },
    TotalAmount: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Total Amount must be a non-negative number."
    },
    MenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menus",
      required: true,
    },
    BillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bills",
      required: true,
    },
    Status: {
      type: String,
      default: "Ordered",
      validate: {
        validator: (value) => {
          return ["Ordered", "Done", "Accepted", "Rejected", "Cancelled"].includes(value)
        }
      },
      message: "Status must be one of: 'Ordered', 'Done', 'Accepted', 'Rejected', 'Cancelled'."
    },
    Reason: {
      type: String,
      default: null
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
      required: true,
    }
  },
  {
    timestamps: true
  }
);

// Pre-remove middleware for single document
ordersSchema.pre('deleteOne', { document: true }, async function(next) {
  try {

    // Update menu if needed
    if (this.MenuId) {
      const Menus = mongoose.model('Menus');
      await Menus.findByIdAndUpdate(this.MenuId, {
        $pull: { Orders: this._id }
      });
    }

    // Update bill if needed
    if (this.BillId) {
      const Bills = mongoose.model('Bills');
      await Bills.findByIdAndUpdate(this.BillId, {
        $pull: { Orders: this._id }
      });
    }


    next();
  } catch (error) {
    next(error);
  }
});

// Pre-deleteMany middleware for multiple documents
ordersSchema.pre('deleteMany', async function(next) {
  try {
    const Orders = mongoose.model('Orders');
    const orders = await Orders.find(this.getFilter());

    if (orders.length > 0) {
      const menuIds = orders.map(order => order.MenuId).filter(Boolean);

      if (menuIds.length > 0) {
        const Menus = mongoose.model('Menus');
        await Menus.updateMany(
          { _id: { $in: menuIds } },
          { $pull: { Orders: { $in: orders.map(order => order._id) } } }
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);
