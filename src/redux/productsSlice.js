import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  // this is the data that is loaded in the first render
  initialState: {
    productsList: [],
    pending: null,
    error: null,
  },
  // inside here are all the function to get - update - remove
  reducers: {
    setAllProductsStart: (state) => {
      state.pending = true;
    },
    setAllProductsSuccess: (state, action) => {
      state.pending = false;
      // action.payload is the new data we will pass to a specific property of the state
      // if I specifiy a property of the state that doesn't exist it will be created and added to the state with is corresponding data
      state.productsList = action.payload;
    },
    setAllProductsError: (state) => {
      state.error = false;
      state.pending = false;
    },
    setFilteredProducts: (state) => (state = {}),
  },
});

export const {
  setAllProductsStart,
  setAllProductsSuccess,
  setAllProductsError,
  setFilteredProducts,
} = productsSlice.actions;

// Export it to use it in store.js
export default productsSlice.reducer;
