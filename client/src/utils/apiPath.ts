export const API_PATHS = {
    PRODUCTS: "/products",
    CART: {
        GET_CART: "/cart",
        ADD_TO_CART: (productId: string) => `/add-to-cart/${productId}`
    }
} as const;
