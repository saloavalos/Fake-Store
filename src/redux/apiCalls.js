import axios from "axios";
import {
  setAllProductsStart,
  setAllProductsSuccess,
  setAllProductsError,
} from "./productsSlice";

//
export const fetchAllProducts = async (dispatch) => {
  // We start to fetch the data, this function below only sets loading state to true
  // we need dispatch() to trigger the function
  dispatch(setAllProductsStart());
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    // if it was succesfully fetched the data we pass it to the global state
    dispatch(setAllProductsSuccess(response.data));
  } catch (error) {
    dispatch(setAllProductsError);
  }
};
