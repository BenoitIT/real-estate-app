
import { bookingAppUrl } from "./axios";
export const bookingBaseEndpoint = "/actualbooking";

export const getInuseProperties = async (user: number) => {
  try {
    const response = await bookingAppUrl.get(
      `${bookingBaseEndpoint}?user=${user}`
    );
    return { data: response.data.data, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};

export const getBookings = async (id: number) => {
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
