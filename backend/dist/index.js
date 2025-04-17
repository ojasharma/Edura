"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const clerkWebhook_1 = __importDefault(require("./routes/clerkWebhook"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Connect to MongoDB
(0, database_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api", clerkWebhook_1.default);
// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
