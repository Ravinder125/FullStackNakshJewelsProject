import { Request, Response } from "express";
import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const cart = await Cart
        .find({})
        .populate("items.product");

    if (!cart?.length) {
        return res
            .status(404)
            .json(new ApiError(404, "No cart found"))
    }
    return res
        .status(200)
        .json(new ApiResponse("cart fetched successfully", cart))
})
