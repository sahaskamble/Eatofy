import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    returncode: 200,
    message: 'Logged out successfully',
    output: []
  });

  response.cookies.delete('auth_token');
  
  return response;
}
