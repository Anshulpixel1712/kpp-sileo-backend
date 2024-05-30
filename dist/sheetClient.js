"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secrets_1 = __importDefault(require("./secrets"));
const client = new googleapis_1.google.auth.JWT(secrets_1.default.client_email, undefined, secrets_1.default.private_key, ["https://www.googleapis.com/auth/spreadsheets"]);
const sheets = googleapis_1.google.sheets({ version: "v4", auth: client });
exports.default = sheets;
