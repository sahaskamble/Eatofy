import EatoCoinsSettings from "../models/EatoCoinsSettings";
import { BaseCrud } from "./BaseCrud";

class EatocoinsSettingsCrud extends BaseCrud {
  constructor() {
    super(EatoCoinsSettings);
  }

  async addSettings(data) {
    try {
      const normalizedData = {
        Visibility: data.visibility,
        CreditLimitAmt: data.credit_limit_amt,
        CreditLimitPercent: data.credit_limit_percent,
        RedeemLimitAmount: data.redeem_limit_amt,
        RedeemLimitPercent: data.redeem_limit_percent,
        Rate: data.rate,
        HotelId: data.hotel_id
      };
      const result = await this.create(normalizedData);
      return result;
    } catch (error) {
      console.error('Error in addSettings:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async readSettings(hotel_id) {
    try {
      const result = await this.readOne({ HotelId: hotel_id });
      return result;
    } catch (error) {
      console.error('Error in readSettings:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
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
        CreditLimitAmt: data.credit_limit_amt,
        CreditLimitPercent: data.credit_limit_percent,
        RedeemLimitAmount: data.redeem_limit_amt,
        RedeemLimitPercent: data.redeem_limit_percent,
        Rate: data.rate
      };

      const result = await this.update(
        { HotelId: data.hotel_id },
        updateData
      );
      return result;
    } catch (error) {
      console.error('Error in updateSettings:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async deleteSettings(hotel_id) {
    try {
      const result = await this.delete({ HotelId: hotel_id });
      return result;
    } catch (error) {
      console.error('Error in deleteSettings:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }
}

const eatocoinsSettingsCrud = new EatocoinsSettingsCrud();
export default eatocoinsSettingsCrud;
