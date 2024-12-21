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
    try {
      const subscription = await this.model.findOne({ _id: subscription_id });
      if (!subscription) {
        return {
          returncode: 404,
          message: "Subscription not found",
          output: []
        };
      }
      // Finally, delete the subscription itself
      const result = await this.delete({ _id: subscription_id });
      if (result.returncode === 200) {
        return {
          returncode: 200,
          message: "Subscription deleted successfully.",
          output: []
        };
      }
      return result;
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
