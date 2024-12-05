import mongoose from "mongoose";
import { AttendanceValidator } from "../utils/SpecialStringsValidator";

export const staffAttendanceSchema = new mongoose.Schema(
  {
    Date: {
      type: String,
      required: true,
    },
    Arrival: {
      type: String,
      default: "09:00 AM"
    },
    Departure: {
      type: String,
      default: "05:00 PM"
    },
    Type: {
      type: String,
      default: "Absent", // Default attendance status is "Absent"
      validate: {
        validator: (value) => AttendanceValidator(value)
      },
      message: "Attendance must be one of:- 'Present', 'Absent', 'Half-Day'."
    },
    Note: {
      type: String,
      default: null
    },
    StaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staffs", // Reference to the Staff model
      required: true,
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels collection
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

// Unique constraint on InvoiceId and ItemId
staffAttendanceSchema.index({ Date: 1, StaffId: 1 }, { unique: true });

export default mongoose.models.StaffAttendance || mongoose.model('StaffAttendance', staffAttendanceSchema);
