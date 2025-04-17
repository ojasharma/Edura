// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import userRoutes from "./routes/userRoutes";
import clerkWebhook from "./routes/clerkWebhook";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api", clerkWebhook);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
