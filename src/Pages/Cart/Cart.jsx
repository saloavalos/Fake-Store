import React, { useEffect } from "react";
import sprite from "/sprite.svg";
import "./cart.scss";
import { useSelector } from "react-redux";
import {
  setIncrementCartProductQuantity,
  setDecrementCartProductQuantity,
  setDeleteProductFromCart,
} from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
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

  return (
    <div className="cart-main-c">
      <p className="cart-main__title">My shopping bag</p>
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
  );
};

export default Cart;
