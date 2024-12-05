import notificationCrud from "@/app/lib/crud/Notifications";

export async function remove_notifications() {
    try {

        const result = await notificationCrud.deleteNotifications();
        return result;

    } catch (error) {

        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
