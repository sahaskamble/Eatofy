import Staffs from "../models/Staffs";
import { comparePassword } from "../utils/password";
import { BaseCrud } from "./BaseCrud";
import hotelsCrud from "./Hotels";

class StaffCrud extends BaseCrud {
  constructor() {
    super(Staffs);
  }

  async createStaff(data) {
    try {
      const normalizedData = {
        FirstName: data.first_name,
        LastName: data.last_name,
        Address: data.address,
        Contact: data.contact,
        Email: data.email,
        Password: data.password,
        SaltPassword: 10,
        DepartmentName: data.department_name,
        Designation: data.designation,
        Salary: data.salary,
        Incentive: data.incentives,
        HotelId: data.hotel_id,
        Role: data.role
      }

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

  async login(email, password) {
    try {
      const staff = await this.readOne({ Email: email });
      if (staff.returncode !== 200) {
        return {
          returncode: 401,
          message: "Staff doesn't exist",
          output: []
        };
      }

      // Verify password
      const isValid = await comparePassword(password, staff.output.Password, staff.output.SaltPassword);

      if (!isValid) {
        return {
          returncode: 401,
          message: 'Invalid credentials',
          output: []
        };
      }

      // Get hotel information
      const hotel = await hotelsCrud.readHotelByID(staff.output.HotelId);
      if (!hotel) {
        return {
          returncode: 404,
          message: 'Associated hotel not found',
          output: []
        };
      }

      // Return staff data with hotel information
      const userData = {
        hotelId: hotel.output._id,
        hotelName: hotel.output.HotelName,
        role: staff.output.Role,
        staff_info: staff.output
      };

      return {
        returncode: 200,
        message: 'Login successful',
        output: [userData]
      };

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async fetchStaffByHotelId(hotel_id) {
    try {

      const staff = await this.readMany({ HotelId: hotel_id });
      if (staff.returncode !== 200) {
        return {
          returncode: 401,
          message: "Staffs doesn't exist",
          output: []
        };
      }
      return staff;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async fetchStaffByEmail(email) {
    try {

      const staff = await this.readOne({ Email: email });
      if (staff.returncode !== 200) {
        return {
          returncode: 401,
          message: "Staff doesn't exist",
          output: []
        };
      }
      return staff;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Check if staff exists
  async doesStaffExists(first_name, last_name, contact) {
    try {
      const hotel = await this.readOne({ FirstName: first_name, LastName: last_name, Contact: contact }, {});
      if (hotel.returncode !== 200) {
        return {
          returncode: 401,
          message: "Hotel doesn't exist",
          output: []
        };
      }

      return hotel;

    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  async updatePassword(data) {

    try {

      const updateData = {
        Password: data.hashedPassword,
        SaltPassword: data.salt
      };

      const result = await this.update(
        { _id: data.staff_id },
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

  async updateStaffInfo(data) {
    try {
      const updateData = {
        FirstName: data.first_name,
        LastName: data.last_name,
        Address: data.address,
        Contact: data.contact,
        Email: data.email,
        Password: data.password,
        DepartmentName: data.department_name,
        Designation: data.designation,
        Salary: data.salary,
        Incentive: data.incentives,
        Role: data.role
      }

      const result = await this.update(
        { _id: data.staff_id },
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

  async deleteStaff(filter) {

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

  async deleteStaffById(staff_id) {
    try {

      // Finally, delete the staff itself
      const deleteResult = await this.delete({ _id: staff_id });
      return deleteResult;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

}

const staffCrud = new StaffCrud();
export default staffCrud;
