import Menus from "../models/Menus";
import Dishes from "../models/Dishes";
import { BaseCrud } from "./BaseCrud";

class MenusCrud extends BaseCrud {
  constructor() {
    super(Menus);
  }

  async createMenu(data) {
    try {
      const normalizedData = {
        HotelId: data.hotel_id,
        SectionId: data.section_id,
        DishId: data.dish_id,
        Price: data.price
      };

      // Create the menu
      const menuResult = await this.create(normalizedData);

      if (menuResult.returncode === 200) {
        // Update the dish's Menus array
        const dish = await Dishes.findByIdAndUpdate(
          data.dish_id,
          { $push: { Menus: menuResult.output._id } },
          { new: true }
        );

        if (!dish) {
          return {
            returncode: 404,
            message: "Dish not found",
            output: []
          };
        }

        return menuResult;
      }

      return menuResult;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async readMenus(hotel_id) {
    try {
      const result = await this.readMany(
        { HotelId: hotel_id },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ],
            },
            {
              path: 'SectionId'
            }
          ]
        }
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

  async readMenusBySectionId(section_id) {
    try {
      const result = await this.readMany(
        { SectionId: section_id },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ]
            }
          ]
        }
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

  // Takeaway
  async readTakeawayMenus() {
    try {

      const result = await this.readMany(
        { "SectionId.Type": "Takeaway" },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ]
            }
          ]
        }
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

  // Delivery
  async readDeliveryMenus() {
    try {

      const result = await this.readMany(
        { "SectionId.Type": "Delivery" },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ]
            }
          ]
        }
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

  // Swiggy
  async readSwiggyMenus() {
    try {

      const result = await this.readMany(
        { "SectionId.Type": "Swiggy" },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ]
            }
          ]
        }
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

  // Zomto
  async readZomatoMenus() {
    try {

      const result = await this.readMany(
        { "SectionId.Type": "Zomato" },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ]
            }
          ]
        }
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

  // QR Menus
  async readQRMenus() {
    try {

      const result = await this.readMany(
        { "SectionId.Type": "QR-Orders" },
        {
          populate: [
            {
              path: 'DishId',
              populate: [
                {
                  path: 'CategoryId'
                }
              ]
            }
          ]
        }
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

  async updateMenu(menu_id, data) {
    try {
      const updateData = {
        Price: data.price
      };

      const result = await this.update(
        { _id: menu_id },
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

  async deleteMenus(filter) {
    try {
      // First get the menus to be deleted
      const menusToDelete = await this.readMany(filter);

      if (menusToDelete.returncode === 200 && menusToDelete.output.length > 0) {

        // Finally delete the menus
        const result = await this.delete(filter);
        return result;
      }

      return {
        returncode: 200,
        message: "No menus found to delete",
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

  async deleteMenuById(menu_id) {
    try {
      const menu = await this.readOne({ _id: menu_id });

      if (menu.returncode === 200) {

        // Finally delete the menu
        const result = await this.delete({ _id: menu_id });
        return result;
      }

      return {
        returncode: 200,
        message: "No menus found",
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

  async doesMenuExists(section_id, dish_id) {
    try {

      const result = this.readMany({ SectionId: section_id, DishId: dish_id });
      return result;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async updateMenuAvailability(menu_id, is_available) {
    try {
      const result = await this.update(
        { _id: menu_id },
        { IsAvailable: is_available },
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

  async updateMenuPrice(menu_id, price) {
    try {
      const result = await this.update(
        { _id: menu_id },
        { Price: price },
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

  async readMenusByDish(dish_id) {
    try {
      const result = await this.readMany(
        { DishId: dish_id },
        {
          populate: [
            {
              path: 'SectionId',
            },
            {
              path: 'Menu',
            }
          ]
        }
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

  async moveMenusBetweenSections(from_section_id, to_section_id) {
    try {
      // Check if any menus have active orders
      const menusWithOrders = await this.readMany(
        { SectionId: from_section_id },
        {
          populate: [
            {
              path: 'Menu',
              match: { Status: { $in: ['Ordered', 'Preparing'] } }
            }
          ]
        }
      );

      if (menusWithOrders.returncode === 200) {
        const activeMenus = menusWithOrders.output.filter(menu => menu.Menu && menu.Menu.length > 0);
        if (activeMenus.length > 0) {
          return {
            returncode: 400,
            message: "Cannot move menus with active orders",
            output: []
          };
        }
      }

      const result = await this.update(
        { SectionId: from_section_id },
        { SectionId: to_section_id },
        { new: true, multi: true }
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

  async getMenuStats(menu_id) {
    try {
      const result = await this.readOne(
        { _id: menu_id },
        {
          populate: [
            {
              path: 'Menu',
              select: 'Quantity TotalAmount Status CreatedAt'
            }
          ]
        }
      );

      if (result.returncode === 200) {
        const orders = result.output.Menu || [];
        const stats = {
          totalOrders: orders.length,
          totalQuantity: orders.reduce((sum, order) => sum + order.Quantity, 0),
          totalRevenue: orders.reduce((sum, order) => sum + order.TotalAmount, 0),
          ordersByStatus: orders.reduce((acc, order) => {
            acc[order.Status] = (acc[order.Status] || 0) + 1;
            return acc;
          }, {}),
          averageOrderValue: orders.length ? orders.reduce((sum, order) => sum + order.TotalAmount, 0) / orders.length : 0
        };

        return {
          returncode: 200,
          message: "Menu stats retrieved successfully",
          output: stats
        };
      }

      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }
}

const menusCrud = new MenusCrud();
export default menusCrud;
