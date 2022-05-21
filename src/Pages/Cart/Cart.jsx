import React, { useEffect } from "react";
import sprite from "/sprite.svg";
import "./cart.scss";
import { useSelector } from "react-redux";

const Cart = () => {
  // fetch('https://fakestoreapi.com/products/1')
  //           .then(res=>res.json())
  //           .then(json=>console.log(json))

  const {
    productsInCart,
    pending: isLoading,
    error,
  } = useSelector((state) => state.cart);

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
      <p>My shopping bag</p>
      {productsInCart.map((eachProductInCart) => (
        <div className="each-product-in-cart-c" key={eachProductInCart.id}>
          <div>
            <img src={eachProductInCart.image} alt="" />
          </div>
          <div>
            <p>{eachProductInCart.title}</p>
            <span>${eachProductInCart.price}</span>
            <p className="each-product-in-cart-desc">
              {eachProductInCart.description}
            </p>
          </div>
          <div className="qty-and-delete-c">
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
            <div className="cart-delete-item-c">
              <svg
                className="all-svg-icons"
                // onClick={closeFilterPopupHandler}
              >
                <use href={sprite + "#close"} />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
