import express from "express";
import cors from "cors";
import { z, ZodError } from "zod";
import sheets from "./sheetClient.mjs";
import moment from "moment-timezone";

const CLINIC_LEADS_SHEET_ID = process.env.CLINIC_LEADS_SHEET_ID;
const IVF_LEADS_SHEET_ID = process.env.IVF_LEADS_SHEET_ID;

if (!CLINIC_LEADS_SHEET_ID, !IVF_LEADS_SHEET_ID) {
  throw new Error("SHEET_ID is not defined in the environment variables");
}

const app = express();
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(?!9999999999$)(?!6666666666$)(?!7777777777$)(?!8888888888$)[6789]\d{9}$/,
      "Phone number must be a valid Indian number"
    ),
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/clinic_leads", async (req, res) => {
  try {
    const body = contactFormSchema.parse(req.body);
    const rows = Object.values(body);

    const now = moment().tz("Asia/Kolkata");
    const currentDate = now.format("DD-MM-YYYY");
    const currentTime = now.format("hh:mm A");

    rows.push(currentDate, currentTime);

    await sheets.spreadsheets.values.append({
      spreadsheetId: CLINIC_LEADS_SHEET_ID,
      range: "Clinic_leads!A2:E2",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: {
        values: [rows],
      },
    });
    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error handling request:", error);
    const status = error instanceof ZodError ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});
app.get("/clinic_leads", (req, res) => {
  res.json({ message: "Clinic Leads Api Is Working" });
});


app.post("/ivf-lead", async (req, res) => {
  try {
    const body = contactFormSchema.parse(req.body);
    const rows = Object.values(body);

    const now = moment().tz("Asia/Kolkata");
    const currentDate = now.format("DD-MM-YYYY");
    const currentTime = now.format("hh:mm A");

    rows.push(currentDate, currentTime);

    await sheets.spreadsheets.values.append({
      spreadsheetId: IVF_LEADS_SHEET_ID,
      range: "SEO_LEADS!A2:E2",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: {
        values: [rows],
      },
    });
    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error handling request:", error);
    const status = error instanceof ZodError ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});
app.get("/ivf-lead", (req, res) => {
  res.json({ message: "IVF Center Leads Api Is Working" });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
