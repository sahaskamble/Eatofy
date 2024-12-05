import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({
        returncode: 401,
        message: 'No token provided',
        output: []
      }, { status: 401 });
    }

    const userData = verifyToken(token);
    if (!userData) {
      return NextResponse.json({
        returncode: 401,
        message: 'Invalid token',
        output: []
      }, { status: 401 });
    }

    return NextResponse.json({
      returncode: 200,
      message: 'Token verified',
      output: [userData]
    });
  } catch (error) {
    return NextResponse.json({
      returncode: 500,
      message: error.message,
      output: []
    }, { status: 500 });
  }
}
