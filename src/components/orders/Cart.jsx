import React from "react";
import { useValue } from "../../OrdersContex";
import styles from "./Cart.module.css"
// import { useValue } from "../../OrdersContex";

const Cart = () => {
  const { cartItemList,gTotal } = useValue();

  return (
    <>
     {cartItemList ? (
      
      <div className={styles.cartHead}><div className={styles.cartHome}>
      
      {cartItemList.map((item,i) => (
        <div key={i} className={styles.cartContainer}>
          <h3>{item.title} ==={item.quantity}</h3>
          <img src={item.url} className={styles.cartImgs} alt="m"/>
          <h5>&#8377; {item.quantity*item.price}</h5>
          <div><button>Buy Now &#8377;{item.total}</button><button className={styles.remove}>Remove</button></div>
        </div>
       ))}
      </div>
      <div className={styles.rightBox}>Box {gTotal} </div>
      </div>
     ) : (
       <h1>No item in cart</h1>
     )}
    </>
  );
};

export default Cart;
