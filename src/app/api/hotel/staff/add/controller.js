import staffCrud from "@/app/lib/crud/Staffs";

export async function add_staff(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        // Extract data from FormData or direct JSON
        const first_name = data['first_name'] || null;
        const last_name = data['last_name'] || null;
        const address = data['address'] || null;
        const contact = data['contact'] || null;
        const email = data['email'] || null;
        const password = data['password'] || null;
        const department_name = data['department_name'] || null;
        const designation = data['designation'] || null;
        const role = data['role'] || null;
        const salary = data['salary'] || 0;
        const incentives = data['incentives'] || 0;
        const hotel_id = data['hotel_id'] || null;

        if (first_name === null || last_name === null || address === null || contact === null || email === null || password === null || department_name === null || designation === null || role === null || hotel_id === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const staff_exists = await staffCrud.doesStaffExists(first_name, last_name, contact);
        if (staff_exists.returncode === 200) {
            return {
                returncode: 409,
                message: "Staff with this name & contact already exists",
                output: []
            };
        }

        // Create staff with additional metadata
        const staffData = {
            first_name,
            last_name,
            address,
            contact,
            email,
            password,
            department_name,
            designation,
            role,
            salary,
            incentives,
            hotel_id
        };

        const result = await staffCrud.createStaff(staffData);
        return result;

    } catch (error) {
        return {
            returncode: 500,
            message: error.message || "Internal server error",
            output: []
        };
    }
}
