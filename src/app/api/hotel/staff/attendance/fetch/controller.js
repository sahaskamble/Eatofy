import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";

export async function fetch_attendances(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId || null;

		if (hotel_id === null) {
			return {
				returncode: 400,
				message: "Missing Params",
				output: []
			}
		}

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

export async function fetch_attendance(tokenData, data) {
	try {

		const hotel_id = await tokenData.hotelId || null;
		const date = data['date'] || null;

		if (hotel_id === null || date === null) {
			return {
				returncode: 400,
				message: "Missing Params",
				output: []
			}
		}

		const todays_attendance = await staffAttendanceCrud.readAttendance(hotel_id, date);
		console.log(todays_attendance);

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

