import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/contact-lead", contactRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
