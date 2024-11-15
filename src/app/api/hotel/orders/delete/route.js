import { delete_order } from "./controller";

export async function DELETE(request) {
	try {
		const data = await request.json();
		const result = await delete_order(data);
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
				message: `Error Adding Order: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
