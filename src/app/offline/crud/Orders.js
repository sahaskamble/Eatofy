import { OfflineBaseCrud } from "./BaseCrud";
import menusCrud from "./Menus";

class OrdersCrud extends OfflineBaseCrud {
	constructor() {
		super('Orders');
	}

	async addOrder({ quantity, note, total_amount, menu_id, bill_id, status = "Ordered", hotel_id }) {
		try {

			// Validate required parameters
			if (!quantity || !menu_id || !bill_id || !hotel_id) {
				return {
					returncode: 400,
					message: "Missing required parameters for adding an order.",
					output: []
				};
			}

			const menu_info = await menusCrud.read('_id', menu_id);

			const normalizedData = {
				Quantity: quantity,
				Note: note,
				TotalAmount: total_amount,
				MenuId: menu_info.output[0],
				BillId: bill_id,
				Status: status,
				HotelId: hotel_id
			};


			// Check if the order exists for the given MenuId and BillId
			const order_exists = await this.read('MenuId._id', menu_id)
				.then(result => result.output.filter(order => order.BillId === bill_id));

			if (order_exists.length > 0) {
				// Update existing order
				const existingOrder = order_exists[0];
				const updatedQuantity = (existingOrder.Quantity || 0) + quantity;
				const updatedTotalAmount = (existingOrder.TotalAmount || 0) + total_amount;

				const orderResult = await this.update(existingOrder._id, {
					Quantity: updatedQuantity,
					TotalAmount: updatedTotalAmount,
					Status: status
				});
				return orderResult;
			} else {

				// Create new order
				const orderResult = await this.create(normalizedData);
				return orderResult;
			}
		} catch (error) {
			console.error('Error in addOrder:', error);
			return {
				returncode: 500,
				message: error.message || "Failed to add order",
				output: []
			};
		}
	}

	async readOrders(bill_id) {
		try {
			const result = await this.read('BillId', bill_id);
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
			const result = await this.update(order_id, { Status: status });
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
			const result = await this.update(order_id, { Reason: reason, Status: "Cancelled" });
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
			const result = await this.update(order_id, { Status: status, Reason: null });
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
