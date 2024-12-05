import { NextResponse } from 'next/server';
import eatofyStaffCrud from '@/app/lib/crud/EatofyStaff';

export async function DELETE(request) {
  try {

    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({
        returncode: 401,
        message: "No token provided",
        output: []
      }, { status: 401, statusText: "No token provided" });
    }

    // Verify the token
    const userData = verifyToken(token);
    if (!userData) {
      return NextResponse.json({
        returncode: 401,
        message: "Invalid or expired token",
        output: []
      }, { status: 401, statusText: "Invalid or expired token" });
    }

    // Verify if user has permission to create hotels
    if (!userData || !userData.role || !['Administration', 'Management'].includes(userData.role)) {
      return {
        returncode: 403,
        message: "Insufficient permissions to read hotel",
        output: []
      };
    }

    const data = await request.json();
    const email = data.email || null;

    if (email === null) {
      return NextResponse.json({
        returncode: 400,
        message: "Missing required parameters",
        output: []
      }, { status: 400 })
    }

    const result = await eatofyStaffCrud.delete({ Email: email });
    return NextResponse.json(result, { status: result.returncode });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({
      returncode: 500,
      message: error.message,
      output: []
    });
  }
}
