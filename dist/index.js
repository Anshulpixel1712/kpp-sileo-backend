"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const sheetClient_1 = __importDefault(require("./sheetClient"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const SHEET_ID = process.env.SHEET_ID;
if (!SHEET_ID) {
    throw new Error("SHEET_ID is not defined in the environment variables");
}
const app = (0, express_1.default)();
const contactFormSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    phoneNumber: zod_1.z
        .string()
        .min(1, "Phone number is required")
        .regex(/^(?!9999999999$)(?!6666666666$)(?!7777777777$)(?!8888888888$)[6789]\d{9}$/, "Phone number must be a valid Indian number"),
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
app.post("/send-message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = contactFormSchema.parse(req.body);
        const rows = Object.values(body);
        const now = (0, moment_timezone_1.default)().tz("Asia/Kolkata");
        const currentDate = now.format("DD-MM-YYYY");
        const currentTime = now.format("hh:mm A");
        rows.push(currentDate, currentTime);
        yield sheetClient_1.default.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: "Data!A2:E2",
            insertDataOption: "INSERT_ROWS",
            valueInputOption: "RAW",
            requestBody: {
                values: [rows],
            },
        });
        res.json({ message: "Data added successfully" });
    }
    catch (error) {
        console.error("Error handling request:", error);
        const status = error instanceof zod_1.ZodError ? 400 : 500;
        res.status(status).json({ error: error.message });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
