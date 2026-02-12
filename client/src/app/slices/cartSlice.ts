import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartApi, addToCartApi } from "../../services/cart.service";
import type { CartItem } from "../../types/cart";

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
};

// GET cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const res = await getCartApi();

    const data = res.data;

    if (!data || !Array.isArray(data.items)) {
      return [];
    }

    return data.items
  }
);


// ADD to cart (FIXED)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    payload: { productId: string; quantity: number },
    { dispatch }
  ) => {
    const { productId, quantity } = payload;

    await addToCartApi(productId, quantity);

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
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("PAYLOAD TYPE:", typeof action.payload);
        console.log("IS ARRAY:", Array.isArray(action.payload));
        console.log("PAYLOAD:", action.payload);

        state.items = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default cartSlice.reducer;
