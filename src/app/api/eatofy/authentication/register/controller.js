import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function register_eatofy_user(data) {
	try {
		const firstName = data['firstName'] || null;
		const lastName = data['lastName'] || null;
		const email = data['email'] || null;
		const password = data['password'] || null;
		const role = data['role'] || null;

		if (firstName === null || lastName === null || email === null || password === null || role === null) {
			return {
				returncode: 400,
				message: "Missing some Parameters",
				output: []
			};
		}

		const user_exists = await eatofyStaffCrud.checkStaffByEmail({ email });

		if (user_exists) {
			return {
				returncode: 409,
				message: "Staff with this email already exists",
				output: []
			};
		}

		// Create staff
		const result = await eatofyStaffCrud.createStaff(data);
		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
