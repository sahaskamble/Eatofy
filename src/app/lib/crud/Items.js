import Items from "../models/Items";
import { BaseCrud } from "./BaseCrud";

class ItemsCrud extends BaseCrud {

  constructor() {
    super(Items);
  }

  async addItem(data) {
    try {
      const normalizedData = {
        ItemName: data.item_name,
        CategoryId: data.category_id,
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

  async readItems(hotel_id) {
    try {
      const result = await this.readMany({ HotelId: hotel_id }, {
        populate: [
          {
            path: 'CategoryId'
          }
        ]
      });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async checkItemExists(item_name, hotel_id) {
    try {
      const result = await this.readOne({ ItemName: item_name, HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async editItem(data) {
    try {
      const result = await this.update(
        { _id: data.item_id },
        { ItemName: data.item_name },
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

  async deleteItem(item_id) {
    try {
      const result = await this.delete({ _id: item_id });
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

const itemsCrud = new ItemsCrud();
export default itemsCrud;
