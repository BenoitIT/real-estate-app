import { bookingAppUrl } from "./axios";
import { messageBody } from "@/interfaces/property";
export const messageBaseEndpoint = "/message";
export const createMessage = async (data: Partial<messageBody>) => {
  try {
    const response = await bookingAppUrl.post(messageBaseEndpoint, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
