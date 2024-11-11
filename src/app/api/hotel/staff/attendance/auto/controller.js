import db from "@/db/connector"
import { create_staff_attendance } from "@/db/crud/staff/attendance/create";
import { check_staff_attendance } from "@/db/crud/staff/attendance/read";
import { read_hotel_staffs } from "@/db/crud/staff/management/read";
import { error } from "console";

export async function add_staff_attendance_auto() {

	try {
		const hotels = await db.hotels.findMany({});

		const today = new Date();
		const date = today.toISOString().split("T")[0];

		//Deleting the image
		hotels.map((hotel) => {
			return hotel.HotelLogo = ""
		});

		let error_flag = false, errors = [];
		hotels.map(async (hotel) => {
			const hotel_id = hotel.id;
			const staffs = await read_hotel_staffs({
				hotel_id
			});
			staffs.output.map(async (staff) => {
				const staff_id = staff.id;

				// Existing Staff Attendance entry
				const existingStaffAttendance = await check_staff_attendance({ date, staff_id });
				if (existingStaffAttendance.returncode != 200) {
					const result = await create_staff_attendance({
						date,
						arrival_time: "9:00 A.M",
						departure_time: "5:00 P.M.",
						type: "Absent",
						note: "",
						staff_id
					});
					if (result.returncode != 200) {
						error_flag = true;
						errors.push(result.message);
					}

				}
			})
		});

		if (error_flag) {

			return {
				returncode: 500,
				message: "Staff Attendances added might have errors",
				output: errors
			}
		} else {

			return {
				returncode: 200,
				message: "Staff Attendances added",
				output: []
			}
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		}
	}
}
