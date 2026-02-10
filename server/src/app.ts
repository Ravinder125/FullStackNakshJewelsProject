// src/app.ts
import express from "express";
import cors from "cors";

const app = express();

// Global middlewares
app.use(cors());
app.use(errorHandler)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import heathRoutes from './routes/health.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import { errorHandler } from "./middlewares/error.middleware.js";


app.use("/api/heaths", heathRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// Global error handler (ALWAYS last)
// app.use(errorHandler);

export default app;
