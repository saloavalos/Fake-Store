import React, { useEffect, useState, useRef } from "react";
import sprite from "/sprite.svg";
import "./cart.scss";
import Button from "../../components/Buttons/Buttons";
import { useSelector } from "react-redux";
import {
  setIncrementCartProductQuantity,
  setDecrementCartProductQuantity,
  setDeleteProductFromCart,
} from "../../redux/slices/cartSlice";
import { setRestoreCartProducts } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import nothingInCartSvg from "/src/assets/cart-empty.svg";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

const Cart = () => {
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const imagesLoadedCounter = useRef(0);

  const {
    productsInCart,
    pending: isLoading,
    error,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // To change the URL
  let navigate = useNavigate();

  useEffect(() => {
    const products = localStorage.getItem("productsInCartBackup");
    if (products && !productsInCart) {
      console.log("restauro localstorage data");
      // set productsInCart
      dispatch(setRestoreCartProducts(products));
    }
  }, []);

  const handleImagesLoaded = () => {
    imagesLoadedCounter.current += 1;
    if (imagesLoadedCounter.current >= 1) {
      setTimeout(function () {
        setIsLoadingImages(false);
      }, 100);
    }
  };
  useEffect(() => {
    console.log("isLoadingImages value: " + isLoadingImages);
  }, [isLoadingImages]);

  const handleOrderSummaryDecision = (wantsToFinishOder) => {
    window.scrollTo({ top: 0 });
    if (wantsToFinishOder) {
      // redirect to checkout page
      // navigate("/checkout");
    } else {
      // redirect to products page
      navigate("/");
    }
  };

  return (
    <div className="cart-main-c">
      <p className="cart-main__title">My shopping bag</p>

      {/* {isLoading && (
        <div className="loading-c">
          <SyncLoader loading={isLoading} size={12} color={"#ff5b49"} />
        </div>
      )} */}

      {!productsInCart.length && !isLoading && (
        <div
          className="cart-empty-c"
          style={{
            visibility: isLoadingImages ? "hidden" : "visible",
          }}
        >
          <div className="cart-empty-c__img-c">
            <img
              src={nothingInCartSvg}
              alt="Empty cart"
              onLoad={handleImagesLoaded}
            />
          </div>
          <p className="cart-empty-text">Your cart is empty.</p>
        </div>
      )}

      {productsInCart.length > 0 && !isLoading && (
        <div className="products-and-summary-c">
          <div className="all-products-c">
            {productsInCart.map((eachProductInCart) => (
              <div
                className="each-product-in-cart-c"
                key={eachProductInCart.id}
              >
                <div className="each-product-in-cart-img-c">
                  <img src={eachProductInCart.image} alt="." />
                </div>
                <div className="each-product-in-cart-info-c">
                  <p>{eachProductInCart.title}</p>
                  <span className="main-text-c__price">
                    ${eachProductInCart.price}
                  </span>
                  <p className="each-product-in-cart-desc">
                    {eachProductInCart.description}
                  </p>
                </div>
                <div className="qty-and-delete-c">
                  <div className="product-details__qty-input-c">
                    <div
                      className="qty-input-c__reduce"
                      onClick={() =>
                        dispatch(
                          setDecrementCartProductQuantity(eachProductInCart.id)
                        )
                      }
                    >
                      <svg className="all-svg-icons">
                        <use href={sprite + "#collapse"} />
                      </svg>
                    </div>
                    <div className="qty-input-c__qty">
                      {eachProductInCart.quantity}
                    </div>
                    <div
                      className="qty-input-c__increase"
                      onClick={() =>
                        dispatch(
                          setIncrementCartProductQuantity(eachProductInCart.id)
                        )
                      }
                    >
                      <svg className="all-svg-icons">
                        <use href={sprite + "#plus"} />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="cart-delete-item-c"
                    onClick={() =>
                      dispatch(setDeleteProductFromCart(eachProductInCart.id))
                    }
                  >
                    <svg className="all-svg-icons">
                      <use href={sprite + "#close"} />
                    </svg>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="order-summary-c">
            <div className="order-summary-products-amount-c">
              <p>Order summary</p>
              <span>1 article in my bag</span>
            </div>
            <div className="order-summary__total-c">
              <p>TOTAL</p>
              <p>$349.00</p>
            </div>
            <hr />
            <div className="order-summary__btns-c">
              <Button
                text={"Finish order"}
                onClick={() => handleOrderSummaryDecision(true)}
              />
              <Button
                text={"Keep buying"}
                onClick={() => handleOrderSummaryDecision()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
