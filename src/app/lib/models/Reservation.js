import mongoose from "mongoose";

export const ReservationSchema = new mongoose.Schema(
  {
    Date: {
      type: String, // Storing date as a string for flexibility (e.g., "YYYY-MM-DD")
      required: true,
    },
    Time: {
      type: String, // Storing time as a string for flexibility (e.g., "HH:mm")
      required: true,
    },
    Note: {
      type: String,
      default: null, // Optional note field
    },
    NoOfPersons: {
      type: Number,
      default: 0, // Optional number of persons
    },
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers", // Reference to the `Customers` collection
      required: true,
    },
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the `Hotels` collection
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Reservations 
