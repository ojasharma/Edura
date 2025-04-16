// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import userRoutes from "./routes/userRoutes";


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

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
