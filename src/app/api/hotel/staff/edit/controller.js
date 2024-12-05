import staffCrud from "@/app/lib/crud/Staffs";

export async function edit_staff_info(data, tokenData) {
    try {

        // Verify if user has permission to create hotels
        if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice', 'Owner'].includes(tokenData.role)) {
            return {
                returncode: 403,
                message: "Insufficient permissions to create hotel",
                output: []
            };
        }

        const staff_id = data['staff_id'] || null;
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

        if (staff_id === null || first_name === null || last_name === null || address === null || contact === null || email === null || password === null || department_name === null || designation === null || role === null) {
            return {
                returncode: 400,
                message: "Missing required parameters",
                output: []
            };
        }

        const staff_exists = await staffCrud.doesStaffExists(first_name, last_name, contact);
        if (staff_exists.returncode !== 200) {
            return {
                returncode: 409,
                message: "Staff with this name & contact doesn't exists",
                output: []
            };
        }

        // Create staff with additional metadata
        const staffData = {
            staff_id,
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
        };

        const result = await staffCrud.updateStaffInfo(staffData);
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
