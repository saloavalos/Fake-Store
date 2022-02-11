import { useState, useEffect } from "react";
import "./MainPage.scss";

export const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      });
  }, []);

  return (
    <div className="main-page-c">
      {/* TODO - check if I can do import {categories, categoriesPopup} and switch */}
      <div className="main-page-c__filters-c">
        <div className="filters-c__header-c">
          <div className="header-c__title">
            <p>Filters</p>
            <span>reset icon</span>
          </div>

          <a className="closeButton" href="">
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
              <input type="checkbox" name="" id="" />
              <p>Name of category</p>
            </div>
          </div>
        </div>

        <hr />
        <a className="closeButtonSecondary" href=""></a>
      </div>

      <div className="main-page-c__main-c">
        <h3 className="products-c__title">Our products</h3>
        <hr />
        <div className="main-c__products-c">
          {/* TODO - generate products with map */}
          {products.map((eachProduct, index) => (
            <div key={eachProduct.id} className="products-c__each-product-c">
              <div className="each-product-c__image-c">
                <a href="">
                  <img src={eachProduct.image} alt="Product image" />
                </a>
              </div>
              <div className="each-product-c__main-text-c">
                <p>${eachProduct.price}</p>
                <a href="">
                  <p>{eachProduct.title}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
