import { OfflineBaseCrud } from "./BaseCrud";
import customersCrud from "./Customers";
import eatoCoinsSettingsCrud from "./EatoCoinsSettings";
import gstSettingsCrud from "./GSTSettings";
import ordersCrud from "./Orders";
import tablesCrud from "./Tables";
import vatSettingsCrud from "./VATSettings";

class BillsCrud extends OfflineBaseCrud {
	constructor() {
		super('Bills');
	}

	async createBill({
		customer_name = null,
		contact = null,
		email = null,
		birthday = null,
		anniversary = null,
		apartment = null,
		street_address = null,
		landmark = null,
		city = null,
		state = null,
		zip_code = null,
		type = null,
		table_id = null,
		waiter_id = null,
		hotel_id = null,
		menu_data = null
	}) {
		try {

			// Default Invalid Checker
			if (hotel_id === null || type === null || menu_data === null) {
				return {
					returncode: 400,
					message: "Missing required parameters",
					output: []
				};
			}

			// If the customer exists taking its id else Creating new one
			let customer_id = null; let customers = [];
			if (customer_name !== null) {
				const customerData = {
					customer_name,
					contact,
					email,
					street_address,
					apartment,
					landmark,
					city,
					state,
					zip_code,
					birthday,
					anniversary,
					hotel_id
				};
				const customer_result = await customersCrud.createCustomer(customerData);
				if (customer_result.returncode === 200) {
					customers = customer_result.output
					customer_id = customer_result.output?._id || "";
				}
			}


			// Creating new bill
			let bill_id;
			const billData = {
				Type: type,
				TableId: table_id,
				WaiterId: waiter_id,
				HotelId: hotel_id,
				CustomerId: customer_id,
				Customers: customers,
				Orders: []
			};

			const bill_result = await this.create(billData);
			bill_id = bill_result.output._id;

			let error_flag = false;

			if (bill_result.returncode === 200) {
				// If table is assigned, update its status
				if (table_id) {
					await tablesCrud.update(table_id, { Status: "Booked" });
				}
			}
			else {
				error_flag = true
			}


			const OUTPUT = [];
			for (const order of menu_data) {
				const { quantity, note, total_amount, menu_id, status = "Ordered" } = order;

				const order_result = await ordersCrud.addOrder({
					quantity,
					note,
					total_amount,
					menu_id,
					bill_id,
					status,
					hotel_id
				});

				if (order_result.returncode === 200) {
					OUTPUT.push(order_result.output);
				} else {
					error_flag = true;
				}
			}

			const adding_orders = await this.update(bill_id, { Orders: OUTPUT });
			if (adding_orders.returncode !== 200) {
				error_flag = true
			}

			if (!error_flag) {
				return {
					returncode: 200,
					message: "Bill Created.",
					output: [{ success: true }]
				}
			} else {
				return {
					returncode: 500,
					message: "Error creating Bill in some sections",
					output: []
				}
			}
		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}
	}

	async addOrdersInBill(bill_id, orders) {
		const fetchBill = await this.read("_id", bill_id);
		const hotel_id = fetchBill.output[0].HotelId;
		let OUTPUT = fetchBill.output[0].Orders || []; // Ensure OUTPUT is initialized to an array

		for (const order of orders) {
			const { quantity, note, total_amount, menu_id, status = "Ordered" } = order;

			// Add the order using ordersCrud
			const order_result = await ordersCrud.addOrder({
				quantity,
				note,
				total_amount,
				menu_id,
				bill_id,
				status,
				hotel_id,
			});


			if (order_result.returncode === 200) {
				// Check if the order already exists in OUTPUT
				const existingOrderIndex = OUTPUT.findIndex(existingOrder => existingOrder._id === order_result.output?._id);

				if (existingOrderIndex === -1) {
					// Add to OUTPUT if not already present
					OUTPUT.push(order_result.output);
				} else {
					// Update the existing order if necessary
					OUTPUT[existingOrderIndex] = order_result.output;
				}
			} else {
				// Handle errors (set a flag or take other action)
				error_flag = true;
			}
		}

		// Update the bill with the new orders array
		const adding_orders = await this.update(bill_id, { Orders: OUTPUT });
		return adding_orders;
	}


