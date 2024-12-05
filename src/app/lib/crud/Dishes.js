import Dishes from "../models/Dishes";
import { BaseCrud } from "./BaseCrud";
import menusCrud from "./Menus";

class DishesCrud extends BaseCrud {
  constructor() {
    super(Dishes)
  }

  async createDish(data) {
    try {

      const normalized_data = {
        DishName: data.dish_name,
        Code: data.code,
        Description: data.description,
        Type: data.type,
        CategoryId: data.category_id,
        HotelId: data.hotel_id
      }

      const result = await this.create(normalized_data);
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async readDishes(hotel_id) {
    try {

      const result = await this.readMany({ HotelId: hotel_id });
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async doesDishExists(hotel_id, dish_name, code) {
    try {

      const result = await this.readMany({ HotelId: hotel_id, DishName: dish_name, Code: code });
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async updateDishInfo(data) {
    try {

      const updateData = {
        DishName: data.dish_name,
        Code: data.code,
        Description: data.description,
        Type: data.type,
      }
      const dish_id = data.dish_id;
      const result = await this.update(
        { _id: dish_id },
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

  async deleteDishesByCategoryId(category_id) {
    try {
      const deleteResult = await this.delete({ CategoryId: category_id });
      return deleteResult;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async deleteDishesById(dish_id) {
    try {
      const deleteResult = await this.delete({ _id: dish_id });
      return deleteResult;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async deleteDishes(filter) {
    try {
      const deleteResult = await this.delete(filter);
      return deleteResult;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }
}

const dishesCrud = new DishesCrud();
export default dishesCrud;
