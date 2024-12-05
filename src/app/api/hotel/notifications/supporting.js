import { differenceInDays, isValid, parseISO } from 'date-fns';
import hotelSubscriptionCrud from '@/app/lib/crud/HotelSubscription';
import notificationCrud from '@/app/lib/crud/Notifications';
import inventoryStockCrud from '@/app/lib/crud/InventoryStock';
import reservationsCrud from '@/app/lib/crud/Reservation';

// Already added notifications
let available_notifications;

export const getTodaysDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() returns 0-based month
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

function changeTimeFormat(time) {
	// Split the input time into hours and minutes
	//
	const [hoursStr, minutesStr] = time.split(':');
	let hours = parseInt(hoursStr, 10);
	let minutes = parseInt(minutesStr, 10);

	// Determine AM or PM
	let newformat = hours >= 12 ? 'PM' : 'AM';

	// Convert hours to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // Handle midnight as 12

	// Ensure minutes are displayed with two digits
	minutes = minutes < 10 ? '0' + minutes : minutes;

	// Format the time in hh:mm AM/PM
	const result = `${hours}:${minutes} ${newformat}`;
	return result;
}

export const get_hotel = async (hotel_id) => {

	const result = await hotelSubscriptionCrud.readSubscription(hotel_id);
	return result;
}

// Inventory Notifications
export const inventory_notifications = async (hotel_id) => {

	// Initialise
	let notifications = [];
	available_notifications = await notificationCrud.readNotifications(hotel_id);

	const inventory_data = await inventoryStockCrud.readStock(hotel_id);
	if (inventory_data.returncode === 200) {

		const available_stock = inventory_data.output;

		available_stock.forEach((stock) => {
			if (stock.Status === "Low Stock") {

				const title = "Low Stock Alert";
				const description = `${stock.Items.ItemName} is at low stock with quantity ${stock.Quantity} ${stock.Unit}.`;
				const type = "Inventory";
				const notification = { title, description, type, hotel_id };
				notifications.push(notification);
			}

			if (stock.Status === "Unavailable") {

				const title = "Empty Stock Alert";
				const description = `${stock.Items.ItemName} is empty.`;
				const type = "Inventory";
				const notification = { title, description, type };
				notifications.push(notification);
			}
		});
	}

	// Notification Added
	if (notifications.length > 0) {
		notifications.forEach(async (notification) => {
			await notificationCrud.createNotification(notification);
		});
	}
}

// Reservations notifications
export const reservations_notifications = async (hotel_id) => {

	let notifications = [];

	const reservations_data = await reservationsCrud.readReservations(hotel_id);

	const today_date = getTodaysDate();
	if (reservations_data.returncode === 200) {

		const reservations = reservations_data.output;

		reservations.forEach((reservation) => {
			if (reservation.Date === today_date) {


				const title = "Reservations for today";
				const time = changeTimeFormat(reservation.Time)
				const description = `${reservation.Customer.CustomerName} has booked a reservation for ${time} for ${reservation.NoOfPersons} people.`;
				const type = "Reservation";
				const notification = { title, description, type, hotel_id };
				notifications.push(notification);
			}
		});
	}

	// Notification Added
	if (notifications.length > 0) {
		notifications.forEach(async (notification) => {
			await notificationCrud.createNotification(notification);
		});
	}
}

// Subscription End notification
export const subscriptions_notifications = async (hotel_id) => {
	let notifications = [];

	const hotel_data = await get_hotel(hotel_id);
	if (hotel_data.length > 0) {
		const hotel_info = hotel_data[0];

		const currentDate = new Date();
		const endDate = parseISO(hotel_info.EndDate);
		const daysLeft = differenceInDays(endDate, currentDate);
		if (daysLeft <= 7 && daysLeft > 0) {
			const hotel_subscription_id = hotel_info.id;
			await hotelSubscriptionCrud.deactivateAccount({
				hotel_subscription_id: hotel_subscription_id,
				status: "About to Expire",
				is_valid: false
			});

			const title = "Subscription is gonna end soon...";
			const description = `Your Subscription is gonna end in ${daysLeft} days.`;
			const type = "Subscription";
			const notification = { title, description, type, hotel_id };
			notifications.push(notification);
		}
		if (daysLeft <= 0) {
			const hotel_subscription_id = hotel_info.id;
			await hotelSubscriptionCrud.deactivateAccount({
				hotel_subscription_id: hotel_subscription_id,
				status: "Expired",
				is_valid: false
			});

			const title = "Subscription Ended";
			const description = `Your Subscription is ended on ${hotel_info.EndDate}.`;
			const type = "Subscription";
			const notification = { title, description, type, hotel_id };
			notifications.push(notification);
		}
	}

	// Notification Added
	if (notifications.length > 0) {

		notifications.forEach(async (notification) => {
			await notificationCrud.createNotification(notification);
		});
	}

}
