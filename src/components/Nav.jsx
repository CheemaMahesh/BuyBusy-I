import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faHouse } from "@fortawesome/free-solid-svg-icons";
import { useValue } from "../OrdersContex";
import { Link,Outlet } from "react-router-dom";
import styles from "./Nav.module.css"


function Nav(){
    const {cartCount,userSignOut}=useValue();

    return(
       <> <div className={styles.NaveBar}><div className={styles.nameDiv}>Busy Buy</div><div className={styles.NaveItems}><Link to="/"><FontAwesomeIcon icon={faHouse} />Home</Link><input placeholder=" search with name"/><Link to="/orders">My Orders</Link><Link to="/cart"><span><FontAwesomeIcon icon={faShoppingCart} />
       Cart</span><sup className={styles.count}>{cartCount}</sup></Link><div onClick={userSignOut}>Sign Out</div></div></div>
       <Outlet/>
       </>
    )
}
export default Nav;