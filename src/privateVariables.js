export const CLINIC_LEADS_SHEET_ID = process.env.CLINIC_LEADS_SHEET_ID;
export const IVF_LEADS_SHEET_ID = process.env.IVF_LEADS_SHEET_ID;
export const IVF_JOURNEY_LEADS = process.env.IVF_JOURNEY_LEADS;
export const FERTILITY_CALLBACK_LEAD = process.env.FERTILITY_CALLBACK_LEAD;


if (!CLINIC_LEADS_SHEET_ID || !IVF_LEADS_SHEET_ID || !IVF_JOURNEY_LEADS || !FERTILITY_CALLBACK_LEAD) {
   throw new Error("SHEET_ID is not defined in the environment variables");
}