	async dineInRead(table_id) {
		try {
			const data = await this.read("TableId", table_id);
			if (data.returncode === 200) {
				const output = await data.output.filter((bill) => {
					if (bill.Status !== "Closed") {
						return bill
					}
				});
				if (output.length > 0) {
					return {
						returncode: 200,
						message: "Bill Fetched.",
						output
					};
				} else {
					return {
						returncode: 500,
						message: "No Bills to be Fetched.",
						output: []
					};
				}
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

	async BillPayment({
		bill_id,
		payment_mode,
		payment_status,
		balance_amount,
		eatocoins,
		delivery_rate,
		delivery_amount,
		discount_rate,
		discount_amount,
	}) {
		try {
			const bill = await this.read("_id", bill_id);

			if (bill.returncode !== 200) {
				return bill;
			}

			const customer_id = bill.output[0].CustomerId;
			let menu_total = 0;

			// Calculate menu total
			if (bill.output[0].Orders) {
				menu_total = bill.output[0].Orders.reduce((total, order) => {
					return total + (order.MenuId ? order.MenuId.Price * order.Quantity : 0);
				}, 0);
			}

			// GST Params
			let gst_amount = 0; let cgst_rate = 0; let sgst_rate = 0; let cgst_amount = 0; let sgst_amount = 0;
			const gstSettings = await gstSettingsCrud.readSettings();
			if (gstSettings.output[0]?.Visibility) {
				gst_amount = (menu_total * gstSettings.output[0].GSTPercent) / 100;
				console.log(gst_amount);
				cgst_amount = (gst_amount / 2) | 0;
				sgst_amount = (gst_amount / 2) | 0;
				cgst_rate = gstSettings.output[0].GSTPercent / 2;
				sgst_rate = cgst_rate;
			}

			// Vat Params
			let vat_rate = 0; let vat_amount = 0;
			const vatSettings = await vatSettingsCrud.readSettings();
			if (vatSettings.output[0]?.Visibility) {
				vat_rate = vatSettings.output[0].VATPercent;
				vat_amount = (menu_total * vat_rate) / 100;
			}

			// Delivery Params
			if (delivery_rate != 0) {
				delivery_amount = (delivery_rate / 100) * menu_total;
			}

			// Total amount
			const total_amount = menu_total + cgst_amount + sgst_amount + vat_amount + delivery_amount;

			// Discount
			if (discount_rate != 0) {
				discount_amount = (discount_rate / 100) * total_amount | 0;
			}

			// Calculating amount of bill
			let amount = total_amount - discount_amount;

			// Eatocoins Params 
			let eatocoins_rate = 0; let credit_eatocoins = 0;
			const eatocoinsSettings = await eatoCoinsSettingsCrud.readSettings();
			if (eatocoinsSettings.output[0]?.Visibility) {

				eatocoins_rate = eatocoinsSettings.output[0].RedeemLimitPercent || 0;
				let redeem_limit_amt = eatocoinsSettings.output[0].RedeemLimitAmount || 0;
				let credit_limit_amt = eatocoinsSettings.output[0].CreditLimitAmt || 0;
				let credit_limit_rate = eatocoinsSettings.output[0].CreditLimitPercent || 0;

				// Check whether Amount is greater than Credit Limit 
				if (amount >= credit_limit_amt) {
					credit_eatocoins = (credit_limit_rate / 100) * total_amount | 0;
				}

				// Redeem
				if (eatocoins != 0) {

					if (eatocoins_rate != 0) {

						// Redeem limit
						if (amount >= redeem_limit_amt) {

							// Max Amount
							const eatocoins_max = (eatocoins_rate / 100) * total_amount | 0;

							// If Eatocoins in input is greater than max amount
							if (eatocoins > eatocoins_max) {
								eatocoins = eatocoins_max;
							}

						}
						else {
							eatocoins = 0;
							eatocoins_rate = 0;
						}
					}

				}
				else {
					eatocoins = 0;
					eatocoins_rate = 0;
				}
			}


			// Update bill with calculated amounts
			const updateData = {
				MenuTotal: menu_total,
				VatAmount: vat_amount,
				CGSTAmount: cgst_amount,
				SGSTAmount: sgst_amount,
				DeliveryChargesAmount: delivery_amount,
				DiscountAmount: discount_amount,
				EatocoinsAmount: eatocoins,
				DeliveryChargesRate: `${delivery_rate} %`,
				DiscountRate: `${discount_rate} %`,
				CGSTRate: `${cgst_rate} %`,
				SGSTRate: `${sgst_rate} %`,
				VatRate: `${vat_rate} %`,
				EatocoinsRate: `${eatocoins_rate} %`,
				TotalAmount: total_amount,
				Amount: amount,
				BalanceAmount: balance_amount,
				PaymentMode: payment_mode,
				PaymentStatus: payment_status,
				Status: "Closed"
			};

			const result = await this.update(bill_id, updateData);
			if (result.returncode === 200) {
				if (customer_id != null) {
					const customer_info = await customersCrud.read("_id", customer_id);
					const eato_wallet = customer_info.output[0].EatocoinsWallet;
					console.log('Wallet update data:', { customer_id, eato_wallet, credit_eatocoins, eatocoins });

					if (eato_wallet > eatocoins) {

						credit_eatocoins = eato_wallet - eatocoins + credit_eatocoins;
						const data = {
							wallet: credit_eatocoins
						};
						await customersCrud.updateWallet(customer_id, data);
					}
					else if (credit_eatocoins > 0) {
						credit_eatocoins = eato_wallet + credit_eatocoins;
						const data = {
							wallet: credit_eatocoins
						};
						await customersCrud.update(customer_id, data);
					}

				}
			}

			// Table Status
			if (result.output.TableId) {
				await tablesCrud.updateTableStatus(result.output.TableId, "Open");
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

const billsCrud = new BillsCrud();
export default billsCrud;
