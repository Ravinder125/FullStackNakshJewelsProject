import type { Cart } from "../types/cart";
import { API_PATHS } from "../utils/apiPath";
import api from '../utils/axiosInstance'
import type { ApiResponse } from "./product.service";

export const getCartApi = async (): Promise<ApiResponse<Cart>> => {
    const res = await api.get<ApiResponse<Cart>>(API_PATHS.CART.GET_CART);
    return res.data
}

export const addToCartApi = async (productId: string): Promise<ApiResponse<undefined>> => {
    const res = await api.get(API_PATHS.CART.ADD_TO_CART(productId))
    return res.data
} 