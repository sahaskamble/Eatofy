import billsCrud from "@/app/lib/crud/Bills";

export async function sync_bills(data) {
	try {


		let error_flag = false;
		await data.data.map(async (bill) => {
			const billSync = await billsCrud.SyncBills(bill);
			if (billSync.returncode !== 200) {
				error_flag = true
			}
		})

		if (error_flag) {
			return {
				returncode: 500,
				message: "Error Syncing Bills.",
				output: []
			};
		}

		return {
			returncode: 200,
			message: "Bills Synced",
			output: []
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
