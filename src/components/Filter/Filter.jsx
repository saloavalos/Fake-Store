import { useEffect } from "react";
import "./filter.scss";
import sprite from "/sprite.svg";

export function FilterMobile({
  setIsFilterActive,
  isFilterActive,
  setFilteredProducts,
  categories,
  products,
  categorySelected,
  setCategorySelected,
}) {
  const closeFilterPopupHandler = () => {
    setIsFilterActive(false);
  };

  const resetFiltersHandler = () => {
    setCategorySelected(categories[0]);
    setFilteredProducts(products);
    closeFilterPopupHandler();
  };

  useEffect(() => {
    if (categorySelected === "All") {
      setFilteredProducts(products);
      return;
    }

    // We loop through all the products and store it in this array the products that match
    const filtered = products.filter(
      (eachProduct) => eachProduct.category.includes(categorySelected) // I have to ommit {} else it won't return anything
    );
    setFilteredProducts(filtered);
  }, [categorySelected]);

  return (
    <div
      className={`filter-mobile-c ${
        isFilterActive ? "filter-mobile-active" : ""
      }`}
    >
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
                categorySelected === eachCategory ? "category-selected" : ""
              }`}
              onClick={() => [
                setCategorySelected(eachCategory),
                closeFilterPopupHandler(),
              ]}
            >
              {eachCategory}
            </div>
          ))}
        </div>
      </div>

      <div className="dividing-line"></div>
      <a className="closeButtonSecondary" onClick={closeFilterPopupHandler}>
        <svg className="all-svg-icons close-icon">
          <use href={sprite + "#close"} />
        </svg>
      </a>
    </div>
  );
}

export function FilterDesktop() {
  return (
    <div className="main-page-c__filters-c">
      <div className="filters-c__header-c">
        <div className="header-c__title">
          <p>Filters</p>
          <span>reset icon</span>
        </div>

        <a className="closeButtonPrimary" href="">
          X
        </a>
      </div>

      {/* TODO - egnerate each filter with map */}
      <div className="filters-c__each-filter-c">
        <div className="each-filter-c__title">
          <p>Categories</p>
          <span>Collapse icon</span>
        </div>
        <hr />
        <div className="each-filter-c__categories-c">
          {/* TODO - generate each actegory with map*/}
          <div className="categories-c__each-category-c">
            <p>frfrf</p>
          </div>
        </div>
      </div>

      <hr />
      <a className="closeButtonSecondary" href=""></a>
    </div>
  );
}
