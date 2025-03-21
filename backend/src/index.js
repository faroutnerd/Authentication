import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";      // since we are using 'module' therefore we need to put .js 
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// middleware
app.use(express.json());    // Middleware to parse JSON data :req.body

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})