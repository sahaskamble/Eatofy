import InvoicePrinterSettings from "../models/InvoicePrinterSettings";
import { BaseCrud } from "./BaseCrud";

class InvoicePrinterSettingsCrud extends BaseCrud {
  constructor() {
    super(InvoicePrinterSettings)
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

  async updateSettings(data) {
    try {
      const updateData = {
        Visibility: data.visibility,
        NetworkIP: data.network_ip,
        Encoding: data.encoding,
        BluetoothMac: data.bluetooth_mac
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

const invoiceSettingsCrud = new InvoicePrinterSettingsCrud();
export default invoiceSettingsCrud;
