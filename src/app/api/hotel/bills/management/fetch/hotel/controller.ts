import { ApiResponse } from "@/types/ApiResponse";
import { read_hotel_bills } from "@/db/crud/bills/management/read";

export async function fetch_hotel_bills(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Items
		const result = await read_hotel_bills({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Hotel's Bills  Fetched",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
