import InventoryStock from "../models/InventoryStock";
import { BaseCrud } from "./BaseCrud";

class InventoryStockCrud extends BaseCrud {
  constructor() {
    super(InventoryStock);
  }

  async addStock(data) {
    try {
      const normalizedData = {
        HotelId: data.hotel_id,
        ItemId: data.item_id,
        Quantity: data.quantity,
        Unit: data.unit,
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

  async readStock(hotel_id) {
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

  async editStock(data) {
    try {
      const updateData = {
        Quantity: data.quantity,
        Status: data.quantity > 20 ? "Available" : (data.quantity === 0 ? "Unavailable" : "Low Stock")
      }
      const result = await this.update(
        { _id: data.stock_id },
        updateData,
        { new: true }
      );
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteStock(stock_id) {
    try {
      const result = await this.delete({ _id: stock_id });
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

const inventoryStockCrud = new InventoryStockCrud();
export default inventoryStockCrud;
