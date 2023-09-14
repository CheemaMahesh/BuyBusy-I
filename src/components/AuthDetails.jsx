import React, { useEffect, useState } from "react";
import { auth1 } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from "./Home";
import styles from "./AuthDetails.module.css";
import { SuccessToast, ErrorToast } from "./notifications/Notifications";
import { useValue } from "../OrdersContex";
import Cart from "./orders/Cart"

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState("");
  const orderContext = useValue();
  const {cartCount} = orderContext;

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

  

  return (
    <div className={styles.authDetailsContainer}>
      {authUser ? (
        <Home />
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
