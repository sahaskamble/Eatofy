import Bills from "../models/Bills";
import { BaseCrud } from "./BaseCrud";
import Tables from "../models/Tables";
import gstSettingsCrud from "./GSTSettings";
import vatSettingsCrud from "./VATSettings";
import eatocoinsSettingsCrud from "./EatocoinsSettings";
import customersCrud from "./Customers";
import ordersCrud from "./Orders";

class BillsCrud extends BaseCrud {
  constructor() {
    super(Bills);
  }

  async createBill(data) {
    try {
      const normalizedData = {
        Type: data.type,
        TableId: data.table_id,
        WaiterId: data.waiter_id,
        HotelId: data.hotel_id,
        CustomerId: data.customer_id,
      };

      // Create the bill
      const result = await this.create(normalizedData);

      if (result.returncode === 200) {
        // If table is assigned, update its status
        if (data.table_id) {
          await Tables.findByIdAndUpdate(
            data.table_id,
            { Status: "Booked" },
            { new: true }
          );
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

  async readBills(hotel_id) {
    try {
      const result = await this.readMany(
        { HotelId: hotel_id },
        {
          populate: [
            {
              path: 'Orders',
              populate: [
                {
                  path: 'MenuId',
                  select: 'Price',
                  populate: {
                    path: 'DishId',
                    select: 'DishName Description Type'
                  }
                }
              ]
            },
            {
              path: 'TableId',
              select: 'TableName Capacity Status'
            },
            {
              path: 'WaiterId',
              select: 'FirstName LastName Role'
            },
            {
              path: 'CustomerId',
              select: 'CustomerName Contact Email'
            },
            {
              path: 'HotelId',
              select: 'HotelName'
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

  async readBills(hotel_id) {
    try {
      const result = await this.readMany(
        { HotelId: hotel_id },
        {
          populate: [
            {
              path: 'Orders',
              populate: [
                {
                  path: 'MenuId',
                  select: 'Price',
                  populate: {
                    path: 'DishId',
                    select: 'DishName Description Type'
                  }
                }
              ]
            },
            {
              path: 'TableId',
              select: 'TableName Capacity Status'
            },
            {
              path: 'WaiterId',
              select: 'FirstName LastName Role'
            },
            {
              path: 'CustomerId',
              select: 'CustomerName Contact Email'
            },
            {
              path: 'HotelId',
              select: 'HotelName'
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

  async readBillByStaffId(staff_id) {
    try {
      const result = await this.readOne(
        { WaiterId: staff_id },
        {
          populate: [
            {
              path: 'Orders',
              populate: [
                {
                  path: 'MenuId',
                  select: 'Price',
                  populate: {
                    path: 'DishId',
                    select: 'DishName Description Type'
                  }
                }
              ]
            },
            {
              path: 'TableId',
              select: 'TableName Capacity Status'
            },
            {
              path: 'WaiterId',
              select: 'FirstName LastName Role'
            },
            {
              path: 'CustomerId',
              select: 'Name Contact Email'
            },
            {
              path: 'HotelId',
              select: 'HotelName'
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

  async readBill(bill_id) {
    try {
      const result = await this.readOne(
        { _id: bill_id },
        {
          populate: [
            {
              path: 'Orders',
              populate: [
                {
                  path: 'MenuId',
                  select: 'Price',
                  populate: {
                    path: 'DishId',
                    select: 'DishName Description Type'
                  }
                }
              ]
            },
            {
              path: 'TableId',
              select: 'TableName Capacity Status'
            },
            {
              path: 'WaiterId',
              select: 'FirstName LastName Role'
            },
            {
              path: 'CustomerId',
              select: 'Name Contact Email'
            },
            {
              path: 'HotelId',
              select: 'HotelName'
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

  async kotRead(bill_id) {
    try {
      const result = await this.readOne(
        { _id: bill_id },
        {
          populate: [
            {
              path: 'Orders',
              match: { Status: 'Ordered' },
              populate: [
                {
                  path: 'MenuId',
                  select: 'Price',
                  populate: {
                    path: 'DishId',
                    select: 'DishName Description Type'
                  }
                }
              ]
            },
            {
              path: 'TableId',
              select: 'TableName Capacity Status'
            },
            {
              path: 'WaiterId',
              select: 'FirstName LastName Role'
            },
            {
              path: 'CustomerId',
              select: 'Name Contact Email'
            },
            {
              path: 'HotelId',
              select: 'HotelName'
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

  async dineInRead(table_id) {
    try {
      const result = await this.readOne(
        { TableId: table_id, Status: "Open" },
        {
          populate: [
            {
              path: 'Orders',
              populate: [
                {
                  path: 'MenuId',
                  select: 'Price',
                  populate: {
                    path: 'DishId',
                    select: 'DishName Description Type'
                  }
                }
              ]
            },
            {
              path: 'TableId',
              select: 'TableName Capacity Status'
            },
            {
              path: 'WaiterId',
              select: 'FirstName LastName Role'
            },
            {
              path: 'CustomerId',
              select: 'Name Contact Email'
            },
            {
              path: 'HotelId',
              select: 'HotelName'
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

  async AssignWaiter(data) {
    try {
      const updateData = {
        WaiterId: data.waiter_id,
      };
      const bill_id = data.bill_id;
      const result = await this.update(
        { _id: bill_id },
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

  async AssignTable(data) {
    try {
      // First check if table is available
      const table = await Tables.findById(data.table_id);
      if (!table || table.Status !== "Available") {
        return {
          returncode: 400,
          message: "Table is not available",
          output: []
        };
      }

      const updateData = {
        TableId: data.table_id,
      };
      const bill_id = data.bill_id;

      // Update bill with table
      const result = await this.update(
        { _id: bill_id },
        updateData,
        { new: true }
      );

      if (result.returncode === 200) {
        // Update table status
        await Tables.findByIdAndUpdate(
          data.table_id,
          { Status: "Open" },
          { new: true }
        );
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

  async UpdateCustomer(data) {
    try {
      const updateData = {
        CustomerId: data.customer_id,
      };
      const bill_id = data.bill_id;
      const result = await this.update(
        { _id: bill_id },
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

  async deleteBillById(bill_id) {
    try {
      const bill = await this.readOne({ _id: bill_id });

      if (bill.returncode === 200) {

        // Finally delete the bill
        const result = await this.delete({ _id: bill_id });
        return result;
      }

      return {
        returncode: 200,
        message: "Bill and related data deleted successfully",
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

  async deleteBills(filter) {
    try {
      // Get bills to be deleted
      const billsToDelete = await this.readMany(filter);

      if (billsToDelete.returncode === 200 && billsToDelete.output.length > 0) {

        // Finally delete all bills
        const result = await this.delete(filter);
        return result;
      }

      return {
        returncode: 200,
        message: "No bills found to delete",
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

  async addOrderToBill(bill_id, order_id) {
    try {
      const result = await this.update(
        { _id: bill_id },
        { $push: { Orders: order_id } },
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

  async removeOrderFromBill(bill_id, order_id) {
    try {
      const result = await this.update(
        { _id: bill_id },
        { $pull: { Orders: order_id } },
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
    hotel_id
  }) {
    try {
      const bill = await this.readOne(
        { _id: bill_id },
        {
          populate: [
            {
              path: 'Orders',
              match: { Status: 'Ordered' },
              populate: {
                path: 'MenuId',
                select: 'Price'
              }
            }
          ]
        }
      );

      if (bill.returncode !== 200) {
        return bill;
      }

      const customer_id = bill.output.CustomerId;
      let menu_total = 0;

      // Calculate menu total
      if (bill.output.Orders) {
        menu_total = bill.output.Orders.reduce((total, order) => {
          return total + (order.MenuId ? order.MenuId.Price * order.Quantity : 0);
        }, 0);
      }

      // GST Params
      let gst_amount = 0; let cgst_rate = 0; let sgst_rate = 0; let cgst_amount = 0; let sgst_amount = 0;
      const gstSettings = await gstSettingsCrud.readSettings(hotel_id);
      if (gstSettings.output?.Visibility) {
        gst_amount = (menu_total * gstSettings.output.GSTPercent) / 100;
        cgst_amount = (gst_amount / 2) | 0;
        sgst_amount = (gst_amount / 2) | 0;
        cgst_rate = gstSettings.output.GSTPercent / 2;
        sgst_rate = cgst_rate;
      }

      // Vat Params
      let vat_rate = 0; let vat_amount = 0;
      const vatSettings = await vatSettingsCrud.readSettings(hotel_id);
      if (vatSettings.output?.Visibility) {
        vat_rate = gstSettings.output.GSTPercent;
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
      const eatocoinsSettings = await eatocoinsSettingsCrud.readSettings(hotel_id);
      if (eatocoinsSettings.output?.Visibility) {

        eatocoins_rate = eatocoinsSettings.output.RedeemLimitPercent || 0;
        let redeem_limit_amt = eatocoinsSettings.output.RedeemLimitAmount || 0;
        let credit_limit_amt = eatocoinsSettings.output.CreditLimitAmt || 0;
        let credit_limit_rate = eatocoinsSettings.output.CreditLimitPercent || 0;

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

      const result = await this.update(
        { _id: bill_id },
        updateData,
        { new: true }
      );

      if (result.returncode === 200) {
        if (customer_id != null) {
          const customer_info = await customersCrud.readCustomerDetails(customer_id);
          const eato_wallet = customer_info.output.EatocoinsWallet;
          console.log('Wallet update data:', { customer_id, eato_wallet, credit_eatocoins, eatocoins });

          if (eato_wallet > eatocoins) {

            credit_eatocoins = eato_wallet - eatocoins + credit_eatocoins;
            const data = {
              customer_id,
              wallet: credit_eatocoins
            };
            await customersCrud.updateWallet(data);
          }
          else if (credit_eatocoins > 0) {
            credit_eatocoins = eato_wallet + credit_eatocoins;
            const data = {
              customer_id,
              wallet: credit_eatocoins
            };
            await customersCrud.updateWallet(data);
          }

        }
      }

      // Table Status
      if (result.output.TableId) {
        await Tables.findByIdAndUpdate(
          result.output.TableId,
          { Status: "Open" },
          { new: true }
        );
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

  async splitBill(bill_id, split_data) {
    try {
      const originalBill = await this.readOne({ _id: bill_id });
      if (originalBill.returncode !== 200) {
        return originalBill;
      }

      // Create new bills
      const newBills = [];
      for (const splitInfo of split_data) {
        const newBillData = {
          Type: originalBill.output.Type,
          TableId: originalBill.output.TableId,
          WaiterId: originalBill.output.WaiterId,
          HotelId: originalBill.output.HotelId,
          CustomerId: splitInfo.customer_id || originalBill.output.CustomerId,
          Orders: splitInfo.order_ids
        };

        const newBill = await this.create(newBillData);
        if (newBill.returncode === 200) {
          newBills.push(newBill.output);
        } else {
          // Rollback created bills if any creation fails
          for (const bill of newBills) {
            await this.delete({ _id: bill._id });
          }
          return newBill;
        }
      }

      // Remove split orders from original bill
      const allSplitOrderIds = split_data.reduce((acc, split) => [...acc, ...split.order_ids], []);
      await this.update(
        { _id: bill_id },
        { $pull: { Orders: { $in: allSplitOrderIds } } },
        { new: true }
      );

      // Recalculate all bills
      await this.calculateBillTotal(bill_id);
      for (const bill of newBills) {
        await this.calculateBillTotal(bill._id);
      }

      return {
        returncode: 200,
        message: "Bill split successfully",
        output: {
          originalBill: bill_id,
          newBills: newBills.map(b => b._id)
        }
      };
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }
  async SyncBills({
    Type,
    TableId,
    WaiterId,
    HotelId,
    CustomerId,
    Customers,
    Orders = [],
    createdAt,
    updatedAt,
    MenuTotal,
    VatAmount,
    CGSTAmount,
    SGSTAmount,
    DeliveryChargesAmount,
    DiscountAmount,
    EatocoinsAmount,
    DeliveryChargesRate,
    DiscountRate,
    CGSTRate,
    SGSTRate,
    VatRate,
    EatocoinsRate,
    TotalAmount,
    Amount,
    BalanceAmount,
    PaymentMode,
    PaymentStatus,
    Status,
  }) {
    try {

      if (WaiterId === "") {
        WaiterId = null;
      }

      let bill;
      if (CustomerId !== null) {
        const customerData = await customersCrud.createCustomerBackup({
          CustomerName: Customers.CustomerName,
          Email: Customers.Email,
          Contact: Customers.Contact,
          HotelId: Customers.HotelId,
          StreetAddress: Customers.StreetAddress,
          Apartment: Customers.Apartment,
          City: Customers.City,
          State: Customers.State,
          Landmark: Customers.Landmark,
          ZipCode: Customers.ZipCode,
          Birthday: Customers.Birthday,
          Anniversary: Customers.Anniversary,
        });

        const customer_id = customerData.output._id;
        bill = await this.create({
          Type,
          TableId,
          WaiterId,
          HotelId,
          CustomerId: customer_id,
          createdAt,
          updatedAt,
          MenuTotal,
          VatAmount,
          CGSTAmount,
          SGSTAmount,
          DeliveryChargesAmount,
          DiscountAmount,
          EatocoinsAmount,
          DeliveryChargesRate,
          DiscountRate,
          CGSTRate,
          SGSTRate,
          VatRate,
          EatocoinsRate,
          TotalAmount,
          Amount,
          BalanceAmount,
          PaymentMode,
          PaymentStatus,
          Status,
        });
      } else {
        bill = await this.create({
          Type,
          TableId,
          WaiterId,
          HotelId,
          CustomerId,
          createdAt,
          updatedAt,
          MenuTotal,
          VatAmount,
          CGSTAmount,
          SGSTAmount,
          DeliveryChargesAmount,
          DiscountAmount,
          EatocoinsAmount,
          DeliveryChargesRate,
          DiscountRate,
          CGSTRate,
          SGSTRate,
          VatRate,
          EatocoinsRate,
          TotalAmount,
          Amount,
          BalanceAmount,
          PaymentMode,
          PaymentStatus,
          Status,
        });
      }
      console.log(bill);

      const bill_id = bill.output._id;
      Orders.map(async (Order) => {
        const Data = {
          Quantity: Order.Quantity,
          Note: Order.Note,
          TotalAmount: Order.TotalAmount,
          MenuId: Order.MenuId._id,
          bill_id,
          Status: Order.Status,
          HotelId: Order.HotelId
        }
        await ordersCrud.SyncOrder(Data);
      })
      return await this.readOne({ _id: bill_id });

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
