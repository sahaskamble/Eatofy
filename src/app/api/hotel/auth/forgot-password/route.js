import { generateResetToken } from './controller';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await generateResetToken(data);
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
