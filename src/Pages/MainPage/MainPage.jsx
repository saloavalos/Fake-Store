import { useState, useEffect } from "react";
import { FilterMobile } from "/src/components/Filter/Filter";
import "./MainPage.scss";
import sprite from "/sprite.svg";
import { FilterDesktop } from "../../components/Filter/Filter";

export const MainPage = ({ screenWidth }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // We keep a original copy of all the products to use when the selected category is "All"
        setProducts(json);
        // and this filtered copy is used when we want to display products from any other category but "All"
        setFilteredProducts(json);
      });

    // We could avoid skip this second fetch and use a .filter() method
    // to get all categories from the array of all the products
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        // add default "All" category to categories
        setCategories(["All", ...json]);
      });
  }, []);

  useEffect(() => {
    // if(screenWidth >= 920) {

    // }

    // enable/disbale scroll when the filter popup is active
    isFilterActive
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [isFilterActive]);

  const showFilterHandler = () => {
    setIsFilterActive(!isFilterActive);
  };

  return (
    <>
      {/* the popup needs to be here to start its position from top left corner */}
      {/* {isFilterActive ? ( */}
      <FilterMobile
        isFilterActive={isFilterActive}
        setIsFilterActive={setIsFilterActive}
        categories={categories}
        setCategorySelected={setCategorySelected}
        categorySelected={categorySelected}
        setFilteredProducts={setFilteredProducts}
        products={products}
      />
      {/* ) : (
        ""
      )} */}
      <div className="main-page-c">
        {screenWidth >= 920 ? <FilterDesktop /> : ""}

        <div className="main-page-c__main-c">
          <div className="main-c__title-c">
            <h3 className="title-c__title">Our products</h3>

            <div className="title-c__filter-c">
              <p>Filter</p>
              <svg className="all-svg-icons" onClick={showFilterHandler}>
                <use href={sprite + "#settings"} />
              </svg>
            </div>
          </div>

          <div className="dividing-line"></div>
          <div className="main-c__products-c">
            {filteredProducts.map((eachProduct, index) => (
              <div key={eachProduct.id} className="products-c__each-product-c">
                <div className="each-product-c__image-c">
                  <a href="">
                    <img src={eachProduct.image} alt="Product image" />
                  </a>
                </div>
                <div className="each-product-c__main-text-c">
                  <p className="main-text-c__price">${eachProduct.price}</p>
                  <a className="main-text-c__title-link" href="">
                    <p className="main-text-c__title">{eachProduct.title}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
