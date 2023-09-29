import React, { useState } from "react";
import styles from "./Home.module.css";
import { useValue } from "../OrdersContex";

const Home = () => {
  const { handleCartInc, items } = useValue();

  // State variables for pagination
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the items array to display only the items for the current page
  const itemsToDisplay = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className={styles.homeContainer}>
        {/*=============================maping the shopping items-================================================== */}
        {itemsToDisplay.map((item, i) => {
          return (
            <div className={styles.itemContainer} key={i}>
              <h2 className={styles.h1s}>{item.title}</h2>
              <img
                src={item.url}
                className={styles.Imgs}
                alt={item.title}
              />
              <div className={styles.details}>
                <span>{item.color} colored </span>
                <span>{item.category} </span>
                <span>for {item.segment} </span>
                <span>
                  <b>&emsp; &#8377;{item.price}</b>
                </span>
                <span className={styles.brand}>&emsp;{item.brand}</span>
              </div>
              <button
                className={styles.addToCart}
                onClick={() => handleCartInc(item.id)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1} className={styles.pagebtns}>
          Previous Page
        </button>
        <span className={styles.pageNumber}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className={styles.pagebtns}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default Home;
