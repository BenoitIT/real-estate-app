import { Reservation } from "@/interfaces/reservation";
import { bookingAppUrl } from "./axios";
export const bookingBaseEndpoint = "/bookingrequests";
export const createBookingRequests = async (data: Partial<Reservation>) => {
  try {
    const response = await bookingAppUrl.post(bookingBaseEndpoint, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};

export const getRequests = async (user: number) => {
  try {
    const response = await bookingAppUrl.get(
      `${bookingBaseEndpoint}?user=${user}`
    );
    return { data: response.data.data, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};

export const getBooking = async (id: number) => {
  try {
    const response = await bookingAppUrl.get(`${bookingBaseEndpoint}/${id}`);
    return { data: response.data.data, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
export const UpdateAccount = async (id:string) => {
  try {
    const response = await bookingAppUrl.put(`${bookingBaseEndpoint}/${id}`);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
export const deleteRequest = async (id: number) => {
  try {
    const response = await bookingAppUrl.delete(
      bookingBaseEndpoint + `/${id}`
    );
    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};
