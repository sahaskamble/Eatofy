import { fetch_hotel_by_name, fetch_hotels } from './controller';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/utils/jwt';

export async function POST(request) {
	try {
		// Get token from cookie
		const token = request.cookies.get('auth_token')?.value;
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

		// Proceed with hotel fetch if token is valid
		const data = await request.json();
		const result = await fetch_hotel_by_name(data, userData);

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

export async function GET(request) {
	try {

		// Get token from cookie
		const token = request.cookies.get('auth_token')?.value;
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

		// Proceed with hotel fetch if token is valid
		const result = await fetch_hotels(userData);

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