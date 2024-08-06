import express from "express";
import cors from "cors";
import clinicLeadsRouter from "./routes/clinicLeads.js";
import ivfLeadsRouter from "./routes/ivfLeads.js";
import ivfJourneyLeadsRouter from "./routes/ivfJourneyLeads.js";
import fertilityCallbackLeadRouter from "./routes/fertilityCallbackLead.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/clinic_leads", clinicLeadsRouter);
app.use("/ivf-lead", ivfLeadsRouter);
app.use("/ivf-journey-leads", ivfJourneyLeadsRouter);
app.use("/fertility-callback-lead", fertilityCallbackLeadRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
