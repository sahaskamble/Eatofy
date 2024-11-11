import { update_order_status } from "@/db/crud/orders/management/update";

export async function delete_order(data) {
	try {

		const order_id = data['order_id'] || null;

		// Default Invalid Checker
		if (order_id === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			};
		}

		const result = await update_order_status({
			order_id,
			status: "Cancelled"
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
