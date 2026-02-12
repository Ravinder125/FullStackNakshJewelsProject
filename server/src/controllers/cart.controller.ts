import { Request, Response } from "express";
import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { isValidObjectId } from "mongoose";


export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const cart = await Cart
        .findOne().select("items _id")
        .populate("items.product", "_id image name price");

    if (!cart) {
        return res
            .status(404)
            .json(new ApiError(404, "No cart found"))
    }
    return res
        .status(200)
        .json(new ApiResponse("cart fetched successfully", cart))
})

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    console.log("working")
    const { productId } = req.params
    const { quantity = 1 } = req.body;

    if (!productId || !isValidObjectId(productId)) {
        return res
            .status(400)
            .json(new ApiError(400, "Product Id is missing or not valid object Id"))
    }

    const isProductExist = await Product.findById(productId)
    if (!isProductExist) {
        return res
            .status(404)
            .json(new ApiError(404, "No product found"))
    }
    const newItem = { product: isProductExist._id, quantity: 1 }

    let cart = await Cart.findOne({});

    if (!cart) {
        cart = await Cart.create({
            items: [newItem]
        })
    } else {
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity
        } else {
            cart.items.push(newItem)
        }
    }

    await cart.save();

    return res
        .status(200)
        .json(new ApiResponse("Cart successfully updated"))
})

export const cartItemQuantityChange = asyncHandler(async (req: Request, res: Response) => {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (productId && !isValidObjectId(productId)) {
        return res
            .status(400)
            .json(new ApiError(400, "Product Id is missing or not valid object Id"))
    }

    const cart = await Cart
        .findOne({}).select("items _id")
        .populate("items.product", "_id image name price");

    if (!cart) {
        return res
            .status(404)
            .json(new ApiError(404, "No cart found"))
    }
    console.log(quantity)

    // cart.items.map((item) => {
    //     if (item.product._id.toString() === productId) {
    //         return {
    //             ...item,
    //             quantity: quantity
    //         }
    //     } else {
    //         return item
    //     }
    // })



    const item = cart.items.find(
        (i) => i.product._id.toString() === productId
    )



    if (!item) {
        return res
            .status(404)
            .json(new ApiError(404, "Product not found in cart"))
    }
    if (quantity === 0) {
        cart.items = cart.items.filter(i => i.product._id.toString() !== productId)
    } else {
        item.quantity = quantity
    }


    await cart.save()
    // console.log(cart.items[0].quantity)


    await cart?.save()

    return res
        .status(200)
        .json(new ApiResponse("Successfully quantity changed", cart))
})