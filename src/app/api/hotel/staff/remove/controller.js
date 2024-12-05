import staffCrud from "@/app/lib/crud/Staffs";

export async function remove_staff(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const staff_id = data['staff_id'] || null;

        if (staff_id === null) {
            return NextResponse.json({
                returncode: 400,
                message: "Staff ID is required",
                output: []
            });
        }

        // Delete the hotel
        const result = await staffCrud.deleteStaffById(staff_id);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
