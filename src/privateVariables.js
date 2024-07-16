export const CLINIC_LEADS_SHEET_ID = process.env.CLINIC_LEADS_SHEET_ID;
export const IVF_LEADS_SHEET_ID = process.env.IVF_LEADS_SHEET_ID;
export const IVF_JOURNEY_LEADS = process.env.IVF_JOURNEY_LEADS;


if (!CLINIC_LEADS_SHEET_ID || !IVF_LEADS_SHEET_ID || !IVF_JOURNEY_LEADS) {
   throw new Error("SHEET_ID is not defined in the environment variables");
}