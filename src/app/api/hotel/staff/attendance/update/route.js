import { edit_staff_attendance } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await edit_staff_attendance(data);
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
				message: `Error Editing Staff Attendance: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
