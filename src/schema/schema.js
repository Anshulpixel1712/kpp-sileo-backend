import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .optional(),
  email: z.string().optional(),
  message: z.string().optional(),
  currentURL: z.string().optional(),
});
