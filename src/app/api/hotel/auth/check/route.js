import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function GET(request) {
  try {
    const token = request.cookies.get('hotel_auth_token')?.value;

    if (!token) {
      return NextResponse.json({
        returncode: 401,
        message: 'No authentication token found',
        output: []
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({
        returncode: 401,
        message: 'Invalid or expired token',
        output: []
      });
    }

    return NextResponse.json({
      returncode: 200,
      message: 'Token is valid',
      output: [decoded]
    });
  } catch (error) {
    return NextResponse.json({
      returncode: 500,
      message: error.message,
      output: []
    });
  }
}
