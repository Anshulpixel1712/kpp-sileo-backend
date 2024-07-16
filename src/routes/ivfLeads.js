import express from "express";
import { ZodError } from "zod";
import { contactFormSchema } from '../schema/schema.js';
import sheets from "../sheetClient.mjs";
import moment from "moment-timezone";
import { IVF_LEADS_SHEET_ID } from '../privateVariables.js';

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const body = contactFormSchema.parse(req.body);
      const rows = Object.values(body);

      const now = moment().tz("Asia/Kolkata");
      const currentDate = now.format("DD-MM-YYYY");
      const currentTime = now.format("hh:mm A");

      rows.push(currentDate, currentTime);

      await sheets.spreadsheets.values.append({
         spreadsheetId: IVF_LEADS_SHEET_ID,
         range: "SEO_LEADS!A2:F2",
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
   res.json({ message: "IVF Center Leads Api Is Working" });
});

export default router;
