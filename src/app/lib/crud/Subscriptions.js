import { BaseCrud } from "./BaseCrud";
import mongoose from "mongoose";
import Subscription from "../models/Subscription";
import hotelSubscriptionCrud from "./HotelSubscription";

class SubscriptionsCrud extends BaseCrud {
  constructor() {
    super(Subscription);
  }

  // Create Subscription
  async createSubscription(subscriptionData) {
    try {

      // Normalize field names to match schema
      const normalizedData = {
        SubscriptionName: subscriptionData.subscription_name,
        Price: subscriptionData.price,
        Validity: subscriptionData.validity
      };

      const result = await this.create(normalizedData);
      return result;

    } catch (error) {

      return {
        returncode: 500,
        message: error.message,
        output: []
      };

    }
  }

  // Read Subscriptions
  async readSubscriptions() {
    try {

      const result = await this.readMany({});
      return result;

    } catch (error) {

      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async updateSubscription(subscriptionData) {
    try {

      const updateData = {
        SubscriptionName: subscriptionData.subscription_name,
        Price: subscriptionData.price,
        Validity: subscriptionData.validity
      };

      const result = await this.update(
        { _id: subscriptionData.subscription_id },
        updateData,
        { new: true }
      );

      return result;

    } catch (error) {

      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async deleteSubscription(subscription_id) {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const subscription_object_id = new mongoose.Types.ObjectId(subscription_id);
      const subscription = await this.model.findOne({ _id: subscription_object_id });

      if (!subscription) {
        return {
          returncode: 404,
          message: "Hotel not found",
          output: []
        };
      }

      // Delete all related data in a transaction
      const hotelSubscriptionResult = await hotelSubscriptionCrud.deleteByFilter({ SubscriptionId: subscription_object_id });
      if (hotelSubscriptionResult.returncode === 200 || hotelSubscriptionResult.returncode === 404) {
        // Finally, delete the subscription itself
        await this.model.deleteOne({ _id: subscription_object_id });
        await session.commitTransaction();

        return {
          returncode: 200,
          message: "Subscription and all related data deleted successfully",
          output: []
        };
      }

      return {
        returncode: 500,
        message: "Hotel Subscription not deleted, Please try again later",
        output: []
      };

    } catch (error) {

      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

}

const subscriptionsCrud = new SubscriptionsCrud();
export default subscriptionsCrud;
