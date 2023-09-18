import React from "react";
import { useValue } from "../../OrdersContex";
import styles from "./Cart.module.css"

const Cart = () => {
  const { cartItemList,email,subTotal,removeBlog,buyNow } = useValue();

  return (
    <>
     {cartItemList ? (
      
      <div className={styles.cartHead}><div className={styles.cartHome}>
      
      {/* ============================================================maping the cart items=========================================================*/}
      {cartItemList.map((item,i) => (
        <div key={i} className={styles.cartContainer}>
          <h3>{item.title} </h3>
          <img src={item.url} className={styles.cartImgs} alt="m"/>
          <h5>&#8377; {item.price}</h5>
          <div><div><b><i>Quantity</i> {item.quantity}</b></div><button className={styles.remove} onClick={()=>{removeBlog(item.pId)}}>Remove</button></div>
        </div>
       ))}
      </div>
      <div className={styles.rightBox}>
      <h1 className={styles.boxTitle}>Box {email}</h1>
      <hr />
      <h1 className={styles.subtotal}>Subtotal &#8377;{subTotal}</h1>
      <button className={styles.buyButton} onClick={()=>{buyNow(cartItemList,subTotal)}}>Buy Now</button>
    </div>
      </div>
     ) : (
       <h1>No item in cart</h1>
     )}
    </>
  );
};

export default Cart;
