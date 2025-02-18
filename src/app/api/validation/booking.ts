import { z } from "zod";

const bookingValidationSchema = z.object({
  sdate: z.date(),
  edate: z.date(),
  fullname: z.string(),
  phone: z.string(),
});

export default bookingValidationSchema;
