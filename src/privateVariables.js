export const LEADS_SHEET_ID = process.env.LEADS_SHEET_ID;

if (!LEADS_SHEET_ID) {
  throw new Error("SHEET_ID is not defined in the environment variables");
}
