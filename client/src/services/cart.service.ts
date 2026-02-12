import type { Cart } from "../types/cart";
import { API_PATHS } from "../utils/apiPath";
import api from '../utils/axiosInstance'
import type { ApiResponse } from "./product.service";

export const getCartApi = async (): Promise<ApiResponse<Cart>> => {
  const res = await api.get<ApiResponse<Cart>>(API_PATHS.CART.GET_CART);
  console.log(res.data.data)
  return res.data
}

export const addToCartApi = async (
  productId: string,
  quantity: number = 1
): Promise<ApiResponse<Cart>> => {
  const res = await api.post(
    API_PATHS.CART.ADD_TO_CART(productId),
    { quantity }
  )
  console.log(res.data)
  return res.data!
}

export const quantityChangeApi = async (
  productId: string,
  quantity: number,
): Promise<ApiResponse<Cart>> => {
  const res = await api.patch(
    API_PATHS.CART.QUANTITY_CHANGE(productId),
    { quantity }
  )
  console.log(res.data)

  return res.data
}

// const url = "http://localhost:5000/api/cart/add-to-cart"
