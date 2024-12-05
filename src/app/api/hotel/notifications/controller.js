import { inventory_notifications, reservations_notifications, subscriptions_notifications } from "./supporting";
import notificationCrud from "@/app/lib/crud/Notifications";

export async function notification(tokenData) {
	try {

		const hotel_id = await tokenData.hotelId;

		if (hotel_id === null) {
			return {
				returncode: 400,
				message: "Required Parameters not found.",
				output: []
			}
		}


		// Add Notifications
		await inventory_notifications(hotel_id);
		await reservations_notifications(hotel_id);
		await subscriptions_notifications(hotel_id);

		// Read Notifications
		const end_result = await notificationCrud.readNotifications(hotel_id);
		return end_result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
