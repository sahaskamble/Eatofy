import { NextResponse } from "next/server";
import { remove_section } from "./controller";
import { verifyToken } from '@/app/lib/utils/jwt';

export async function DELETE(request) {
    try {

        // Get token from cookie
        const token = request.cookies.get('hotel_auth_token')?.value;
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
        const result = await remove_section(data, userData);

        return NextResponse.json({
            returncode: result.returncode,
            message: result.message,
            output: result.output
        }, {
            status: result.returncode
        });

    } catch (error) {
        return NextResponse.json({
            returncode: 500,
            message: error.message,
            output: []
        });
    }
}
