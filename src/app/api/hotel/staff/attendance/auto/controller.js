import hotelsCrud from "@/app/lib/crud/Hotels";
import staffAttendanceCrud from "@/app/lib/crud/StaffAttendances";
import staffCrud from "@/app/lib/crud/Staffs";

export async function auto_attendance_add() {
    try {
        const hotels_data = await hotelsCrud.readAllHotels();
        if (hotels_data.returncode !== 200 || !hotels_data.output.length) {
            return {
                returncode: 404,
                message: "No hotels found",
                output: []
            };
        }

        const hotels = hotels_data.output;
        const today = new Date();
        const date = today.toISOString().split("T")[0];

        // Process each hotel
        const errors = [];
        await Promise.all(hotels.map(async (hotel) => {
            try {
                const staffs_data = await staffCrud.fetchStaffByHotelId(hotel._id);
                if (staffs_data.returncode !== 200 || !staffs_data.output.length) {
                    return; // Skip if no staff found
                }

                // Process each staff member
                await Promise.all(staffs_data.output.map(async (staff) => {
                    try {
                        const attendance_exist = await staffAttendanceCrud.checkAttendanceExist(date, staff._id);
                        if (attendance_exist.returncode !== 200) {
                            const result = await staffAttendanceCrud.createAttendance({
                                staff_id: staff._id,
                                type: "Absent",
                                date
                            });

                            if (result.returncode !== 200) {
                                errors.push(`Error adding attendance for staff ${staff._id}: ${result.message}`);
                            }
                        }
                    } catch (staffError) {
                        errors.push(`Error processing staff ${staff._id}: ${staffError.message}`);
                    }
                }));
            } catch (hotelError) {
                errors.push(`Error processing hotel ${hotel._id}: ${hotelError.message}`);
            }
        }));

        if (errors.length > 0) {
            return {
                returncode: 500,
                message: "Some staff attendances failed to be added",
                output: errors
            };
        }

        return {
            returncode: 200,
            message: "Staff attendances added successfully",
            output: []
        };

    } catch (error) {
        console.error('Error in auto_attendance_add:', error);
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
