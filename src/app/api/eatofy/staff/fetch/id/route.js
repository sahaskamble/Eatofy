import { NextResponse } from 'next/server';
import { fetch_eatofy_staff_by_id } from './controller';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function POST(request) {
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

		const data = await request.json();
		const result = await fetch_eatofy_staff_by_id(data, tokenData);
		return NextResponse.json(result);

	} catch (error) {
		return NextResponse.json({
			returncode: 500,
			message: error.message,
			output: []
		});
	}
}
