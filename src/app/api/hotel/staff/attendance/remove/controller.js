import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";
import mongoose from 'mongoose';

export async function remove_attendance(data, tokenData) {
    try {
        // Verify if user has permission
        if (!tokenData || !tokenData.hotelId || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to manage attendance",
                output: []
            };
        }

        const attendance_id = data['attendance_id'] || null;

        if (!attendance_id) {
            return {
                returncode: 400,
                message: "Attendance ID is required",
                output: []
            };
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(attendance_id)) {
            return {
                returncode: 400,
                message: "Invalid attendance ID format",
                output: []
            };
        }

        const result = await staffAttendanceCrud.deleteAttendances({ 
            _id: new mongoose.Types.ObjectId(attendance_id)
        });
        return result;

    } catch (error) {
        console.error('Error in remove_attendance:', error);
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
