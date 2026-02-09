import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

export const healthCheck = asyncHandler(async (_: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "API is healthy 🟢",
        timestamp: new Date().toISOString(),
    });
})
