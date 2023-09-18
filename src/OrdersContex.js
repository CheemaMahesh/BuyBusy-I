import React, { createContext, useState, useEffect, useContext } from "react";
import { db2, db3 ,db4} from "./firebase"; // Import db2 here
import { doc, setDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { auth1 } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { SuccessToast, ErrorToast } from "./components/notifications/Notifications";

// Create a context to manage the state
const OrderContext = createContext();

// Custom hook to access the context's value
function useValue() {
  const value = useContext(OrderContext);
  return value;
}

// Component to manage cart and user authentication
function OrdersContext({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemList, setCartItemList] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gTotal, setGTotal] = useState(0);
  const [email, setEmail] = useState("Mahi@email.com");
  const [userID, setUserId] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [orderedItems, setOrderedItems] = useState([]);

  function buyNow(ids, subTotal) {
    const newOrderedItems = ids.map(async (data) => {
      try {
        // ====================================================================Construct the document references
        // const orderDocRef = doc(db4, email);
        const orderDocRef = doc(collection(db4, email))

        const cartDocRef = doc(db3, `${email}`, data.pId);
  
        // =========================================================================Set data in the order document
        await setDoc(orderDocRef, {
          name: data.title,
          url: data.url,
          createdOn: new Date(),
        });
  
        // Delete the corresponding document in the cart
        await deleteDoc(cartDocRef);

        SuccessToast("OMG!!!!!!! YOU HAVE DONE THIS ");
  
        // Listen for changes in the ordered items
       
      } catch (error) {
        console.error("Error in buyNow:", error);
      }
    });
  }

  //====================================================getting order Details
  useEffect(()=>{
    onSnapshot(collection(db4, `${email}`), (snapShot) => {
      const data = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setOrderedItems(data);
    });
  },[email]);
  

  useEffect(() => {
    let subtotal = 0;
    cartItemList.forEach((data) => {
      subtotal += data.price * data.quantity;
    });
    setSubTotal(subtotal);
  }, [cartItemList]);


  // ====================================================Getting the userId and email when the user signs in
  useEffect(() => {
    onAuthStateChanged(auth1, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.id);
      } else {
        setEmail(null);
        setUserId(null);
      }
    });
  }, []);

  //==============s======================================== Sign out the user
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

  //============================================== Increase cartCount and add items to the cart
  async function handleCartInc(id) {
    try {
      console.log("Entering handleCartInc with id:", id);

      const docRef = doc(collection(db3, `${email}`));
      await setDoc(docRef, {
        ids: id,
        createdOn: new Date(),
      });

      console.log("Updated cartItems:", cartItems);
    } catch (error) {
      console.error("Error in handleCartInc:", error);
    }
  }

  // ==========================================================Listen for changes in cart items and update state
  useEffect(() => {
    onSnapshot(collection(db3, `${email}`), (snapShot) => {
      const data = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCartItems(data);
      console.log(data, "this is data");
      setCartCount((prevCount) => data.length);
      console.log(data.length);
    });
  }, [email]);

  //================================================================= Remove item from the cart list
  async function removeBlog(itemId) {
    try {
      if (!email) {
        SuccessToast("Removed item from Cart");
        console.error("Email is null or undefined.");
        return;
      }

      if (!itemId) {
        console.error("itemId is null or undefined.");
        return;
      }

      const docRef = doc(db3, email, itemId);
      await deleteDoc(docRef);
      console.log("Item removed from cart:", itemId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  // ===========================================Function to get cart item data from db2
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
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, []);

  // ===============================================Calculate the cart item list and update it in state
  useEffect(() => {
    // Create a new cartItemList array
    console.log("home");
    const newCartItemList = [];
    cartItems.forEach((cartItem, index) => {
      const matchingBlog = blogs.find((blog) => cartItem.ids === blog.id);
      if (matchingBlog) {
        const url = matchingBlog.url;
        const title = matchingBlog.title;
        const price = matchingBlog.price;
        const pId = cartItems[index].id; // Use cartItems[index]?.id or null

        console.log(url, " this is the URL that you have added");
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
          // Item is not in the cart, add it with quantity 1
          newCartItemList.push({
            id: matchingBlog.id,
            url,
            title,
            price,
            quantity: 1,
            total: price,
            pId, // Use pId here
          });
        }
      }
    });
    setCartItemList(newCartItemList);
  }, [cartItems, blogs]);

  // Calculate the grand total of items in the cart
  useEffect(() => {
    setGTotal(cartItemList.reduce((total, item) => total + item.total, 0));
  }, [cartItemList]);

  // Provide the context's value to its children components
  return (
    <OrderContext.Provider
      value={{
        cartCount,
        userSignOut,
        cartItemList,
        setCartCount,
        handleCartInc,
        cartItems,
        gTotal,
        email,
        userID,
        subTotal,
        removeBlog,
        buyNow,
        orderedItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Export the custom hook and the context component
export { useValue };
export default OrdersContext;
