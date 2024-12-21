import HotelSubscription from "../models/HotelSubscription";
import { BaseCrud } from "./BaseCrud";
import mongoose from "mongoose";

class HotelSubscriptionCrud extends BaseCrud {
  constructor() {
    super(HotelSubscription);
  }

  // Helper function to compare dates that could be in either format
  _compareDates(dateStr1, dateStr2) {
    try {
      // Try parsing as ISO format first
      const date1 = new Date(dateStr1);
      const date2 = new Date(dateStr2);

      // Check if both dates are valid in ISO format
      if (!isNaN(date1) && !isNaN(date2)) {
        return date1.getTime() - date2.getTime();
      }

      // If not ISO format, try parsing the custom format "DD Month YYYY"
      const parseCustomDate = (dateStr) => {
        const [day, month, year] = dateStr.split(' ');
        const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth();
        return new Date(parseInt(year), monthIndex, parseInt(day));
      };

      const customDate1 = parseCustomDate(dateStr1);
      const customDate2 = parseCustomDate(dateStr2);

      return customDate1.getTime() - customDate2.getTime();
    } catch (error) {
      console.error('Date comparison error:', error);
      return 0; // Return 0 if comparison fails
    }
  }

  // Helper function to check if a subscription is currently valid
  _isSubscriptionValid(subscription, currentDate) {
    try {
      const startDateCompare = this._compareDates(subscription.StartDate, currentDate);
      const endDateCompare = this._compareDates(subscription.EndDate, currentDate);

      return subscription.isValid && startDateCompare <= 0 && endDateCompare >= 0;
    } catch (error) {
      console.error('Subscription validation error:', error);
      return false;
    }
  }

  // Get hotels with valid subscriptions
  async getHotelsWithValidSubscription() {
    try {
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      // First get all subscriptions
      const allSubscriptions = await this.model.aggregate([
        {
          $lookup: {
            from: "hotels",
            localField: "HotelId",
            foreignField: "_id",
            as: "hotel"
          }
        },
        {
          $unwind: "$hotel"
        }
      ]);

      // Filter and group valid subscriptions by hotel
      const validHotels = new Map();

      allSubscriptions.forEach(subscription => {
        const hotelId = subscription.HotelId.toString();

        if (this._isSubscriptionValid(subscription, currentDate)) {
          // If we haven't seen this hotel before, or if this subscription is newer
          if (!validHotels.has(hotelId) ||
            this._compareDates(subscription.EndDate, validHotels.get(hotelId).EndDate) > 0) {
            validHotels.set(hotelId, {
              hotel: subscription.hotel,
              EndDate: subscription.EndDate
            });
          }
        }
      });

      return {
        returncode: 200,
        message: "Successfully fetched hotels with valid subscriptions",
        output: Array.from(validHotels.values()).map(item => item.hotel)
      };
    } catch (error) {
      console.error('Error in getHotelsWithValidSubscription:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Get hotels with invalid or no subscriptions
  async getHotelsWithInvalidOrNoSubscription() {
    try {
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      // Get all subscriptions
      const allSubscriptions = await this.model.aggregate([
        {
          $lookup: {
            from: "hotels",
            localField: "HotelId",
            foreignField: "_id",
            as: "hotel"
          }
        },
        {
          $unwind: "$hotel"
        }
      ]);

      // Keep track of hotels with valid and invalid subscriptions
      const validHotelIds = new Set();
      const invalidHotels = new Map();

      allSubscriptions.forEach(subscription => {
        const hotelId = subscription.HotelId.toString();

        if (this._isSubscriptionValid(subscription, currentDate)) {
          validHotelIds.add(hotelId);
          invalidHotels.delete(hotelId); // Remove from invalid if it was there
        } else if (!validHotelIds.has(hotelId)) {
          // Only add to invalid if we haven't found a valid subscription for this hotel
          if (!invalidHotels.has(hotelId) ||
            this._compareDates(subscription.EndDate, invalidHotels.get(hotelId).EndDate) > 0) {
            invalidHotels.set(hotelId, {
              hotel: subscription.hotel,
              EndDate: subscription.EndDate
            });
          }
        }
      });

      // Get hotels that don't have any subscription entries
      const allHotels = await mongoose.model('Hotels').find({
        _id: { $nin: await this.model.distinct('HotelId') }
      });

      // Combine hotels with invalid subscriptions and hotels with no subscriptions
      const combinedResults = [
        ...Array.from(invalidHotels.values()).map(item => item.hotel),
        ...allHotels
      ];

      return {
        returncode: 200,
        message: "Successfully fetched hotels with invalid or no subscriptions",
        output: combinedResults
      };
    } catch (error) {
      console.error('Error in getHotelsWithInvalidOrNoSubscription:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Create
  async createHotelSubscription(data) {
    try {
      // Normalize field names to match schema
      const normalizedData = {
        HotelId: data.hotel_id,
        SubscriptionId: data.subscription_id,
        isValid: data.is_valid,
        StartDate: data.start_date,
        EndDate: data.end_date,
        PaymentStatus: data.payment_status,
        PaymentMode: data.payment_mode,
        Cash: data.cash,
        UPI: data.upi,
        CreditCard: data.credit_card
      }

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

  async readSubscription(hotel_id) {
    try {

      const result = await this.readMany(
        { HotelId: hotel_id, isValid: true }
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

  // Subscription Payment
  async updateSubscriptionPayment(data) {
    try {

      const updateData = {
        isValid: true,
        PaymentStatus: data.payment_status,
        PaymentMode: data.payment_mode,
        Cash: data.cash,
        UPI: data.upi,
        CreditCard: data.credit_card
      };

      const hotel_subscription_id = data.hotel_subscription_id;
      const result = await this.update(
        { _id: hotel_subscription_id },
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


  // Deactivate an account
  async deactivateAccount(data) {
    try {

      const updateData = {
        isValid: data.is_valid,
        Status: data.status
      };

      const hotel_subscription_id = data.hotel_subscription_id;
      const result = await this.update(
        { _id: hotel_subscription_id },
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

  // Delete by Filter
  async deleteByFilter(filter) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

      const result = await this.delete(filter);
      await session.commitTransaction();
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

const hotelSubscriptionCrud = new HotelSubscriptionCrud();
export default hotelSubscriptionCrud;
