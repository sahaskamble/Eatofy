import staffCrud from '@/app/lib/crud/Staffs';
import { verifyToken } from '@/app/lib/utils/jwt';
import { hashPassword } from '@/app/lib/utils/password';

export const resetPassword = async (data) => {
  try {
    const token = data['token'] || null;
    const newPassword = data['newPassword'] || null;

    // Verify reset token
    const decoded = verifyToken(token);
    if (!decoded || decoded.type !== 'password_reset') {
      return {
        returncode: 401,
        message: 'Invalid or expired reset token',
        output: []
      };
    }

    // Find staff by id
    const staff = await staffCrud.fetchStaffByEmail(email);
    if (staff.returncode !== 200) {
      return {
        returncode: 404,
        message: 'Staff not found',
        output: []
      };
    }

    // Hash new password
    const { hashedPassword, salt } = await hashPassword(newPassword);

    // Update password in database
    const result = staffCrud.updatePassword({
      hashedPassword,
      salt,
      staff_id: staff.output._id
    });

    return result;

  } catch (error) {

    return {
      returncode: 500,
      message: error.message,
      output: []
    };
  }
};
