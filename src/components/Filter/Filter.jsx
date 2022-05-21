import { useEffect } from "react";
import { CloseButton } from "../Buttons/Buttons";
import "./filter.scss";
import sprite from "/sprite.svg";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSearchWord } from "../../redux/slices/productsSlice";

export const Filter = ({
  screenWidth,
  isFilterActive,
  setIsFilterActive,
  categories,
  setCategorySelected,
}) => {
  const {
    searchWord,
    pending: isLoading,
    error,
  } = useSelector((state) => state.products);
  // to trigger functions/actions from any reducer
  const dispatch = useDispatch();

  const closeFilterPopupHandler = () => {
    setIsFilterActive(false);
  };

  const resetFiltersHandler = () => {
    setCategorySelected(categories[0]);
    // reset global state "searchWord" to default
    dispatch(setSearchWord("all"));
    closeFilterPopupHandler();
  };

  // I have an useEffect that in MainPage to listen to any update
  // of the global state "searchWord"
  const handleSearchProducts = (category) => {
    // In a normal website I should Redirect to Resulst page,
    // where I filter the products and show them.
    // but in this project I was asked to use "Main page" as if it was a "Results page"

    // Update global state "searchWord"
    dispatch(setSearchWord(category));
  };

  return (
    <div
      // We use different classes depending the screeWidth in order to
      // place in different locations the filter
      className={`${screenWidth < 920 ? "filter-mobile-c" : "filter-desktop-c"}
            ${
              // If we don't longer need the mobile filter and in case it's active
              // we hide it removing the class that makes it visible
              screenWidth < 920 && isFilterActive ? "filter-mobile-active" : ""
            }`}
    >
      {/* <div
      className={`filter-mobile-c
      ${isFilterActive ? "filter-mobile-active" : ""
      }`}
    > */}
      <div className="filter-mobile-c__header-c">
        <div className="header-c__title-c">
          <p>Filters</p>
          <svg className="all-svg-icons" onClick={resetFiltersHandler}>
            <use href={sprite + "#refresh"} />
          </svg>
        </div>

        <svg
          className="all-svg-icons close-icon"
          onClick={closeFilterPopupHandler}
        >
          <use href={sprite + "#close"} />
        </svg>
      </div>

      <div className="filter-mobile-c__each-filter-c">
        <div className="each-filter-c__title">
          <p>Category</p>
          {/* FIXME - hide for now because this feature was not important */}
          {/* <svg className="all-svg-icons" onClick={"showFilterHandler"}>
            <use href={sprite + "#collapse"} />
          </svg> */}
        </div>
        <div className="dividing-line"></div>
        <div className="each-filter-c__categories-c">
          {categories.map((eachCategory) => (
            // If category to render is the one that is currently selected
            // add a class to indentify which category is selected
            <div
              key={eachCategory}
              // Add css class if this category is selected
              className={`categories-c__each-category-c ${
                searchWord === eachCategory ? "category-selected" : ""
              }`}
              onClick={() => [
                handleSearchProducts(eachCategory),
                closeFilterPopupHandler(),
              ]}
            >
              {eachCategory}
            </div>
          ))}
        </div>
      </div>

      <div className="dividing-line"></div>

      {
        // it only needs to be visible when we show a mobile popup filter
        screenWidth < 920 && <CloseButton onClick={closeFilterPopupHandler} />
      }
    </div>
  );
};
