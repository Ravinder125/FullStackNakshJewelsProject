import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCartApi, addToCartApi } from '../../services/cart.service';
import type { CartItem } from '../../types/cart';


interface CartState {
    items: CartItem[];
    loading: boolean;
}

const initialState: CartState = {
    items: [],
    loading: false,
}

// GET cart
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async () => {
        const res = await getCartApi()
        return res.data!.items
    }
)

// ADD to cart 
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productId: string, { dispatch }) => {
        await addToCartApi(productId)

        // Refresh cart after add
        dispatch(fetchCart());
    }

);

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false
            })
            .addCase(fetchCart.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default cartSlice.reducer;