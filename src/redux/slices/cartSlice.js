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
    setRestoreCartProducts: (state, action) => {
      state.productsInCart = action.payload;
    },
    setIncrementCartProductQuantity: (state, { payload: id }) => {
      state.productsInCart.map((eachProduct, index) => {
        if (eachProduct.id === id) {
          state.productsInCart[index] = {
            ...eachProduct,
            quantity: eachProduct.quantity + 1,
          };
        }
      });
    },
    setDecrementCartProductQuantity: (state, { payload: id }) => {
      state.productsInCart.map((eachProduct, index) => {
        if (eachProduct.id === id && eachProduct.quantity > 1) {
          state.productsInCart[index] = {
            ...eachProduct,
            quantity: eachProduct.quantity - 1,
          };
        }
      });
    },
    setDeleteProductFromCart: (state, { payload: id }) => {
      state.productsInCart = state.productsInCart.filter((eachProduct) => {
        if (eachProduct.id !== id) {
          return eachProduct;
        }
      });
    },
  },
});

export const {
  setAddToCartStart,
  setAddToCartSuccess,
  setAddToCartError,
  setRestoreCartProducts,
  setIncrementCartProductQuantity,
  setDecrementCartProductQuantity,
  setDeleteProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
