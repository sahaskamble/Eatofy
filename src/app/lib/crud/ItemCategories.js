import ItemCategories from "../models/ItemCategories";
import { BaseCrud } from "./BaseCrud";

class ItemCategoriesCrud extends BaseCrud {

  constructor() {
    super(ItemCategories);
  }

  async addCategory(data) {
    try {
      const normalizedData = {
        CategoryName: data.category_name,
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

  async readCategories(hotel_id) {
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

  async checkCategoryExists(category_name, hotel_id) {
    try {
      const result = await this.readOne({ CategoryName: category_name, HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteCategory(category_id) {
    try {
      const result = await this.delete({ _id: category_id });
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

const itemCategoriesCrud = new ItemCategoriesCrud();
export default itemCategoriesCrud;
