import { BaseCrud } from "./BaseCrud";
import Hotels from "../models/Hotels";
import mongoose from "mongoose";
import hotelSubscriptionCrud from "./HotelSubscription";

class HotelsCrud extends BaseCrud {
  constructor() {
    super(Hotels);
  }

  // Create new Hotel with logo
  async createHotel(hotelData) {
    try {

      // Normalize field names to match schema
      const normalizedData = {
        HotelName: hotelData.hotel_name,
        Email: hotelData.email,
        Address: hotelData.address,
        Speciality: hotelData.speciality,
        Logo: hotelData.logo,
        Contacts: hotelData.contacts,
        Website: hotelData.website,
        FSSAICode: hotelData.fssai_code,
        GSTIN: hotelData.gstin
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

  // Update hotel logo
  async updateHotelLogo(hotel_id, logoData) {
    try {
      // Get existing hotel to delete old logo
      const result = await this.update(
        { _id: hotel_id },
        { Logo: logoData },
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

  // Read Hotel By ID 
  async readHotelByID(hotel_id) {
    try {
      const hotel = await this.readOne({ _id: hotel_id });
      if (hotel.returncode !== 200) {
        return {
          returncode: 401,
          message: "Hotel doesn't exist",
          output: []
        };
      }

      return hotel;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Read Hotel By Name
  async readHotelByName(hotel_name) {
    try {
      const hotel = await this.readOne({ HotelName: hotel_name });
      if (!hotel) {
        return {
          returncode: 401,
          message: "Hotel doesn't exist",
          output: []
        };
      }

      return hotel;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Check if hotel exists
  async doesHotelExists(hotel_name) {
    try {
      const hotel = await this.readOne({ HotelName: hotel_name }, {});
      if (hotel.returncode !== 200) {
        return {
          returncode: 401,
          message: "Hotel doesn't exist",
          output: []
        };
      }

      return hotel;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Read All Hotels
  async readAllHotels() {
    try {
      const hotels = await this.readMany(
        {}, // filters
        {
          sort: { HotelName: 1 },
          lean: true
        }
      );

      return {
        returncode: 200,
        message: "Data fetched successfully",
        output: hotels.output
      };
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Update Hotel Info
  async updateHotelInfo(hotelData) {
    try {
      const updateData = {
        HotelName: hotelData.hotel_name,
        Email: hotelData.email,
        Address: hotelData.address,
        Speciality: hotelData.speciality,
        Contacts: hotelData.contacts,
        Website: hotelData.website,
        FSSAICode: hotelData.fssai_code,
        GSTIN: hotelData.gstin
      };

      const result = await this.update(
        { _id: hotelData.hotel_id },
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

  // Delete Hotel
  async deleteHotel(hotel_id) {
    try {

      // Extract ID from object if needed
      const id = typeof hotel_id === 'object' ? hotel_id.hotel_id : hotel_id;

      // Ensure hotel_id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          returncode: 400,
          message: "Invalid hotel ID format",
          output: []
        };
      }

      const hotel = await this.readOne({ _id: id });

      if (!hotel) {
        return {
          returncode: 404,
          message: "Hotel not found",
          output: []
        };
      }

      // Delete all related data in a transaction
      if (hotel.returncode === 200) {

        // Delete the Hotel
        await this.delete({ _id: id });

        return {
          returncode: 200,
          message: "Hotel deleted successfully",
          output: []
        };
      }

      return {
        returncode: 400,
        message: "Hotel not Found",
        output: []
      };


    } catch (error) {
      return {
        returncode: 500,
        message: `Failed to delete hotel: ${error.message}`,
        output: []
      };
    }
  }

}

const hotelsCrud = new HotelsCrud();
export default hotelsCrud;
