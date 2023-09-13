import React, { useState, useEffect } from "react";
import { db2 } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./Home.module.css";


const Home = () => {
  const [blogs, setBlogs] = useState([]);
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

  return (
    <div className={styles.homeContainer}>
      {blogs.map((item,i)=>{
        return(<div className={styles.itemContainer}>
          <h2 className={styles.h1s}>{item.title}&emsp;{i+1}</h2>
          <img src={item.url} className={styles.Imgs} alt={item.title}/>
          <div className={styles.details}><span>{item.color} colored </span><span>{item.category} </span><span>for {item.segment} </span><span><b>&emsp; &#8377;{item.price}</b></span><span className={styles.brand}>&emsp;{item.brand}</span></div> 
      </div>)
      })}
    </div>
  );
};

export default Home;
