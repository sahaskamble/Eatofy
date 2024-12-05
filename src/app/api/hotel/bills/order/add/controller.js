import ordersCrud from "@/app/lib/crud/Orders";

export async function add_order_in_bill(data, tokenData) {
	try {

		// Verify if user has permission to create hotels
		if (!tokenData || !tokenData.hotelId || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to create hotel",
				output: []
			};
		}

		const hotel_id = tokenData.hotelId || null;
		const response_data = data['response_data'] || null;
		const bill_id = data['bill_id'] || null;

		console.log('Received data:', { bill_id, hotel_id, response_data });

		let error_flag = false;
		let errors = [];
		let results = [];

		try {
			if (!response_data || !Array.isArray(response_data) || response_data.length === 0) {
				return {
					returncode: 400,
					message: "No order data provided",
					output: []
				};
			}

			const orderPromises = response_data.map(async (order) => {
				console.log('Processing order:', order);

				const quantity = order['quantity'] || null;
				const total_amount = order['total_amount'] || null;
				const note = order['note'] || null;
				const menu_id = order['menu_id'] || null;
				const status = order['status'] || "Ordered";

				console.log('Normalized order data:', {
					quantity, total_amount, menu_id, bill_id, hotel_id
				});

				if (quantity && menu_id && bill_id && hotel_id && total_amount) {
					try {
						const result = await ordersCrud.addOrder({
							quantity, note, menu_id, bill_id, status, hotel_id, total_amount
						});

						console.log('Order result:', result);

						if (!result || result.returncode !== 200) {
							error_flag = true;
							errors.push({
								...result,
								order_data: { quantity, menu_id, total_amount }
							});
						} else {
							results.push(result.output);
						}
						return result;
					} catch (orderError) {
						console.error('Error adding individual order:', orderError);
						error_flag = true;
						errors.push({
							message: orderError.message,
							order_data: { quantity, menu_id, total_amount }
						});
						return null;
					}
				} else {
					console.log('Invalid order data:', {
						quantity, menu_id, bill_id, hotel_id, total_amount
					});
					error_flag = true;
					errors.push({
						message: 'Missing required order data',
						order_data: { quantity, menu_id, total_amount }
					});
					return null;
				}
			});

			const orderResults = await Promise.all(orderPromises);
			console.log('All order results:', orderResults);

			if (!error_flag && results.length > 0) {
				return {
					returncode: 200,
					message: "Orders added successfully",
					output: results
				};
			} else {
				console.error('Failed to add orders:', errors);
				return {
					returncode: 400,
					message: "Failed to add orders. Check error details.",
					output: errors
				};
			}
		} catch (error) {
			console.error('Error in add_order_in_bill:', error);
			return {
				returncode: 500,
				message: error.message || "Internal server error",
				output: []
			};
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		}
	}
}
