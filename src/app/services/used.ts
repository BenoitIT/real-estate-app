import { bookingAppUrl } from "./axios";
export const bookingBaseEndpoint = "/history";
export const getBookings = async (id: number) => {
  try {
    const response = await bookingAppUrl.get(`${bookingBaseEndpoint}?user=${id}`);
    return { data: response.data.data, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
