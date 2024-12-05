import { BaseCrud } from "./BaseCrud";
import Tables from "../models/Tables";
import Bills from "../models/Bills";

class TablesCrud extends BaseCrud {
  constructor() {
    super(Tables);
  }

  async createTable(data) {
    try {
      const normalizedData = {
        TableName: data.table_name,
        PersonsOccupiable: data.persons_occupiable,
        Status: "Open",
        HotelId: data.hotel_id,
        SectionId: data.section_id
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

  async readTables(hotel_id) {
    try {
      const result = await this.readMany(
        { HotelId: hotel_id },
        {
          populate: [
            {
              path: 'SectionId',
              select: 'SectionName Type'
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

  async readTable(table_id) {
    try {
      const result = await this.readOne(
        { _id: table_id },
        {
          populate: [
            {
              path: 'SectionId',
              select: 'SectionName Type'
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

  async readTablesBySection(section_id) {
    try {
      const result = await this.readMany(
        { SectionId: section_id },
        {
          populate: [
            {
              path: 'SectionId',
              select: 'SectionName Type Floor'
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

  async updateTableInfo(data) {
    try {
      const updateData = {
        TableName: data.table_name,
        Capacity: data.capacity
      };

      const result = await this.update(
        { _id: data.table_id },
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

  async updateTableStatus(data) {
    try {
      // If setting to occupied, check if there are any open bills
      if (data.status === "Occupied") {
        const openBills = await Bills.findOne({
          TableId: data.table_id,
          Status: "Open"
        });

        if (!openBills) {
          return {
            returncode: 400,
            message: "Cannot occupy table without an open bill",
            output: []
          };
        }
      }

      const updateData = {
        Status: data.status
      };

      const result = await this.update(
        { _id: data.table_id },
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

  async updateTableSection(data) {
    try {
      // Check if table has any open bills before moving to new section
      const openBills = await Bills.findOne({
        TableId: data.table_id,
        Status: "Open"
      });

      if (openBills) {
        return {
          returncode: 400,
          message: "Cannot move table with open bills to a new section",
          output: []
        };
      }

      const updateData = {
        SectionId: data.section_id
      };

      const result = await this.update(
        { _id: data.table_id },
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

  async moveTablesBetweenSections(from_section_id, to_section_id) {
    try {
      // Check if any tables in the section have open bills
      const tablesWithBills = await Bills.findOne({
        Status: "Open",
        TableId: { $in: (await this.readMany({ SectionId: from_section_id })).output.map(t => t._id) }
      });

      if (tablesWithBills) {
        return {
          returncode: 400,
          message: "Cannot move tables with open bills to a new section",
          output: []
        };
      }

      const result = await this.update(
        { SectionId: from_section_id },
        { SectionId: to_section_id },
        { new: true, multi: true }
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

  async deleteTables(filter) {
    try {
      // Check if any tables are currently in use
      const tables = await this.readMany(filter);

      if (tables.returncode === 200) {
        for (const table of tables.output) {
          const openBills = await Bills.findOne({
            TableId: table._id,
            Status: "Open"
          });

          if (openBills) {
            return {
              returncode: 400,
              message: `Table ${table.TableName} has open bills and cannot be deleted`,
              output: []
            };
          }
        }

        // If no open bills, proceed with deletion
        const result = await this.delete(filter);
        return result;
      }

      return tables;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async doesTableExists(hotel_id, table_name) {
    try {
      const result = await this.readOne({
        HotelId: hotel_id,
        TableName: table_name
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

const tablesCrud = new TablesCrud();
export default tablesCrud;
