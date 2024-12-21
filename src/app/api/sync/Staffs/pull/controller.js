import staffCrud from "@/app/lib/crud/Staffs";

export async function fetch_staff(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const existing_staffs = await staffCrud.fetchStaffByHotelId(hotel_id);

		if (existing_staffs.returncode === 404) {
			return {
				returncode: 409,
				message: "No Staffs to be displayed",
				output: []
			};
		}

		return existing_staffs;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
