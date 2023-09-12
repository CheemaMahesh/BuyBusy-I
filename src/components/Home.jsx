import React, { useState, useEffect } from "react";
import { db2 } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./Home.module.css";

const ITEMS_PER_PAGE = 10; // Number of items to display per page

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db2, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setBlogs(blogs);
    });

    return () => {
      unsubscribe();
    };
  }, []);

 
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the blogs to display on the current page
  const blogsToDisplay = blogs.slice(startIndex, endIndex);

  return (
    <div className={styles.homeContainer}>
      <h1>Blog List</h1>
      <div className={styles.blogGrid}>
        {blogsToDisplay.map((blog) => (
          <div className={styles.blogCard} key={blog.id}>
            <h3>{blog.title}</h3>
            <img src={blog.url} alt={blog.title} className={styles.blogImage} />
            <p>Color: {blog.color}</p>
            <p>Category: {blog.category}</p>
            <p>Price: &#8377;{blog.price}</p>
            <p>for {blog.segment}</p>
            <h5 className={styles.brand}>{blog.brand}</h5>
            
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(blogs.length / ITEMS_PER_PAGE) }, (_, index) => (
          <button
            key={index}
            className={index + 1 === currentPage ? styles.activePage : styles.pageButton}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
