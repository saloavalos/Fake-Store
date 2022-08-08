import axios from "axios";
import {
  setAllProductsStart,
  setAllProductsSuccess,
  setAllProductsError,
} from "./slices/productsSlice";
import {
  setAddToCartStart,
  setAddToCartSuccess,
  setAddToCartError,
} from "./slices/cartSlice";

export const fetchAllProducts = async (dispatch) => {
  // We start to fetch the data, this function below only sets loading state to true
  // we need dispatch() to trigger the function
  dispatch(setAllProductsStart());
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    // if it was successfully fetched the data we pass it to the global state
    dispatch(setAllProductsSuccess(response.data));
  } catch (error) {
    dispatch(setAllProductsError());
  }
};

export const fetchAndAddToCart = async (dispatch, id) => {
  dispatch(setAddToCartStart());
  try {
    const response = await axios.get("https://fakestoreapi.com/products/" + id);
    if (response.data) {
      console.log("Success retrieving product");
      dispatch(setAddToCartSuccess(response.data));
    } else {
      console.log("Could not retrieve product");
      dispatch(setAddToCartError);
    }
    return {
      data: response.data,
      canContinue: Boolean(response.data),
    };
  } catch (error) {
    console.error(error);
    dispatch(setAddToCartError());
    return {
      data: null,
      canContinue: false,
    };
  }
};
