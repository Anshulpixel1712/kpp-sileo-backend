import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

import key from "./secrets";

const client = new google.auth.JWT(
  key.client_email,
  undefined,
  key.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth: client });

export default sheets;
