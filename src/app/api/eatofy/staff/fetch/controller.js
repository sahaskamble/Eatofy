import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function fetch_eatofy_staff(tokenData) {
	try {
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to fetch staff",
				output: []
			};
		}

		const existing_staff = await eatofyStaffCrud.readStaff();

		if (existing_staff.returncode === 404) {
			return {
				returncode: 409,
				message: "No Staff to be displayed",
				output: []
			};
		}

		return existing_staff;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
