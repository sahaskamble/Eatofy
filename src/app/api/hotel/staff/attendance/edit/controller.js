import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";

export async function edit_attendance(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const hotel_id = tokenData.hotelId;
        const type = data['type'] || null;
        const attendance_id = data['attendance_id'] || null;
        const staff_id = data['staff_id'] || null;
        const today = new Date();
        const date = today.toISOString().split("T")[0];

        // Default Invalid Checker
        if (hotel_id === null || type === null || attendance_id === null || staff_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const attendance_exists = await staffAttendanceCrud.checkAttendanceExist(date, staff_id);
        if (attendance_exists.returncode !== 200) {
            return {
                returncode: 409,
                message: "Attendance doesn't exists",
                output: []
            };
        }

        const result = await staffAttendanceCrud.editAttendanceofStaff(attendance_id, type);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
