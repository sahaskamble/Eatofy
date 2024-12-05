import { NextResponse } from "next/server";
import { auto_attendance_add } from "./controller";

export async function GET() {
	try {
		const result = await auto_attendance_add();
		return NextResponse.json(result, { status: result.returncode });

	} catch (error) {
		return NextResponse.json({
			returncode: 500,
			message: error.message,
			output: []
		}, { status: 500 })
	}
}
