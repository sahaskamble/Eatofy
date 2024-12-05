import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import StringValidators from "../utils/StringValidator";

export const staffSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "First Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    LastName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Last Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Address: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Address should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Contact: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Contact should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Email should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
    SaltPassword: {
      type: String,
      required: true,
    },
    DepartmentName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Department Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Designation: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "Designation should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Salary: {
      type: Number,
      default: 0.0
    },
    Incentive: {
      type: Number,
      default: 0.0
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels collection
    },
    Role: {
      type: String,
      required: true,
      enum: ['Owner', 'Backoffice', 'Waiter'],
      default: 'Waiter',
      validate: {
        validator: (value) => {
          return value === "Owner" || value === "Backoffice" || value === "Waiter"
        }
      },
      message: "Role should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

// Unique constraint on InvoiceId and ItemId
staffSchema.index({ Contact: 1, HotelId: 1 }, { unique: true });
staffSchema.index({ Email: 1, HotelId: 1 }, { unique: true });

// Instance methods
staffSchema.methods = {
  authenticate: async function(plainText) {
    return await bcrypt.compare(plainText, this.Password);
  }
};

// Pre-save hook to hash password
staffSchema.pre('save', async function(next) {
  try {

    if (this.isModified('Password')) {
      const salt = await bcrypt.genSalt(10);
      this.Password = await bcrypt.hash(this.Password, salt);
      this.SaltPassword = salt
    }
    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error);
  }
});

// Pre-delete middleware for single document
staffSchema.pre('deleteOne', { document: true }, async function(next) {
  try {
    const Bills = mongoose.model('Bills');

    // Check for active bills
    const activeBills = await Bills.find({
      WaiterId: this._id,
      Status: 'Open'
    });

    if (activeBills.length > 0) {
      throw new Error('Cannot delete staff with active bills');
    }

    // Run cleanup operations in parallel
    await Promise.all([
      Bills.deleteMany({ WaiterId: this._id }),
      mongoose.model('StaffAttendance').deleteMany({ StaffId: this._id })
    ]);

    next();
  } catch (error) {
    next(error);
  }
});

// Pre-delete middleware for multiple documents
staffSchema.pre('deleteMany', async function(next) {
  try {
    const Staffs = mongoose.model('Staffs');
    const Bills = mongoose.model('Bills');

    // Get staff members to be deleted
    const staffMembers = await Staffs.find(this.getFilter());

    if (staffMembers.length > 0) {
      const staffIds = staffMembers.map(staff => staff._id);

      // Check for active bills
      const activeBills = await Bills.find({
        WaiterId: { $in: staffIds },
        Status: 'Open'
      });

      if (activeBills.length > 0) {
        throw new Error('Cannot delete staff members with active bills');
      }

      // Run cleanup operations in parallel
      await Promise.all([
        Bills.deleteMany({ WaiterId: { $in: staffIds } }),
        mongoose.model('StaffAttendance').deleteMany({ StaffId: { $in: staffIds } })
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Staffs || mongoose.model("Staffs", staffSchema);
