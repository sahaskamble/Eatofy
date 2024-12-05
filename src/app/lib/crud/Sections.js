import Sections from "../models/Sections";
import { BaseCrud } from "./BaseCrud";
import menusCrud from "./Menus";
import tablesCrud from "./Tables";

class SectionsCrud extends BaseCrud {
  constructor() {
    super(Sections);
  }

  async createSections(data) {
    try {

      const normalizedData = {
        SectionName: data.section_name,
        HotelId: data.hotel_id,
        Type: data.type
      };

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

  async readDineInSections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, Type: "Dine-In" });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readTakeawaySections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, Type: "Takeaway" });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readDeliverySections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, Type: "Delivery" });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readSwiggySections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, Type: "Swiggy" });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readZomatoSections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, Type: "Zomato" });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readQRSections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, Type: "QR-Orders" });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readAllSections(hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async doesSectionExists(section_name, hotel_id) {
    try {

      const sections = await this.readMany({ HotelId: hotel_id, SectionName: section_name });
      return sections;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async updateSections(data) {
    try {
      const updateData = {
        SectionName: data.section_name,
        Type: data.type
      };
      const section_id = data.section_id;
      const result = await this.update(
        { _id: section_id },
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

  async deleteSections(filter) {
    try {

      // Delete all related data
      const MenusResult = await menusCrud.deleteMenus(filter);
      const TablesResult = await tablesCrud.deleteTables(filter);

      if ((MenusResult.returncode === 200 || MenusResult.returncode === 404) &&
        (TablesResult.returncode === 200 || TablesResult.returncode === 404)) {

        // Finally, delete the staff itself
        const deleteResult = await this.delete(filter);

        if (deleteResult.returncode === 200) {
          return {
            returncode: 200,
            message: "Section and all related data deleted successfully",
            output: []
          };
        }

        return deleteResult;
      }

      return {
        returncode: 500,
        message: "Menus or Tables deletion failed, please try again later",
        output: []
      };

    } catch (error) {
      console.error('Error in deleteStaffById:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async deleteSectionsByID(section_id) {
    try {

      // Delete all related data
      const MenusResult = await menusCrud.deleteMenus({ SectionId: section_id });
      const TablesResult = await tablesCrud.deleteTables({ SectionId: section_id });

      if ((MenusResult.returncode === 200 || MenusResult.returncode === 404) &&
        (TablesResult.returncode === 200 || TablesResult.returncode === 404)) {

        // Finally, delete the staff itself
        const deleteResult = await this.delete({ _id: section_id });

        if (deleteResult.returncode === 200) {
          return {
            returncode: 200,
            message: "Section and all related data deleted successfully",
            output: []
          };
        }

        return deleteResult;
      }

      return {
        returncode: 500,
        message: "Menus or Tables deletion failed, please try again later",
        output: []
      };

    } catch (error) {
      console.error('Error in deleteStaffById:', error);
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }
}

const sectionsCrud = new SectionsCrud();
export default sectionsCrud;
