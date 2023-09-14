import React from "react";
import { useValue } from "../../OrdersContex";

const Cart = () => {
  const { cartItems } = useValue();

  return (
    <>
     {cartItems ? (
       cartItems.map((item) => (
         <h1 key={item}>{item}</h1>
       ))
     ) : (
       <h1>No item in cart</h1>
     )}
    </>
  );
};

export default Cart;
