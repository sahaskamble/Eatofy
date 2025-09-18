import { NextResponse } from 'next/server';
import { edit_eatofy_staff } from './controller';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function PUT(request) {
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
		const result = await edit_eatofy_staff(data, tokenData);
		return NextResponse.json(result);

	} catch (error) {
		return NextResponse.json({
			returncode: 500,
			message: error.message,
			output: []
		});
	}
}
