import { z } from "zod";

const bookingValidationSchema = z.object({
  sdate: z.string(),
  edate: z.string(),
  fullname: z.string(),
  phone: z.string(),
});

export default bookingValidationSchema;
