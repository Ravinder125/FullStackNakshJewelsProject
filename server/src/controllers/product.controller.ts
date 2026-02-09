import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({ isActive: true }).lean();

    if (!products?.length) {
        return res
            .status(404)
            .json(new ApiError(404, "No product found"))
    }
    return res
        .status(200)
        .json(new ApiResponse("Products fetched successfully", products))
})
