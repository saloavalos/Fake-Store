import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productsInCart: [],
    pending: null,
    error: null,
  },
  reducers: {
    setAddToCartStart: (state) => {
      state.pending = true;
    },
    setAddToCartSuccess: (state, action) => {
      state.pending = false;
      // Check if product is already in bag
      if (
        state.productsInCart.some(
          (eachProductInCart) => eachProductInCart.id == action.payload.id
        )
      ) {
        console.log("This product is already in your bag");
        state.productsInCart.map((eachProduct, index) => {
          if (eachProduct.id === action.payload.id) {
            state.productsInCart[index] = {
              ...eachProduct,
              quantity: eachProduct.quantity + 1,
            };
          }
        });
      } else {
        console.log("New product in bag");
        state.productsInCart.push({ ...action.payload, quantity: 1 });
      }
    },
    setAddToCartError: (state) => {
      state.error = false;
      state.pending = false;
    },
  },
});

export const { setAddToCartStart, setAddToCartSuccess, setAddToCartError } =
  cartSlice.actions;

export default cartSlice.reducer;
