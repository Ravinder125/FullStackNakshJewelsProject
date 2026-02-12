export const API_PATHS = {
    PRODUCTS: "/products",
    CART: {
        GET_CART: "/cart",
        ADD_TO_CART: (productId: string) => `/cart/add-to-cart/${productId}`,
        QUANTITY_CHANGE: (productId: string) => `/cart/quantity-change/${productId}`
    }
} as const;
