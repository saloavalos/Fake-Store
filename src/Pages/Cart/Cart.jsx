import React from "react";

const Cart = () => {
  return (
    <div>
      <p>My shopping bag</p>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>Pantalon</p>
          <span>$666</span>
          <p>Color: </p> <p>Black/White</p>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
