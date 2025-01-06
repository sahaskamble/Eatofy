import PurchasedInvoice from "../models/PurchasedInvoice";
import { BaseCrud } from "./BaseCrud";

class PurchaseInvoiceCrud extends BaseCrud {
  constructor() {
    super(PurchasedInvoice);
  }

  async createInvoice(data) {
    try {
      const normalizedData = {
        InvoiceNo: data['invoice_no'],
        Date: data['invoice_date'],
        PaymentMode: data['payment_mode'],
        AmountPaid: data['amount_paid'],
        BalanceAmount: data['balance_amount'],
        PaymentStatus: data['payment_status'],
        SupplierId: data['supplier_id'],
        HotelId: data['hotel_id'],
        Cash: data['cash'],
        UPI: data['upi'],
        CreditCard: data['credit_card'],
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

  async readInvoices(hotel_id) {
    try {
      const result = await this.readMany({ HotelId: hotel_id }, {
        populate: [{
          path: "Stock",
          populate: [{ path: "ItemId" }]
        }, {
          path: "SupplierId"
        }]
      });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readInvoice(invoice_id) {
    try {
      const result = await this.readMany({ _id: invoice_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }


  async editInvoice(data) {
    try {
      const updateData = {
        AmountPaid: data['amount_paid'],
        BalanceAmount: data['balance_amount'],
        PaymentMode: data['payment_mode'],
        PaymentStatus: data['payment_status'],
        Cash: data['cash'],
        UPI: data['upi'],
        CreditCard: data['credit_card'],
      }
      const result = await this.update(
        { _id: data['invoice_id'] },
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

  async deleteInvoice(invoice_id) {
    try {
      const result = await this.delete({ _id: invoice_id });
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

const purchaseInvoiceCrud = new PurchaseInvoiceCrud();
export default purchaseInvoiceCrud;
