import Reservation from "../models/Reservation";
import { BaseCrud } from "./BaseCrud";

class ReservationCrud extends BaseCrud {
  constructor() {
    super(Reservation)
  }

  async createReservation(data) {
    try {
      const normalizedData = {
        Date: data.date,
        Time: data.time,
        Note: data.note,
        NoOfPersons: data.no_of_persons,
        CustomerId: data.customer_id,
        HotelId: data.hotel_id
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

  async readReservations(hotel_id) {
    try {
      const result = await this.readMany({ HotelId: hotel_id }, { populate: [{ path: 'CustomerId' }] });
      return result;
    } catch (error) {
      return {
        returncode: 500,
        message: error.message,
        output: []
      }
    }
  }

  async deleteReservations(reservation_id) {
    try {
      const result = await this.delete({ _id: reservation_id });
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

const reservationsCrud = new ReservationCrud();
export default reservationsCrud;
