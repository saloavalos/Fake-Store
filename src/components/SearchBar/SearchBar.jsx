import { useState } from "react";
import { CloseButton } from "../Buttons/Buttons";
import sprite from "/sprite.svg";
import "./searchBar.scss";

export const SearchBar = ({ isSearchBarActive, setIsSearchBarActive }) => {
  const hideSearchBarHandler = () => {
    setIsSearchBarActive(false);
  };

  return (
    <div
      className={`search-bar-c ${isSearchBarActive ? "search-bar-active" : ""}`}
      // onClick={hideSearchBarHandler}
    >
      <div className="dim-search-bar" onClick={hideSearchBarHandler}></div>
      <div className="search-bar-input-and-close-c">
        <div className="search-bar-input-c">
          <input placeholder="Search" type="text" />
          <svg className="all-svg-icons">
            <use href={sprite + "#search"} />
          </svg>
        </div>
        <CloseButton onClick={hideSearchBarHandler} />
      </div>
    </div>
  );
};
