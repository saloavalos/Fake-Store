import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";
import { Error404Page } from "./Pages/Error404Page/Error404Page";
import { ProductDetailsPage } from "./Pages/ProductDetailsPage/ProductDetailsPage";
import Cart from "./Pages/Cart/Cart";

function App() {
  // I will pass this value to the navbar to hide or show mobile menu
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // To get screen width when we reload the page or it´s the first time we open the website
    setScreenWidth(window.innerWidth);

    const onResize = () => {
      setScreenWidth(window.innerWidth);
    };
    // add onRsize listener
    window.addEventListener("resize", onResize);

    // clean useEffect and remove listeners
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Navbar screenWidth={screenWidth} />
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
          path="/products/:productName"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>

      {/* TODO - add footer */}
    </>
  );
}

export default App;
