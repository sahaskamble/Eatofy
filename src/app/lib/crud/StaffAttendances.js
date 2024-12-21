import StaffAttendance from "../models/StaffAttendance";
import { BaseCrud } from "./BaseCrud";

class StaffAttendanceCrud extends BaseCrud {
  constructor() {
    super(StaffAttendance);
  }

  async checkAttendanceExist(date, staff_id) {
    try {
      const result = await this.readOne({ Date: date, StaffId: staff_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async createAttendance(data) {
    try {
      const normalizedData = {
        Date: data.date,
        StaffId: data.staff_id,
        Type: data.type,
        Note: data.note,
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

  async readAttendanceOfStaff(staff_id) {
    try {
      const result = await this.readMany({ StaffId: staff_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readAttendance(hotel_id, date) {
    try {
      const result = await this.readMany({ HotelId: hotel_id, Date: date });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }


  async editAttendanceofStaff(attendance_id, type) {
    try {
      const result = await this.update(
        { _id: attendance_id },
        { Type: type },
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

  async deleteAttendances(filter) {
    try {
      const result = await this.delete(filter);
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

const staffAttendanceCrud = new StaffAttendanceCrud();
export default staffAttendanceCrud;
