import express from "express";
import { ZodError } from "zod";
import sheets from "../sheetClient.mjs";
import moment from "moment-timezone";
import { IVF_JOURNEY_LEADS } from '../privateVariables.js';
import { ivfJourneyLeadsSchema } from '../schema/schema.js';

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      const body = ivfJourneyLeadsSchema.parse(req.body);
      const rows = Object.values(body);

      const now = moment().tz("Asia/Kolkata");
      const currentDate = now.format("DD-MM-YYYY");
      const currentTime = now.format("hh:mm A");

      rows.push(currentDate, currentTime);

      await sheets.spreadsheets.values.append({
         spreadsheetId: IVF_JOURNEY_LEADS,
         range: "Lead_Form!A2:F2",
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
   res.json({ message: "IVF Journey Leads Api Is Working" });
});

export default router;
