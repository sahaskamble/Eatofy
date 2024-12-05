import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";

export async function add_attendance(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !tokenData.hotelId || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const today = new Date();
        const date = today.toISOString().split("T")[0];

        const hotel_id = tokenData.hotelId || null;
        const type = data['type'] || null;
        const note = data['note'] || null;
        const staff_id = data['staff_id'] || null;

        // Default Invalid Checker
        if (hotel_id === null || date === null || type === null || staff_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        attendance_exists = await staffAttendanceCrud.checkAttendanceExist(date, staff_id);
        if (attendance_exists.returncode === 200 && attendance_exists.output.length !== 0) {
            return {
                returncode: 409,
                message: "Attendance already exists",
                output: []
            };
        }

        const Data = {
            date,
            type,
            note,
            staff_id
        };

        const result = await staffAttendanceCrud.createAttendance(Data);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
