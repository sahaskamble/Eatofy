import { NextResponse } from 'next/server';
import { send_ebill_email } from './controller';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function POST(request) {
    try {
        // Get token from cookie
        const token = request.cookies.get('hotel_auth_token')?.value;
        if (!token) {
            return NextResponse.json({
                returncode: 401,
                message: "No token provided",
                output: []
            }, { status: 401 });
        }

        // Verify token
        const tokenData = verifyToken(token);
        if (!tokenData) {
            return NextResponse.json({
                returncode: 401,
                message: "Invalid or expired token",
                output: []
            }, { status: 401 });
        }

        // Get request data
        const data = await request.json();
        
        // Send email
        const result = await send_ebill_email(data);
        
        return NextResponse.json(result, { 
            status: result.returncode === 200 ? 200 : result.returncode 
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        }, { status: 500 });
    }
}
