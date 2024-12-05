import KotPrinterSettings from "../models/KotPrinterSettings";
import { BaseCrud } from "./BaseCrud";

class KotPrinterSettingsCrud extends BaseCrud {
  constructor() {
    super(KotPrinterSettings)
  }

  async addSettings(data) {
    try {
      const normalizedData = {
        Visibility: data.visibility,
        HotelId: data.hotel_id,
        NetworkIP: data.network_ip,
        Encoding: data.encoding,
        BluetoothMac: data.bluetooth_mac
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
        NetworkIP: data.network_ip,
        Encoding: data.encoding,
        BluetoothMac: data.bluetooth_mac
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

const kotSettingsCrud = new KotPrinterSettingsCrud();
export default kotSettingsCrud;
