import type { Product } from '../types/product'
import { API_PATHS } from '../utils/apiPath'
import api from '../utils/axiosInstance'


export interface ApiResponse<T> {
    message: string,
    data?: T
}

export const getProductsApi = async (): Promise<ApiResponse<Product[]>> => {
    const res = await api.get<ApiResponse<Product[]>>(API_PATHS.PRODUCTS);
    return res.data
}

// export const getProductsApi = async () => {
//     const res = await api.get(API_PATHS.PRODUCTS)
//     console.log(res)
//     return res.data
// }