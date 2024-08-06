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

export const ivfJourneyLeadsSchema = z.object({
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
   utm_source: z.string().optional(),
   utm_medium: z.string().optional(),
   utm_campaign: z.string().optional(),
   gclid: z.string().optional(),
   utm_term: z.string().optional(),
})

export const clinicLeadsSchema = z.object({
   phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[6789]\d{9}$/, "Phone number must be a valid Indian number"),
   parentUrl: z.string().url().optional(),
   utm_source: z.string().optional(),
   utm_medium: z.string().optional(),
   utm_campaign: z.string().optional(),
   gclid: z.string().optional(),
   utm_term: z.string().optional(),
});

export const fertilityCallbackSchema = z.object({
   name: z
      .string()
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .optional(),
   phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[6789]\d{9}$/, "Phone number must be a valid Indian number"),
   tryingBaby: z.enum(["Less than a year", "More than a year", "Not Planning", "-"]).optional(),
   issueFacing: z.enum(["PCOS/PCOD Issue", "Low AMH Issue", "Other Issue"]).optional(),
   spokenDoctor: z.enum(["Yes", "No", "-"]).optional(),
   consultedDoctor: z.enum(["Yes", "No", "-"]).optional(),
   parentUrl: z.string().url().optional(),
   utm_source: z.string().optional(),
   utm_medium: z.string().optional(),
   utm_campaign: z.string().optional(),
   gclid: z.string().optional(),
   utm_term: z.string().optional(),
})