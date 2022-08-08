import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";
import { Error404Page } from "./Pages/Error404Page/Error404Page";
import { ProductDetailsPage } from "./Pages/ProductDetailsPage/ProductDetailsPage";
import Cart from "./Pages/Cart/Cart";
import "./app.scss";
import { setRestoreCartProducts } from "./redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  // I will pass this value to the navbar to hide or show mobile menu
  const [screenWidth, setScreenWidth] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // To get screen width when we reload the page or it´s the first time we open the website
    setScreenWidth(window.innerWidth);

    const onResize = () => {
      setScreenWidth(window.innerWidth);
    };
    // add onResize listener
    window.addEventListener("resize", onResize);

    if (localStorage.getItem("productsInCartBackup")) {
      const dataRecovered = JSON.parse(
        localStorage.getItem("productsInCartBackup")
      );
      dispatch(setRestoreCartProducts(dataRecovered));
    }

    // clean useEffect and remove listeners
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const {
    productsInCart,
    pending: isLoading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productsInCart) {
      localStorage.setItem(
        "productsInCartBackup",
        JSON.stringify(productsInCart)
      );
    }
  }, [productsInCart]);

  return (
    <>
      <Navbar screenWidth={screenWidth} />
      <div className="main-container-all-pages">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPage screenWidth={screenWidth} />
              </>
            }
          />
          <Route
            //:name can be named anyway, but later using params
            // has to correspond the name of the variable
            path="/products/:productID"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </div>
      {/* TODO - add footer */}
    </>
  );
}

export default App;
