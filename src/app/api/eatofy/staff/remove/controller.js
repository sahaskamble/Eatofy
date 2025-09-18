import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function remove_eatofy_staff(data, tokenData) {
	try {
		if (!tokenData || !tokenData.role || !['Administration'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to delete staff",
				output: []
			};
		}

		const email = data['email'] || null;

		if (!email) {
			return {
				returncode: 400,
				message: "Email is required",
				output: []
			};
		}

		const result = await eatofyStaffCrud.deleteStaff({ email });
		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}