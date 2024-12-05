import EbillEmailSettings from "../models/EbillEmailSettings";
import { BaseCrud } from "./BaseCrud";

class EbillEmailSettingsCrud extends BaseCrud {
  constructor() {
    super(EbillEmailSettings)
  }

  async addSettings(data) {
    try {
      const normalizedData = {
        Visibility: data.visibility,
        HotelId: data.hotel_id,
        Email: data.email,
        AppPassword: data.app_password,
        UPIID: data.upi_id,
        MerchantName: data.merchant_name,
      }
      const result = this.create(normalizedData);
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
      const result = this.readOne({ HotelId: hotel_id });
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
        Email: data.email,
        AppPassword: data.app_password,
        UPIID: data.upi_id,
        MerchantName: data.merchant_name,
      }
      const hotel_id = data.hotel_id;
      const result = this.update(
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
      const result = this.delete({ HotelId: hotel_id });
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

const ebillEmailSettingsCrud = new EbillEmailSettingsCrud();
export default ebillEmailSettingsCrud;
