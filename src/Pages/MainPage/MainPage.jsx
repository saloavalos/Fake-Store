import { useState, useEffect } from "react";
import { Filter } from "/src/components/Filter/Filter";
import "./MainPage.scss";
import sprite from "/sprite.svg";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

export const MainPage = ({ screenWidth }) => {
  // to get data using redux
  // we destructure the whole state which name is "products"
  // I can rename the default names of the variables for example:
  // const { productsList: allProducts, pending, error } = useSelector(
  const {
    productsList,
    searchWord,
    pending: isLoading,
    error,
  } = useSelector((state) => state.products);
  // to trigger functions/actions from any reducer
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("All");

  useEffect(() => {
    // Fetch all products from api, to get the latest data
    fetchAllProducts(dispatch);

    // Cleanup
    return () => {
      // to fix that when the data fetched and store in filteredProducts it still
      // show the previous data for a second and then shows the new one
      setFilteredProducts([]);
    };
  }, [searchWord]);

  // We listen to any change of productsList , because at the beginning is empty
  useEffect(() => {
    // Skip filter and show them all
    if (searchWord === "all") {
      setFilteredProducts(productsList);
      return;
    }

    // This values below are the keys that I need from
    // the json that contains the info of all the products
    const keys = ["category", "title"];

    const filtered = productsList.filter((eachProduct) => {
      return keys.some((eachKey) =>
        eachProduct[eachKey].toLowerCase().includes(searchWord)
      );
      // I was using the method below but, using an array makes it more compact
      // return (
      //   eachProduct.category.includes(searchWord) ||
      //   eachProduct.title.toLowerCase().includes(searchWord)
      // );
    });

    setFilteredProducts(filtered);
    console.log(filtered);
    // return () => {
    //   // cleanup
    //   filtered = [...[]];
    // };
  }, [productsList]);

  useEffect(() => {
    // We could skip this second fetch and use a .filter() method
    // to get all categories from the array of all the products
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        // add default "All" category to categories
        setCategories(["all", ...json]);
      });
  }, []);

  useEffect(() => {
    isFilterActive
      ? document.body.classList.add("hide-scrollbar-on-mobile")
      : document.body.classList.remove("hide-scrollbar-on-mobile");
  }, [isFilterActive]);

  const showFilterHandler = () => {
    setIsFilterActive(!isFilterActive);
  };

  return (
    <div className="main-page-c">
      <div className="main-c__filter-and-products">
        <Filter
          screenWidth={screenWidth}
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
          categories={categories}
          setCategorySelected={setCategorySelected}
        />
        <div className="main-c__products-c">
          <div className="main-page-title-and-divisor-c">
            <div className="main-page-c__title-c">
              <h3 className="title-c__title">Our products</h3>
              {
                // If the we are in mobile or tablet we se Filter button on the right
                screenWidth < 920 ? (
                  <div className="title-c__filter-c">
                    <p>Filter</p>
                    <svg className="all-svg-icons" onClick={showFilterHandler}>
                      <use href={sprite + "#settings"} />
                    </svg>
                  </div>
                ) : (
                  ""
                )
              }
            </div>
            <div className="dividing-line"></div>
          </div>

          {!isLoading ? (
            filteredProducts.map((eachProduct) => (
              <div key={eachProduct.id} className="products-c__each-product-c">
                <Link to={`/products/${eachProduct.id}`}>
                  <div className="each-product-c__image-c">
                    <img src={eachProduct.image} alt="Product image" />
                  </div>
                </Link>
                <div className="each-product-c__main-text-c">
                  <p className="main-text-c__price">${eachProduct.price}</p>

                  <Link
                    className="main-text-c__title-link"
                    to={`/products/${eachProduct.id}`}
                  >
                    <p className="main-text-c__title">{eachProduct.title}</p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            // TODO - Add a more complex animation
            <div>Loading ...</div>
          )}
        </div>
      </div>
    </div>
  );
};
