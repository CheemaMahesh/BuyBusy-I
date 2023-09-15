import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faHouse } from "@fortawesome/free-solid-svg-icons";
import { useValue } from "../OrdersContex";
import { NavLink,Outlet } from "react-router-dom";
import styles from "./Nav.module.css"


function Nav(){
    const {cartCount,userSignOut}=useValue();

    return(
       <> <div className={styles.NaveBar}><div className={styles.nameDiv}>Busy Buy</div><div className={styles.NaveItems}><NavLink to="/" className={styles.navs} style={({ isActive }) =>
       isActive
         ? {
             color: "#014421",
           }
         : {}
     }><FontAwesomeIcon icon={faHouse} />Home</NavLink><input placeholder=" search with name"/><NavLink to="/orders" className={styles.navs} style={({ isActive }) =>
     isActive
       ? {
           color: "green",
         }
       : {}
   }>My Orders</NavLink><NavLink to="/cart" className={styles.navs} style={({ isActive }) =>
   isActive
     ? {
         color: "green",
       }
     : {}
 }><span><FontAwesomeIcon icon={faShoppingCart} />
       Cart</span><sup className={styles.count}>{cartCount}</sup></NavLink><div onClick={userSignOut}>Sign Out</div></div></div>
       <Outlet/>
       </>
    )
}
export default Nav;