import { bookingAppUrl } from "./axios";
import { propertyInfo } from "@/interfaces/property";
export const propertyBaseEndpoint = "/properties";
export const createProperty = async (data: Partial<propertyInfo>) => {
  try {
    const response = await bookingAppUrl.post(propertyBaseEndpoint, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};

export const getProperties= async (user: number) => {
  try {
    const response = await bookingAppUrl.get(
      `${propertyBaseEndpoint}?user=${user}`
    );
    return { data: response.data.data, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};

export const deleteProperty = async (id: number) => {
  try {
    const response = await bookingAppUrl.delete(propertyBaseEndpoint + `/${id}`);
    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};
export const getProperty = async (id: number) => {
  try {
    const response = await bookingAppUrl.get(
      `${propertyBaseEndpoint}/${id}`
    );
    return { data: response.data.data, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
export const UpdateAccount = async (id: number,data:propertyInfo) => {
  try {
    const response = await bookingAppUrl.put(
      `${propertyBaseEndpoint}/${id}`,data
    );
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.error(err);
  }
};
