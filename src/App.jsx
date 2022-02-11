import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { MainPage } from "./Pages/MainPage/MainPage";

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
    <div>
      <Navbar screenWidth={screenWidth} />
      <MainPage />
      {/* TODO - add footer */}
    </div>
  );
}

export default App;
