import { NextResponse } from 'next/server';
import { fetch_eatofy_staff } from './controller';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function GET(request) {
	try {
		const token = request.cookies.get('auth_token')?.value;
		const tokenData = verifyToken(token);

		if (!tokenData) {
			return NextResponse.json({
				returncode: 401,
				message: "Invalid or expired token",
				output: []
			});
		}

		const result = await fetch_eatofy_staff(tokenData);
		console.log("Eatofy Staff Fetched from Route", result)
		return NextResponse.json(result);

	} catch (error) {
		return NextResponse.json({
			returncode: 500,
			message: error.message,
			output: []
		});
	}
}
