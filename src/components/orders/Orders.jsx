import React from "react";
import { useValue } from "../../OrdersContex"; // Update the import as needed
import styles from "./Orders.module.css";

export default function Orders() {
  const { orderedItems, email, cancleOrder } = useValue();

  return (
    <div className={styles.orders}>
      <h2 className={styles.title}>Your Orders</h2>
      <ul className={styles.orderList}>
        {/* Maping the ordered items */}
        {orderedItems.map((data) => (
          <li key={data.id} className={styles.orderItem}>
            <div className={styles.orderInfo}>
              <h3 className={styles.itemName}>{data.name}</h3>
              <img
                className={styles.itemImage}
                src={data.url}
                alt={data.name}
              />
              <button
                className={styles.removeButton}
                onClick={() => cancleOrder(data.id, email)}
              >
                Cancle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
