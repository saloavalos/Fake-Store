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
import { useDispatch } from "react-redux";
import nothingInCartSvg from "/src/assets/cart-empty.svg";
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

  useEffect(() => {
    if (productsInCart.length > 0) {
      localStorage.setItem(
        "productsInCartBackup",
        JSON.stringify(productsInCart)
      );
    }
  }, [productsInCart]);

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

  return (
    <div className="cart-main-c">
      <p className="cart-main__title">My shopping bag</p>
<<<<<<< HEAD
      <div className="cart-main__products-and-order-summary-c">
        <div className="products-in-cart-c">
          {productsInCart.map((eachProductInCart) => (
            <div className="each-product-in-cart-c" key={eachProductInCart.id}>
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
          <div>
            <p>Oder summary</p>
            <span>1 item(s) in my bag</span>
          </div>
          <div className="subtotal-c">
            <span>Subtotal</span>
            <span>USD $560.00</span>
          </div>
          <hr className="divisor-line-order-summary" />
          <div className="order-summary__btns-c">
            <Button text="Checkout" />
            <Button text="Keep buying" />
          </div>
        </div>
      </div>
=======

      {isLoadingImages && (
        <div className="loading-c">
          <SyncLoader loading={isLoadingImages} size={12} color={"#ff5b49"} />
        </div>
      )}
      {!productsInCart.length && (
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

      {productsInCart.length && isLoading ? (
        <div className="flex justify-center items-center h-[65vh]">
          <SyncLoader loading={isLoading} size={12} color={"#ff5b49"} />
        </div>
      ) : (
        productsInCart.map((eachProductInCart) => (
          <div className="each-product-in-cart-c" key={eachProductInCart.id}>
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
        ))
      )}
>>>>>>> b23e6e75ebc2dd4f237d944028ed1fc25018d711
    </div>
  );
};

export default Cart;
