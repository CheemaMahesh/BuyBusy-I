import React from "react";
import { useValue } from "../../OrdersContex";
import styles from "./Orders.module.css"

export default function Orders() {
  const { orderedItems } = useValue();
  console.log(orderedItems, "ordered items");

  return (
    <>
      <ul>
        {orderedItems.map((data, i) => (
          <li key={i} className={styles.li}>
            <h3>{data.name}</h3>
            <img src={data.url} alt={data.name}/>
          </li>
        ))}
      </ul>
    </>
  );
}
