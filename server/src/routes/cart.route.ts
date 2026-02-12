import { Router } from "express";
import { addToCart, cartItemQuantityChange, getCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCart);
router.post("/add-to-cart/:productId", addToCart)
router.patch("/quantity-change/:productId", cartItemQuantityChange)

export default router;
