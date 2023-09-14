import React, { useState, useEffect } from "react";
import { db2 } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./Home.module.css";
import { useValue } from "../OrdersContex";
import { auth1 } from "../firebase";
import { signOut } from "firebase/auth";
import { SuccessToast,ErrorToast } from "./notifications/Notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faHouse } from "@fortawesome/free-solid-svg-icons";




const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const {handleCartInc,cartCount}=useValue();

  // const [currentPage, setCurrentPage] = useState(1); // Remove pagination state

  useEffect(() => {
    // Subscribe to the "blogs" collection in Firestore
    const unsubscribe = onSnapshot(collection(db2, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setBlogs(blogs);
    });

    // Unsubscribe from Firestore when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // ==============================================================Function to sign out the user==================
  const userSignOut = () => {
    signOut(auth1)
      .then(() => {
        console.log("Signout was Successful");
        SuccessToast("SignOut");
      })
      .catch((err) => {
        console.error("Signout error:", err);
        ErrorToast("LogOut");
      });
  };


  return (
    <>
      <div className={styles.NaveBar}><div className={styles.nameDiv}>Busy Buy</div><div className={styles.NaveItems}><div><FontAwesomeIcon icon={faHouse} />Home</div><input placeholder=" search with name"/><div>My Orders</div><div><span><FontAwesomeIcon icon={faShoppingCart} />
Cart</span><sup className={styles.count}>{cartCount}</sup></div><div onClick={userSignOut}>Sign Out</div></div></div>

    <div className={styles.homeContainer}>
      {blogs.map((item,i)=>{
        return(<div className={styles.itemContainer} key={i}>
          <h2 className={styles.h1s}>{item.title}&emsp;{i+1}</h2>
          <img src={item.url} className={styles.Imgs} alt={item.title}/>
          <div className={styles.details}><span>{item.color} colored </span><span>{item.category} </span><span>for {item.segment} </span><span><b>&emsp; &#8377;{item.price}</b></span>
          <span className={styles.brand}>&emsp;{item.brand}</span>
          </div> 
          <button className={styles.addToCart} onClick={()=>handleCartInc(item.id)}>Add to Cart</button>
      </div>)
      })}
    </div>
    </>
  );
};

export default Home;
