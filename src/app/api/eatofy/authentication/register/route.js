import { register_eatofy_user } from './controller';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await register_eatofy_user(data);
    
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
