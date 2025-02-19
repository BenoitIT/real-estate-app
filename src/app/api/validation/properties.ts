import { z } from "zod";

const propertyValidationSchema = z.object({
  userId: z.string(),
  name: z.string(),
  ptype: z.string(),
  measurement: z.string(),
  pricepermonth: z.number(),
  description: z.string(),
});

export default propertyValidationSchema;
