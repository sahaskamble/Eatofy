import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function login_eatofy_user(data) {
  try {
    const email = data['email'] || null;
    const password = data['password'] || null;

    if (!email || !password) {
      return {
        returncode: 400,
        message: "Email and password are required",
        output: []
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        returncode: 400,
        message: "Invalid email format",
        output: []
      };
    }

    // Password length validation
    if (password.length < 6) {
      return {
        returncode: 400,
        message: "Password must be at least 6 characters long",
        output: []
      };
    }

    const result = await eatofyStaffCrud.loginStaff({ email, password });
    return result;

  } catch (error) {
    console.error('Login error:', error);
    return {
      returncode: 500,
      message: error.message,
      output: []
    };
  }
}
