import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const bookingAppUrl = axios.create({
  baseURL: `${apiUrl}/api`,

});
