import express from "express";
import { ZodError } from "zod";
import sheets from "../sheetClient.mjs";
import moment from "moment-timezone";
import { CLINIC_LEADS_SHEET_ID } from '../privateVariables.js';
import { clinicLeadsSchema } from '../schema/schema.js';

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const body = clinicLeadsSchema.parse(req.body);
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

router.get("/", (req, res) => {
   res.json({ message: "Clinic Leads Api Is Working" });
});

export default router;