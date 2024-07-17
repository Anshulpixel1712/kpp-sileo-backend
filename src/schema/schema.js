import { z } from "zod";

export const contactFormSchema = z.object({
   name: z
      .string()
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .optional(),
   phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[6789]\d{9}$/, "Phone number must be a valid Indian number"),
   consultingFor: z.enum(["Male", "Female", "Couple", "-"]).optional(),
   doctorConsultingFor: z.enum(["Yes", "No", "-"]).optional(),
   tryingBaby: z.enum(["Below 1 Year", "1-5 Years", "above 5 Year", "Not Planning", "-"]).optional(),
   parentUrl: z.string().url().optional(),
});


export const clinicLeadsSchema = z.object({
   name: z
      .string()
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .optional(),
   phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[6789]\d{9}$/, "Phone number must be a valid Indian number"),
   gender: z.enum(["Male", "Female", "Couple", "-"]).optional(),
   tryingBaby: z.enum(["Below 1 Year", "1-5 Years", "Above 5 Years", "Not Planning", "-"]).optional(),
   consultedDoctor: z.enum(["Yes", "No", "-"]).optional(),
   parentUrl: z.string().url().optional(),
});