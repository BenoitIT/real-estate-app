import { userInfo } from "@/interfaces/users";
import { bookingAppUrl } from "./axios";
export const usersBaseEndpoint = "/users";
export const createAnaccount = async (data: userInfo) => {
  try {
    const response = await bookingAppUrl.post(usersBaseEndpoint, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
export const updatePassword = async (id: number, data: userInfo) => {
  try {
    const response = await bookingAppUrl.put(`${usersBaseEndpoint}/${id}`, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
