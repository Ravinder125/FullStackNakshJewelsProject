// src/app.ts
import express from "express";
import cors from "cors";
import morgan from 'morgan'
// import { errorHandler } from "./middlewares/error.middleware.js";
import { Product } from "./models/product.model.js";

const app = express();

// Global middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(errorHandler)


// Routes
import heathRoutes from './routes/health.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'


app.use("/api/heaths", heathRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// Global error handler (ALWAYS last)
// app.use(errorHandler);

export default app;
