import PurchasedInvoice from "../models/PurchasedInvoice";
import PurchasedStock from "../models/PurchasedStock";
import { BaseCrud } from "./BaseCrud";

class PurchaseStockCrud extends BaseCrud {
  constructor() {
    super(PurchasedStock);
  }

  async addItems(data) {
    try {
      const normalizedData = {
        InvoiceId: data['invoice_id'],
        ItemId: data['item_id'],
        Quantity: data['quantity'],
        UnitPrice: data['per_price'],
        TotalPrice: data['total_price']
      }
      const result = await this.create(normalizedData);
      if (result.returncode === 200) {
        // Pushing into Invoice
        const invoice = await PurchasedInvoice.findByIdAndUpdate(
          data.invoice_id,
          { $push: { Stock: result.output._id } },
          { new: true }
        );

        if (!invoice) {
          return {
            returncode: 404,
            message: "Invoice not found",
            output: []
          };
        }
        return result;
      }
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

const purchaseStockCrud = new PurchaseStockCrud();
export default purchaseStockCrud;
