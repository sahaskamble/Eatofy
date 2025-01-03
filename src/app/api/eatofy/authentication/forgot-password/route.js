import { forgot_password } from './controller';
import { NextResponse } from 'next/server';

export async function PUT(request) {
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

    const data = await request.json();
    const result = await forgot_password(data, userData);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        returncode: 500,
        message: error.message,
        output: null
      },
      { status: 500 }
    );
  }
}
