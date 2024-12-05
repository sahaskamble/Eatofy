import Suppliers from "../models/Suppliers";
import { BaseCrud } from "./BaseCrud";

class SupplierCrud extends BaseCrud {

  constructor() {
    super(Suppliers);
  }

  async addSupplier(data) {
    try {
      const normalizedData = {
        SupplierName: data.supplier_name,
        Contact: data.contact,
        Email: data.email,
        GSTIN: data.gstin,
        Address: data.address,
        SupplierType: data.supplier_type,
        HotelId: data.hotel_id
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

  async readSuppliers(hotel_id) {
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

  async readSupplier(supplier_id) {
    try {
      const result = await this.readOne({ _id: supplier_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async checkSupplier(supplier_name, contact, hotel_id) {
    try {
      const result = await this.readMany({ SupplierName: supplier_name, Contact: contact, HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async editSupplierDetails(data) {
    try {
      const updateData = {
        SupplierName: data.supplier_name,
        Contact: data.contact,
        Email: data.email,
        GSTIN: data.gstin,
        Address: data.address,
        SupplierType: data.supplier_type,
      }
      const result = await this.update(
        { _id: data.supplier_id },
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

  async deleteSupplier(supplier_id) {
    try {
      const result = await this.delete({ _id: supplier_id });
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

const suppliersCrud = new SupplierCrud();
export default suppliersCrud;
