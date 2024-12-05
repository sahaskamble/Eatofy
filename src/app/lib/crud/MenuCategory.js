import MenuCategory from "../models/MenuCategory";
import { BaseCrud } from "./BaseCrud";
import dishesCrud from "./Dishes";

class MenuCategoryCrud extends BaseCrud {
  constructor() {
    super(MenuCategory)
  }

  async createMenuCategory(data) {
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

  async updateMenuCategory(data) {
    try {

      const updateData = {
        CategoryName: data.category_name,
      }

      const result = await this.update(
        { _id: data.category_id },
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

  async readMenuCategories(hotel_id) {
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

  async doesMenuCategoryExists(hotel_id, category_name) {
    try {
      const result = this.readMany({ HotelId: hotel_id, CategoryName: category_name });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteCategoriesById(category_id) {
    try {
      // Delete all related data
      const DishesResult = await dishesCrud.deleteDishesByCategoryId(category_id);
      if (DishesResult.returncode === 200 || DishesResult.returncode === 404) {

        // Finally, delete the staff itself
        const deleteResult = await this.delete({ _id: category_id });

        if (deleteResult.returncode === 200) {
          return {
            returncode: 200,
            message: "Menu Categories and all related data deleted successfully",
            output: []
          };
        }

        return deleteResult;
      }

      return {
        returncode: 500,
        message: "Dishes deletion failed, please try again later",
        output: []
      };

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }

  }

}

const menuCategoriesCrud = new MenuCategoryCrud();
export default menuCategoriesCrud;
