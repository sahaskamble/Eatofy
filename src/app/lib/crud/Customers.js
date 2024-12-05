import { BaseCrud } from "./BaseCrud";
import Customers from "../models/Customers";

class CustomersCrud extends BaseCrud {
  constructor() {
    super(Customers);
  }

  async createCustomer(data) {
    try {
      const normalizedData = {
        CustomerName: data.customer_name,
        Email: data.email,
        Contact: data.contact,
        HotelId: data.hotel_id,

        // Detailed address fields
        StreetAddress: data.street_address || null,
        Apartment: data.apartment || null,
        City: data.city || null,
        State: data.state || null,
        Landmark: data.landmark || null,
        ZipCode: data.zip_code || null,
        Birthday: data.birthday || null,
        Anniversary: data.anniversary || null
      };

      const result = await this.create(normalizedData);
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async readCustomers(hotel_id) {
    try {
      const result = await this.readMany(
        { HotelId: hotel_id }
        // {
        //   populate: [
        //     {
        //       path: 'Bills',
        //       select: 'TotalAmount PaymentStatus CreatedAt',
        //       options: { sort: { CreatedAt: -1 }, limit: 5 }
        //     }
        //   ]
        // }
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

  async readCustomerDetails(customer_id) {
    try {
      const result = await this.readOne(
        { _id: customer_id }
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

  async checkCustomer(customer_name, contact, hotel_id) {
    try {
      const result = await this.readOne({
        CustomerName: customer_name,
        Contact: contact,
        HotelId: hotel_id
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

  async updateCustomerInfo(data) {
    try {
      const updateData = {
        CustomerName: data.name,
        Email: data.email,
        Contact: data.contact,
        StreetAddress: data.street_address,
        Apartment: data.apartment,
        City: data.city,
        State: data.state,
        Landmark: data.landmark,
        ZipCode: data.zip_code,
        Birthday: data.birthday,
        Anniversary: data.anniversary
      };

      const result = await this.update(
        { _id: data.customer_id },
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

  async updateWallet(data) {
    try {
      const customer = await this.readOne({ _id: data.customer_id });
      if (customer.returncode !== 200) {
        return customer;
      }

      const updateData = {
        EatocoinsWallet: data.wallet,
      };

      const result = await this.update(
        { _id: data.customer_id },
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

  async deleteCustomers(filter) {
    try {
      // Check if any customers have open bills
      const customers = await this.readMany(filter);

      if (customers.returncode === 200) {
        // If no open bills, proceed with deletion
        const result = await this.delete(filter);
        return result;
      }

      return {
        returncode: 200,
        message: "No Customers Found.",
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

  async doesCustomerExist(hotel_id, email) {
    try {
      const result = await this.readOne({
        HotelId: hotel_id,
        Email: email
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
}

const customersCrud = new CustomersCrud();
export default customersCrud;
