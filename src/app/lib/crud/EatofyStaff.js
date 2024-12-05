import { BaseCrud } from "./BaseCrud";
import EatofyStaff from "../models/EatofyStaff";
import bcrypt from 'bcryptjs';

class EatofyStaffCrud extends BaseCrud {
  constructor() {
    super(EatofyStaff);
  }

  // Create new staff member
  async createStaff(staffData) {
    try {
      // Normalize field names to match schema
      const normalizedData = {
        FirstName: staffData.firstName,
        LastName: staffData.lastName,
        Email: staffData.email,
        Password: staffData.password,
        Role: staffData.role
      };

      const result = await this.create(normalizedData);
      return {
        returncode: 200,
        message: "Data Created Successfully",
        output: result
      };
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Login staff member
  async loginStaff({ email, password }) {
    try {
      const staff = await this.model.findOne({ Email: email });

      if (!staff) {
        return {
          returncode: 401,
          message: "Invalid credentials",
          output: []
        };
      }

      // Use bcrypt.compare to properly compare passwords
      const isValidPassword = await bcrypt.compare(password, staff.Password);

      if (!isValidPassword) {
        console.log('Invalid password for user:', email);
        return {
          returncode: 401,
          message: "Invalid credentials",
          output: []
        };
      }

      // Don't send password in response
      const { Password, ...staffData } = staff.toObject();
      return {
        returncode: 200,
        message: "Login successful",
        output: [staffData]
      };
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Update password
  async updatePassword({ email, newPassword }) {
    try {
      const staff = await this.model.findOne({ Email: email });

      if (!staff) {
        return {
          returncode: 404,
          message: "Staff not found",
          output: []
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const result = await this.update(
        { Email: email },
        { Password: hashedPassword }
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

  // Delete staff member
  async deleteStaff({ email }) {
    try {
      const staff = await this.model.findOne({ Email: email });

      if (!staff) {
        return {
          returncode: 404,
          message: "Staff not found",
          output: []
        };
      }

      // Don't allow deletion of the last admin
      if (staff.Role === 'Administration') {
        const adminCount = await this.model.countDocuments({ Role: 'Administration' });
        if (adminCount <= 1) {
          return {
            returncode: 403,
            message: "Cannot delete the last administrator",
            output: []
          };
        }
      }

      await this.model.deleteOne({ Email: email });

      return {
        returncode: 200,
        message: "Staff deleted successfully",
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

  // Read staff members for a hotel
  async readStaff() {
    try {
      return this.readMany(
        {
          sort: { FirstName: 1 },
          select: '-Password', // Exclude password
          lean: true
        }
      );
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Read single staff member
  async readStaffMember({ staff_id }) {
    try {
      return this.readOne(
        { _id: staff_id },
        {
          select: '-Password', // Exclude password
          lean: true
        }
      );
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Check if staff exists by email
  async checkStaffByEmail({ email }) {
    try {
      const exists = await this.model.findOne({ Email: email });
      return exists !== null;
    } catch (error) {
      throw new Error(`Failed to check staff email: ${error.message}`);
    }
  }

  // Update staff member
  async updateStaff({ staff_id, ...updateData }) {
    try {
      // Hash password if it's being updated
      if (updateData.Password) {
        updateData.Password = await bcrypt.hash(updateData.Password, 10);
      }

      return this.update(
        { _id: staff_id },
        updateData,
        { new: true }
      );
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Staff authentication
  async authenticateStaff({ email, password }) {
    try {
      // Find staff by email
      const staff = await this.model.findOne({
        Email: email,
      });

      if (!staff) {
        return {
          returncode: 401,
          message: "Invalid credentials",
          output: null
        };
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, staff.Password);
      if (!isValidPassword) {
        return {
          returncode: 401,
          message: "Invalid credentials",
          output: null
        };
      }

      // Return staff data without password
      const { Password, ...staffData } = staff.toObject();
      return {
        returncode: 200,
        message: "Authentication successful",
        output: staffData
      };
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }

  // Get staff activity report
  async getStaffActivityReport({ start_date, end_date }) {
    try {
      const staffActivity = await this.model.aggregate([
        {
          $lookup: {
            from: 'hotels',
            let: { staff_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$StaffId', '$$staff_id'] },
                      { $gte: ['$createdAt', new Date(start_date)] },
                      { $lte: ['$createdAt', new Date(end_date)] }
                    ]
                  }
                }
              }
            ],
            as: 'Hotels'
          }
        },
        {
          $project: {
            _id: 1,
            StaffName: 1,
            Role: 1,
            Email: 1,
            ContactNumber: 1,
            HotelsCount: { $size: '$Hotels' },
          }
        },
        {
          $sort: { StaffName: 1 }
        }
      ]);

      return {
        returncode: 200,
        message: "Data Fetched Successfully",
        output: staffActivity
      };
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      };
    }
  }
}

const eatofyStaffCrud = new EatofyStaffCrud();
export default eatofyStaffCrud;
