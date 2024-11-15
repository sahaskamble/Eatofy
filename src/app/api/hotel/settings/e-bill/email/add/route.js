import { add_ebill_email_settings } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await add_ebill_email_settings(data);
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
				message: `Error Adding Ebill Email Settings: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
