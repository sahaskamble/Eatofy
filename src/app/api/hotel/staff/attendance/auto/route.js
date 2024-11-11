import { add_staff_attendance_auto } from "./controller";

export async function GET() {
	try {
		const result = await add_staff_attendance_auto();
		return Response.json(
			{
				returncode: result.returncode,
				message: result.message,
				output: result.output
			},
			{
				status: result.returncode
			}
		);
	}
	catch (error) {
		return Response.json(
			{
				returncode: 500,
				message: `Error Adding Staff Attendance: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
