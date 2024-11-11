import { update_staff_attendance } from "../../../../../../db/crud/staff/attendance/update";

export async function edit_staff_attendance(data) {
	try {

		const type = data['type'] || null;
		const attendance_id = data['attendance_id'] || null;

		// Default Invalid Checker
		if (type == null || attendance_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Editing the Attendance
		const result = await update_staff_attendance({
			type,
			attendance_id
		});

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: "Staff Attendance Updated",
				output: result.output
			};
		}
		else {
			return {
				returncode: result.returncode,
				message: result.message,
				output: result.output
			};
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
