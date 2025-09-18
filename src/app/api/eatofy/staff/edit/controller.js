import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function edit_eatofy_staff(data, tokenData) {
	try {
		if (!tokenData || !tokenData.role || !['Administration', 'Management'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to edit staff",
				output: []
			};
		}

		const staff_id = data['staff_id'] || null;
		const firstName = data['firstName'] || null;
		const lastName = data['lastName'] || null;
		const email = data['email'] || null;
		const role = data['role'] || null;

		if (!staff_id || !firstName || !lastName || !email || !role) {
			return {
				returncode: 400,
				message: "Missing required parameters",
				output: []
			};
		}

		const updateData = {
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Role: role
		};

		if (data.password) {
			updateData.Password = data.password;
		}

		const result = await eatofyStaffCrud.updateStaff({ staff_id, ...updateData });
		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}