import { hotel_dashboard } from './controller';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function POST(request) {
	try {
		const token = request.cookies.get('hotel_auth_token')?.value;
		if (!token) {
			return NextResponse.json({
				returncode: 401,
					message: "No token provided",
					output: []
				}, { status: 401 });
		}

		const userData = verifyToken(token);
		if (!userData) {
			return NextResponse.json({
				returncode: 401,
					message: "Invalid or expired token",
					output: []
				}, { status: 401 });
		}

		const body = await request.json();
		const result = await hotel_dashboard(body, userData);
		
		return NextResponse.json({
			returncode: result.returncode,
			message: result.message,
			output: result.output
		}, {
			status: result.returncode,
		});

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
