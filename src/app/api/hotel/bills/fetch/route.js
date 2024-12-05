import { fetch_whole_bill, fetch_hotel_bills } from './controller';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function GET(request) {
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

		const result = await fetch_hotel_bills(userData);
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

export async function POST(request) {
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
		const result = await fetch_whole_bill(data, userData);

		return NextResponse.json({
			returncode: result.returncode,
			message: result.message,
			output: result.output
		}, {
			status: result.returncode,
		});

	} catch (error) {
		return NextResponse.json({
			returncode: 500,
			message: error.message,
			output: []
		}, { status: 500 });
	}
}
