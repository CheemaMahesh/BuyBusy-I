import React from "react";
import { useValue } from "../../OrdersContex";

const Cart = () => {
  const { cartItems } = useValue();

  return (
    <>
     {cartItems ? (
       cartItems.map((item,i) => (
        <div key={i}>
          <h2>{item.ids}</h2>
        </div>
       ))
     ) : (
       <h1>No item in cart</h1>
     )}
    </>
  );
};

export default Cart;
