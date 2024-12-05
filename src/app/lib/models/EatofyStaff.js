import mongoose from "mongoose";
import StringValidators from "../utils/StringValidator";
import bcrypt from "bcryptjs";

const RoleEnums = ["Administration", "Management", "Sales"]

export const EatofyStaffSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value),
        message: "First Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
      }
    },
    LastName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => StringValidators(value),
        message: "Last Name should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
      }
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => StringValidators(value),
        message: "Email should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
      }
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
    Role: {
      type: String,
      default: 'Administration',
      enum: {
        values: RoleEnums,
        message: "Role must be one of: " + RoleEnums.join(", ")
      },
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Instance methods
EatofyStaffSchema.methods = {
  authenticate: async function(plainText) {
    return await bcrypt.compare(plainText, this.Password);
  }
};

// Pre-save hook to hash password
EatofyStaffSchema.pre('save', async function(next) {
  try {
    if (this.isModified('Password')) {
      const salt = await bcrypt.genSalt(10);
      this.Password = await bcrypt.hash(this.Password, salt);
    }
    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error);
  }
});

export default mongoose.models.EatofyStaff || mongoose.model('EatofyStaff', EatofyStaffSchema);
