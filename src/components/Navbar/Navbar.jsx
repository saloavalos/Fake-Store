import { useState, useEffect } from "react";
import "./navbar.scss";
// get whole sprite reference then we use the svg we need
import sprite from "/sprite.svg";

const Navbar = ({ screenWidth }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

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

  // enable and disbale scroll when the mobile menu is active
  useEffect(() => {
    showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showMenu]);

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

  return (
    // if we scroll down we add a shadow to navbar
    <nav className={isScrolledDown ? "navbar-shadow" : ""}>
      <div className="navbar-logo">
        <a href="/">
          <svg>
            <use href={sprite + "#logo"} />
          </svg>
        </a>
      </div>

      <div className="navbar-sections">
        <a href="/">
          <svg className="all-svg-icons">
            <use href={sprite + "#search"} />
          </svg>
        </a>
        <a href="/">
          <svg className="all-svg-icons">
            <use href={sprite + "#shopping-cart"} />
          </svg>
        </a>
      </div>

      {/* This mobile menu was not required so we comment it */}
      {/* <div className={`mobile-menu ${showMenu ? "mobile-menu--active" : ""}`}>
        <ul className="navbar-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div className="navbar-menu__item__active"></div> */}
      {/* Had to use this github library because with Hashrouter
               I cant use regular anchor tags to scroll to a section of the page */}
      {/* <HashLink onClick={handleBurguerClick} to={item.url}>
                {item.title}
              </HashLink>
            </li>
          ))}
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
  );
};

export default Navbar;
