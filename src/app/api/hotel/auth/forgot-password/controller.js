import { createToken } from '@/app/lib/utils/jwt';
import { sendEmail } from '@/app/lib/utils/email';
import staffCrud from '@/app/lib/crud/Staffs';

export const generateResetToken = async (data) => {
  try {
    const email = data['email'] || null;

    if (email === null || password === null) {
      return {
        returncode: 400,
        message: "Missing required parameters",
        output: []
      };
    }

    // Find staff by email
    const staff = await staffCrud.fetchStaffByEmail(email);
    if (staff.returncode !== 200) {
      return {
        returncode: 404,
        message: 'Staff not found',
        output: []
      };
    }

    // Generate reset token valid for 1 hour
    const resetToken = createToken({
      id: staff.output._id,
      email: staff.output.Email,
      type: 'password_reset'
    }, '1h');

    // Create reset password URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/hotel/reset-password?token=${resetToken}`;

    // Send email with reset link
    await sendEmail({
      to: staff.Email,
      subject: 'Reset Your Password',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });

    return {
      returncode: 200,
      message: 'Password reset link sent to email',
      output: []
    };

  } catch (error) {
    return {
      returncode: 500,
      message: error.message,
      output: []
    };
  }
};
