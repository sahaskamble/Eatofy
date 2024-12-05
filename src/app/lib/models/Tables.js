import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";
import { TableStatusValidator } from "../utils/SpecialStringsValidator";

export const tableSchema = new mongoose.Schema(
  {
    TableName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Table Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    SectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections", // Reference to the Sections collection
      required: true,
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels collection
      required: true,
    },
    PersonsOccupiable: {
      type: Number,
      default: 4,
    },
    Status: {
      type: String,
      default: "Open",
      validate: {
        validator: (value) => TableStatusValidator(value)
      },
      message: "Table Status must be one of:- 'Booked', 'Bill Pending', 'Open'."
    },

    // Child Relationship
    Bills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bills", // Reference to the Bills collection
      },
    ],
  },
  { timestamps: true }
);

// Add pre-remove middleware
tableSchema.pre('remove', async function(next) {
  try {
    // Check if table has any active bills
    const Bills = mongoose.model('Bills');
    const activeBills = await Bills.find({
      TableId: this._id,
      Status: 'Open'
    });

    if (activeBills.length > 0) {
      throw new Error('Cannot delete table with active bills');
    }

    // Update completed bills to remove table reference
    await Bills.deleteMany({ TableId: this._id, Status: 'Closed' });

    next();
  } catch (error) {
    next(error);
  }
});

// Add pre-deleteMany middleware
tableSchema.pre('deleteMany', async function(next) {
  try {
    // Get the tables that will be deleted
    const Tables = mongoose.model('Tables');
    const tables = await Tables.find(this.getFilter());
    const tableIds = tables.map(table => table._id);

    // Check for active bills on any table
    const Bills = mongoose.model('Bills');
    const activeBills = await Bills.find({
      TableId: { $in: tableIds },
      Status: 'Open'
    });

    if (activeBills.length > 0) {
      throw new Error('Cannot delete tables with active bills');
    }

    // Update completed bills to remove table references
    await Bills.deleteMany({ TableId: { $in: tableIds } });

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Tables || mongoose.model("Tables", tableSchema);
