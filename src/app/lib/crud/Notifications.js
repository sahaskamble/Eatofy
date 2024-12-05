import Notifications from "../models/Notifications";
import { BaseCrud } from "./BaseCrud";

class NotificationCrud extends BaseCrud {
  constructor() {
    super(Notifications);
  }

  async createNotification(data) {
    try {
      const normalizedData = {
        HotelId: data.hotel_id,
        Type: data.type,
        Title: data.title,
        Description: data.description
      }
      const result = await this.create(normalizedData);
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async readNotifications(hotel_id) {
    try {
      const result = await this.readMany({ HotelId: hotel_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteNotification(notification_id) {
    try {
      const result = await this.delete({ _id: notification_id });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteNotifications() {
    try {
      const result = await this.delete({});
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

}

const notificationCrud = new NotificationCrud();
export default notificationCrud;
