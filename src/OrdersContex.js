import React, { createContext, useState, useEffect, useContext } from "react";
import { db2, db3 } from "./firebase"; // Import db2 here
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { auth1 } from "./firebase";
import { signOut } from "firebase/auth";
import { SuccessToast, ErrorToast } from "./components/notifications/Notifications";

const OrderContext = createContext();

function useValue() {
  const value = useContext(OrderContext);
  return value;
}

function OrdersContext({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemList, setCartItemList] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gTotal,setGTotal]=useState(0);

  // SignOut
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

  // Increase cartCount and Adding the items to cart
  async function handleCartInc(id) {
    try {
      console.log("Entering handleCartInc with id:", id);

      const docRef = doc(collection(db3, "my idss"));
      const maheee = await setDoc(docRef, {
        ids: id,
        createdOn: new Date(),
      });
      console.log("this is mahi", maheee);

      console.log("Updated cartItems:", cartItems);
    } catch (error) {
      console.error("Error in handleCartInc:", error);
    }
  }

  useEffect(() => {
    console.log("context is on the cards");
  }, []);

  useEffect(() => {
    onSnapshot(collection(db3, "my idss"), (snapShot) => {
      const data = snapShot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setCartItems(data);
      setCartCount((prevCount) => data.length);
    });
  }, []);

  // Function to get cart item data from db2
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db2, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setBlogs(blogs);
    }, []);

    return () => {
      // Clean up the subscription when component unmounts
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Create a new cartItemList array
    const newCartItemList = [];
    cartItems.forEach((cartItem) => {
      const matchingBlog = blogs.find((blog) => cartItem.ids === blog.id);
      if (matchingBlog) {
        const url = matchingBlog.url;
        const title = matchingBlog.title;
        const price = matchingBlog.price;

        // Check if the item is already in cartItemList
        const existingCartItemIndex = newCartItemList.findIndex(
          (item) => item.id === matchingBlog.id
        );

        if (existingCartItemIndex !== -1) {
          // Item is already in the cart, increase the quantity
          newCartItemList[existingCartItemIndex].quantity++;
          newCartItemList[existingCartItemIndex].total =
            newCartItemList[existingCartItemIndex].quantity * price;
        } else {
          // Item is not in the cart, add it with quantity 1\
            
          newCartItemList.push({
            id: matchingBlog.id,
            url,
            title,
            price,
            quantity: 1,
            total: price,
          });

        }
      }
    });

    setCartItemList(newCartItemList);
  }, [cartItems, blogs]);

  useEffect(() => {
    setGTotal(cartItemList.reduce((total, item) => total + item.total, 0));
  }, [cartItemList]);

  return (
    <OrderContext.Provider
      value={{
        cartCount,
        userSignOut,
        cartItemList,
        setCartCount,
        handleCartInc,
        cartItems,
        gTotal
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { useValue };
export default OrdersContext;
