import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function forgot_password(data, tokenData) {
  try {
    // Verify if user has permission to create hotels
    if (!tokenData || !tokenData.role || !['Administration', 'Management'].includes(tokenData.role)) {
      return {
        returncode: 403,
        message: "Insufficient permissions to read hotel",
        output: []
      };
    }

    const email = data['email'] || null;
    const newPassword = data['newPassword'] || null;

    if (email === null || newPassword === null) {
      return {
        returncode: 400,
        message: "Email and new password are required",
        output: null
      };
    }

    // Validate password length
    if (newPassword.length < 6) {
      return {
        returncode: 400,
        message: "Password must be at least 6 characters long",
        output: null
      };
    }

    const result = await eatofyStaffCrud.updatePassword({ email, newPassword });
    return result;

  } catch (error) {
    return {
      returncode: 500,
      message: error.message,
      output: null
    };
  }
}
