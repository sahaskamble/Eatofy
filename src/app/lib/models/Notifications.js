import mongoose from "mongoose";

export const notificationSchema = new mongoose.Schema(
  {
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Reference to the Hotels model
      required: true,
    },
    Type: {
      type: String,
      default: "Unread", // Notification type, default is "Unread"
    },
    Title: {
      type: String,
      required: true, // The title of the notification
    },
    Description: {
      type: String,
      required: false, // The description of the notification (optional)
    }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Unique constraint on HotelId and Description
notificationSchema.index({ HotelId: 1, Description: 1 }, { unique: true });

export default mongoose.models.Notifications 
