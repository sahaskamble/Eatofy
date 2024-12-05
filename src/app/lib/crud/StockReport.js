import StockReport from "../models/StockReport";
import FormatDate from "../utils/DateFormatter";
import { BaseCrud } from "./BaseCrud";

class StockReportCrud extends BaseCrud {

  constructor() {
    super(StockReport);
  }

  async createInstance(data) {
    try {
      const today = new Date();
      const date = FormatDate(today);

      const normalizedData = {
        HotelId: data.hotel_id,
        ItemId: data.item_id,
        Quantity: data.quantity,
        Unit: data.unit,
        Date: date,
        Status: data.quantity > 20 ? "Available" : (data.quantity === 0 ? "Unavailable" : "Low Stock")
      }

      const stock_exists = await this.readOne({ ItemId: data.item_id });
      if (stock_exists.returncode === 200 || stock_exists.output.length !== 0) {
        const old_quantity = stock_exists.output.Quantity;
        const quantity = old_quantity + data.quantity;
        const updateData = {
          Quantity: quantity,
          Status: quantity > 20 ? "Available" : (quantity === 0 ? "Unavailable" : "Low Stock")
        }

        const result = await this.update(
          { ItemId: data.item_id },
          updateData,
          { new: true }
        );
        console.log(result);
        return result;
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

  async readStockReport(hotel_id) {
    try {
      const result = this.readMany({ HotelId: hotel_id });
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

const stockReportCrud = new StockReportCrud();
export default stockReportCrud;
