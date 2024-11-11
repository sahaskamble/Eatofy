import db from "@/db/connector";

export async function update_staff_attendance({
	attendance_id,
	type
}) {
	try {

		// Inserting the record
		const result = await db.staffAttendance.update({
			where: {
				id: attendance_id
			},
			data: {
				Type: type
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
