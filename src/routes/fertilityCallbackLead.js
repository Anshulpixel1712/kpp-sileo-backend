import express from "express";
import { ZodError } from "zod";
import sheets from "../sheetClient.mjs";
import moment from "moment-timezone";
import { FERTILITY_CALLBACK_LEAD } from '../privateVariables.js';
import { fertilityCallbackSchema } from '../schema/schema.js';

const router = express.Router();

router.post("/", async (req, res) => {
   try {
      // Parse the request body using the schema
      const body = fertilityCallbackSchema.parse(req.body);
      let rows = Object.values(body);

      // Replace empty or null values with "-"
      rows = rows.map(value => (value === null || value === "") ? "-" : value);

      // Get current date and time in Asia/Kolkata timezone
      const now = moment().tz("Asia/Kolkata");
      const currentDate = now.format("DD-MM-YYYY");
      const currentTime = now.format("hh:mm A");

      // Add current date and time to the rows
      rows.push(currentDate, currentTime);

      // Append data to the Google Sheet
      await sheets.spreadsheets.values.append({
         spreadsheetId: FERTILITY_CALLBACK_LEAD,
         range: "Fertility_Leads!A2:N2",
         insertDataOption: "INSERT_ROWS",
         valueInputOption: "RAW",
         requestBody: {
            values: [rows],
         },
      });

      // Respond with a success message
      res.json({ message: "Data added successfully" });
   } catch (error) {
      console.error("Error handling request:", error);

      // Determine the status code based on error type
      const status = error instanceof ZodError ? 400 : 500;

      // Respond with an error message
      res.status(status).json({ error: error.message });
   }
});

router.get("/", (req, res) => {
   res.json({ message: "Fertility Callback Leads Api Is Working" });
});

export default router;
