import { NextResponse } from 'next/server';
import { verifyToken, updateToken } from '@/app/lib/utils/jwt';

export async function POST(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({
        returncode: 401,
        message: 'No token provided',
        output: []
      }, { status: 401 });
    }

    const data = await request.json();
    const newToken = updateToken(token, data);
    
    if (!newToken) {
      return NextResponse.json({
        returncode: 401,
        message: 'Invalid token',
        output: []
      }, { status: 401 });
    }

    // Get updated user data
    const userData = verifyToken(newToken);
    
    const response = NextResponse.json({
      returncode: 200,
      message: 'Token updated successfully',
      output: [userData]
    });

    // Update cookie with new token
    response.cookies.set({
      name: 'auth_token',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      returncode: 500,
      message: error.message,
      output: []
    }, { status: 500 });
  }
}
