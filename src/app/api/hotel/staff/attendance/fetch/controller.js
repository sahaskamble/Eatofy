import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";

export async function fetch_attendances(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;
		const today = new Date();
		const date = today.toISOString().split("T")[0];
		const todays_attendance = await staffAttendanceCrud.readAttendance(hotel_id, date);

		if (todays_attendance.returncode === 200 && todays_attendance.output.length === 0) {
			return {
				returncode: 409,
				message: "No Attendances found for the day.",
				output: []
			};
		}

		return todays_attendance;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
