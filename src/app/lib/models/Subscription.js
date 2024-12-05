import mongoose from "mongoose";
import FloatValidator from "../utils/FloatValidator";
import IntegerValidator from "../utils/IntegerValidator";
import StringValidators from "../utils/StringValidator";

export const SubscriptionSchema = new mongoose.Schema(
  {
    SubscriptionName: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => StringValidators(value)
      },
      message: "SubscriptionName should not contain invalid characters like /, \\, \", ;, ', +, `, or ^"
    },
    Price: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => FloatValidator(value)
      },
      message: "Price must be a non-negative number and must be in decimal format(100.00)."
    },
    Validity: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => IntegerValidator(value)
      },
      message: "Validity must be a non-negative number."
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subscriptions 
