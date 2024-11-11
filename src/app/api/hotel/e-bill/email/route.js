import { send_ebill_sms } from "./controller";

export async function POST(request) {
	try {

		const data = await request.json();
		const result = await send_ebill_sms(data);
		return Response.json({
			returncode: result.returncode,
			message: result.message,
			output: result.output
		}, {
			status: result.returncode
		});

	} catch (error) {
		return Response.json({
			returncode: 500,
			message: `Error sending e-bill:- ${error.message}`,
			output: []
		}, {
			status: 500
		})

	}
}
