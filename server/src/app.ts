// src/app.ts
import express from "express";
import cors from "cors";
import heathRoute from './routes/health.route.js'

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", heathRoute);

// Global error handler (ALWAYS last)
// app.use(errorHandler);

export default app;
