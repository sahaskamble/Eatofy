import GstSettings from "../models/GstSettings";
import { BaseCrud } from "./BaseCrud";

class GSTSettingsCrud extends BaseCrud {
  constructor() {
    super(GstSettings)
  }

  async addSettings(data) {
    try {
      const normalizedData = {
        Visibility: data.visibility,
        GSTPercent: data.gst_percent,
        HotelId: data.hotel_id
      }
      const result = await this.create(normalizedData);
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readSettings(hotel_id) {
    try {
      const result = await this.readOne({ HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readAllSettings(hotel_id) {
    try {
      const result = await this.readMany({ HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }


  async updateSettings(data) {
    try {
      const updateData = {
        Visibility: data.visibility,
        GSTPercent: data.gst_percent,
      }
      const hotel_id = data.hotel_id;
      const result = await this.update(
        { HotelId: hotel_id },
        updateData,
        { new: true }
      )
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteSettings(hotel_id) {
    try {
      const result = await this.delete({ HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }
}

const gstSettingsCrud = new GSTSettingsCrud();
export default gstSettingsCrud;
