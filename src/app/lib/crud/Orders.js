import Orders from "../models/Orders";
import Bills from "../models/Bills";
import Menus from "../models/Menus";
import { BaseCrud } from "./BaseCrud";

class OrdersCrud extends BaseCrud {
  constructor() {
    super(Orders)
  }

  async addOrder(data) {
    try {
      const normalizedData = {
        Quantity: data.quantity,
        Note: data.note,
        TotalAmount: data.total_amount,
        MenuId: data.menu_id,
        BillId: data.bill_id,
        Status: data?.status || "Ordered",
        HotelId: data.hotel_id
      };

      // Check if the menu exists in the bill
      const menu_exists = await this.readOne({ 
        MenuId: data.menu_id, 
        BillId: data.bill_id 
      });

      if (menu_exists && menu_exists.returncode === 200 && menu_exists.output) {
        // Update existing order
        const old_quantity = menu_exists.output.Quantity || 0;
        const old_total = menu_exists.output.TotalAmount || 0;
        const quantity = old_quantity + data.quantity;
        const total_amount = old_total + data.total_amount;

        const orderResult = await this.update(
          { _id: menu_exists.output._id },
          { 
            Quantity: quantity, 
            TotalAmount: total_amount,
            Status: data.status || "Ordered"
          },
          { new: true }
        );

        return orderResult;
      } else {
        // Create new order
        const orderResult = await this.create(normalizedData);
        
        if (orderResult.returncode === 200 && orderResult.output) {
          try {
            // Update Bill with new order
            await Bills.findByIdAndUpdate(
              data.bill_id,
              { $push: { Orders: orderResult.output._id } },
              { new: true }
            );

            // Update Menu with new order
            await Menus.findByIdAndUpdate(
              data.menu_id,
              { $push: { Menu: orderResult.output._id } },
              { new: true }
            );

            return orderResult;
          } catch (error) {
            console.error('Error updating references:', error);
            return {
              returncode: 500,
              message: "Failed to update bill or menu references",
              output: null
            };
          }
        }
        return orderResult;
      }
    } catch (error) {
      console.error('Error in addOrder:', error);
      return {
        returncode: 500,
        message: error.message || "Failed to add order",
        output: null
      };
    }
  }

  async readOrders(bill_id) {
    try {
      const result = await this.readMany(
        { BillId: bill_id },
        {
          populate: [
            {
              path: 'MenuId',
              populate: {
                path: 'DishId',
              }
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

  async updateOrderStatus(order_id, status) {
    try {
      const result = await this.update(
        { _id: order_id },
        { Status: status },
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

  async cancelOrder(order_id, reason) {
    try {
      const result = await this.update(
        { _id: order_id },
        { Reason: reason, Status: "Cancelled" },
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

  async undoCancelOrder(order_id, status) {
    try {
      const result = await this.update(
        { _id: order_id },
        { Status: status, Reason: null },
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


  async deleteOrders(filter) {
    try {
      // First get the orders to be deleted
      const ordersToDelete = await this.readMany(filter);

      if (ordersToDelete.returncode === 200 && ordersToDelete.output.length > 0) {
        const orderIds = ordersToDelete.output.map(order => order._id);

        // Use Promise.all to run updates in parallel
        await Promise.all([
          // Remove order references from bills
          Bills.updateMany(
            { Orders: { $in: orderIds } },
            { $pull: { Orders: { $in: orderIds } } }
          ),
          // Remove order references from menus
          Menus.updateMany(
            { Menu: { $in: orderIds } },
            { $pull: { Menu: { $in: orderIds } } }
          )
        ]);

        // Finally delete the orders
        const result = await this.delete(filter);
        return result;
      }

      return {
        returncode: 404,
        message: "No orders found to delete",
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

  async orderExists(menu_id, bill_id) {
    try {
      const result = await this.readOne({ MenuId: menu_id, BillId: bill_id });
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

const ordersCrud = new OrdersCrud();
export default ordersCrud;
