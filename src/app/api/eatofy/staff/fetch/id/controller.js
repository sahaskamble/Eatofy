import eatofyStaffCrud from "@/app/lib/crud/EatofyStaff";

export async function fetch_eatofy_staff_by_id(data, tokenData) {
	try {
		if (!tokenData || !tokenData.role || !['Administration', 'Management', 'Backoffice'].includes(tokenData.role)) {
			return {
				returncode: 403,
				message: "Insufficient permissions to fetch staff",
				output: []
			};
		}

		const staff_id = data['staff_id'] || null;

		if (!staff_id) {
			return {
				returncode: 400,
				message: "Staff ID is required",
				output: []
			};
		}

		const result = await eatofyStaffCrud.readStaffMember({ staff_id });
		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}