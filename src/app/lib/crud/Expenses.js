import Expenses from "../models/Expenses";
import { BaseCrud } from "./BaseCrud";

class ExpenseCrud extends BaseCrud {
  constructor() {
    super(Expenses);
  }

  async addExpense(data) {
    try {
      const normalizedData = {
        ExpenseName: data.expense_name,
        Note: data.note,
        Date: data.date,
        PayableTo: data.payable_to,
        AmountPayable: data.amount_payable,
        AmountPaid: data.amount_paid,
        HotelId: data.hotel_id,
        PaymentMode: data.payment_mode,
        PaymentStatus: data.payment_status,
        Cash: data.cash,
        UPI: data.upi,
        CreditCard: data.credit_card
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

  async readExpenses(hotel_id) {
    try {
      const result = await this.readMany({ HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async checkExpense(expense_id) {
    try {
      const result = await this.exists({ _id: expense_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async editExpense(data) {
    try {
      const updateData = {
        ExpenseName: data.expense_name,
        Note: data.note,
        Date: data.date,
        PayableTo: data.payable_to,
        AmountPayable: data.amount_payable,
        AmountPaid: data.amount_paid,
        PaymentMode: data.payment_mode,
        PaymentStatus: data.payment_status,
        Cash: data.cash,
        UPI: data.upi,
        CreditCard: data.credit_card
      }
      const result = await this.update(
        { _id: data.expense_id },
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

  async deleteExpense(expense_id) {
    try {
      const result = await this.delete({ _id: expense_id });
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

const expenseCrud = new ExpenseCrud();
export default expenseCrud
