import { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import "./navbar.scss";
// get whole sprite reference then we use the svg we need
import sprite from "/sprite.svg";
import { Link } from "react-router-dom";

const Navbar = ({ screenWidth }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  // To check whether the user scrolls the page
  useEffect(() => {
    const onScrollDown = () => {
      if (window.scrollY > 0) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };
    // add onScroll listener
    window.addEventListener("scroll", onScrollDown);

    // clean usEffect and remove listeners
    return () => {
      window.removeEventListener("scroll", onScrollDown);
    };
  }, []);

  // when the search bar is active
  useEffect(() => {
    showMenu || isSearchBarActive
      ? document.body.classList.add("hide-scrollbar-on-mobile")
      : document.body.classList.remove("hide-scrollbar-on-mobile");
  }, [showMenu, isSearchBarActive]);

  // If the width of the page is >= 992px then it means we are in a laptop or a wider screen
  // and if the mobile menu was active we should hide it automatically
  useEffect(() => {
    if (screenWidth >= 992 ?? showMenu) {
      setShowMenu(false);
    }
  }, [screenWidth]);

  // Show or hide mobile menu
  const handleBurguerClick = () => {
    // toggle boolean
    setShowMenu(!showMenu);
  };

  const showSearcBarHandler = () => {
    setIsSearchBarActive(!isSearchBarActive);
  };

  return (
    <>
      {/* // if we scroll down we add a shadow to navbar */}
      <nav className={isScrolledDown ? "navbar-shadow" : ""}>
        <div className="navbar-logo-and-sections-c">
          <div className="navbar-logo">
            <Link to="/">
              <svg>
                <use href={sprite + "#logo"} />
              </svg>
            </Link>
          </div>

          <div className="navbar-sections">
            {/* TODO - might look good if I change color of svg when the search bar is active */}
            <svg className="all-svg-icons" onClick={showSearcBarHandler}>
              <use href={sprite + "#search"} />
            </svg>
            <a href="/">
              <svg className="all-svg-icons">
                <use href={sprite + "#shopping-cart"} />
              </svg>
            </a>
          </div>
        </div>

        {/* This mobile menu was not required in this project so we comment it */}
        {/* <div className={`mobile-menu ${showMenu ? "mobile-menu--active" : ""}`}>
          <ul className="navbar-menu">
            <li>
              <div className="navbar-menu__item__active"></div>
              <a onClick={handleBurguerClick}>dfdfdf</a>
            </li>
          </ul>
        </div> */}

        <div className="navbar__burger-menu" onClick={handleBurguerClick}>
          <div
            className={`burguer-menu__all-lines burger-menu__short-line ${
              showMenu ? "burger-menu__short-line--x" : ""
            }`}
          ></div>
          <div
            className={`burguer-menu__all-lines burger-menu__long-line ${
              showMenu ? "burger-menu__long-line--x" : ""
            }`}
          ></div>
          <div
            className={`burguer-menu__all-lines burger-menu__median-line ${
              showMenu ? "burger-menu__median-line--x" : ""
            }`}
          ></div>
        </div>

        <div
          className={`dim ${showMenu ? "dim--active" : ""}`}
          onClick={handleBurguerClick}
        ></div>

        {/* The location of this tag most of the times doesn't matter */}
        {/* <Toaster /> */}
      </nav>
      <SearchBar
        isSearchBarActive={isSearchBarActive}
        setIsSearchBarActive={setIsSearchBarActive}
      />
    </>
  );
};

export default Navbar;
