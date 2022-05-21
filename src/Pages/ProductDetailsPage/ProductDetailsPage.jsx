import { useState, useEffect } from "react";
import "./productDetailsPage.scss";
import Button from "../../components/Buttons/Buttons";
import sprite from "/sprite.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAndAddToCart } from "../../redux/apiCalls";

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // To get passed value in the URL from the previous page
  // the name of the variable has to correspond
  // to the one defined in <Route path="/etc/:variable"
  let { productID } = useParams();

  const dispatch = useDispatch();

  // Using the name of the product we get the rest of the info of the product
  const fetProductDetails = async () => {
    const data = await fetch(`https://fakestoreapi.com/products/${productID}`);

    const product = await data.json();

    setProduct(product);
    setIsLoading(false);
  };

  useEffect(() => {
    fetProductDetails();
    // cleanup
    // return () => {
    // };
  }, []);

  useEffect(() => {
    // Reset scroll position on change of Routes
    window.scrollTo(0, 0);
  }, [product]);

  // To change the URL
  let navigate = useNavigate();

  const handleAddToCart = () => {
    fetchAndAddToCart(dispatch, productID);
    navigate("/cart");
  };

  return (
    <div className="product-details-page-c">
      {isLoading ? (
        <div className="products-details-c skeleton">
          <div className="skeleton-products-details-c__image-c"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text m"></div>

          <div className="skeleton-text sm"></div>
          <div className="skeleton-text m inline"></div>
          <div className="skeleton-text sm inline"></div>
          <div className="skeleton-paragraph-c">
            <div className="skeleton-text m"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text l"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text l"></div>
          </div>
        </div>
      ) : (
        <div className="products-details-c">
          <div className="product-details-c__image-and-main-details-c">
            <div className="products-details-c__image-c">
              <img src={product.image} alt="" />
            </div>
            <div className="product-details-main-info-c">
              <p className="product-details-title">{product.title}</p>
              {/* make the first letter of a string uppercase */}
              <p className="product-details-category">
                Category: {product.category}
              </p>
              <div className="product-details-ratings-c">
                <div className="products-details-ratings__stars-c">
                  <svg
                    className="all-svg-icons"
                    // onClick={}
                  >
                    <use href={sprite + "#star"} />
                  </svg>
                  <span>{product.rating?.rate}</span>
                </div>
                <a href="">({product.rating?.count} ratings)</a>
              </div>
              <p className="product-details__price">${product.price}</p>
              <div className="product-details__qty-add-to-cart-c">
                <p className="product-details__qty-text">QTY:</p>
                <div className="product-details__qty-input-add-to-cart-btn-c">
                  <div className="product-details__qty-input-c">
                    <div className="qty-input-c__reduce">
                      <svg
                        className="all-svg-icons"
                        // onClick={}
                      >
                        <use href={sprite + "#collapse"} />
                      </svg>
                    </div>
                    <div className="qty-input-c__qty">1</div>
                    <div className="qty-input-c__increase">
                      <svg
                        className="all-svg-icons"
                        // onClick={}
                      >
                        <use href={sprite + "#plus"} />
                      </svg>
                    </div>
                  </div>
                  <Button
                    text={"Add to cart"}
                    icon={"shopping-bag"}
                    color={"white"}
                    onClick={handleAddToCart}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__desc-c">
            <p className="product-details__desc-title">Description</p>
            <p className="product-details__desc-desc">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
