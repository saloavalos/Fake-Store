import { useState, useEffect } from "react";
import { CloseButton } from "../Buttons/Buttons";
import sprite from "/sprite.svg";
import "./searchBar.scss";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSearchWord } from "../../redux/productsSlice";

export const SearchBar = ({ isSearchBarActive, setIsSearchBarActive }) => {
  // state that I will pass to the global state onClick to search
  const [searchWordLocal, setSearchWordLocal] = useState("");

  const handleHideSearchBar = () => {
    setIsSearchBarActive(false);
  };

  const {
    productsList,
    pending: isLoading,
    error,
  } = useSelector((state) => state.products);
  // to trigger functions/actions from any reducer
  const dispatch = useDispatch();

  const handleGetSearchWord = (event) => {
    // we get the values typed in the input
    setSearchWordLocal(event.target.value);
  };

  // I have an useEffect that in MainPage to listen to any update
  // of the global state "searchWord"
  const handleSearchProducts = () => {
    // In a normal website I should Redirect to Resulst page,
    // where I filter the products and show them.
    // but in this project I was asked to use "Main page" as if it was a "Results page"

    if (searchWordLocal.length <= 0) {
      alert("Campo de busqueda vacio");
      return;
    }

    // Update global state "searchWord" and
    // Convert string to lower case to be able to later filtered products easier unsig the .inludes()
    dispatch(setSearchWord(searchWordLocal.toLowerCase()));

    handleHideSearchBar();
  };

  return (
    <div
      className={`search-bar-c ${isSearchBarActive ? "search-bar-active" : ""}`}
      // onClick={handleHideSearchBar}
    >
      <div className="dim-search-bar" onClick={handleHideSearchBar}></div>
      <div className="search-bar-input-and-close-c">
        <div className="search-bar-input-c">
          <input
            placeholder="Search"
            type="text"
            onChange={handleGetSearchWord}
          />
          <svg className="all-svg-icons" onClick={handleSearchProducts}>
            <use href={sprite + "#search"} />
          </svg>
        </div>
        <CloseButton onClick={handleHideSearchBar} />
      </div>
    </div>
  );
};
