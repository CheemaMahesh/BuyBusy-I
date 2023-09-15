import React, { useEffect, useState } from "react";
import { auth1 } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from "./Home";
import styles from "./AuthDetails.module.css";
// import { useValue } from "../OrdersContex";
import Cart from "./orders/Cart"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Nav from "./Nav";


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState("");
  // const orderContext = useValue();
  // const {cartCount} = orderContext;

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth1, (user) => {
      if (user) {
        // User is signed in, update the authUser state
        setAuthUser(user);
      } else {
        // User is signed out, set authUser to null
        setAuthUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  const router=createBrowserRouter([{
    path:"/",
    element:<Nav/>,
    children:[
      {index:true,element:<Home/>},
      {path:"/cart",element:<Cart/>},
      {path:"/orders",element:<Cart/>}
    ]
  }])

  

  return (

    
    <div className={styles.authDetailsContainer}>
      {authUser ? (
        <RouterProvider router={router}/>
      ) : (
        <div className={styles.authBox}>
          <SignIn />
          <h1>Or</h1>
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
