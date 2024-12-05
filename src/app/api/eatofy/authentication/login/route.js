import { login_eatofy_user } from './controller';
import { NextResponse } from 'next/server';
import { createToken } from '@/app/lib/utils/jwt';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await login_eatofy_user(data);
    
    if (result.returncode === 200 && result.output.length > 0) {
      // Create JWT token
      const userData = result.output[0];
      const token = createToken({
        id: userData._id,
        email: userData.Email,
        role: userData.Role,
        firstName: userData.FirstName,
        lastName: userData.LastName
      });

      // Create response with token in cookie
      const response = NextResponse.json(result);
      
      // Set httpOnly cookie with token
      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      return response;
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        returncode: 500,
        message: error.message,
        output: []
      },
      { status: 500 }
    );
  }
}
