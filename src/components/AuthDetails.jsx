import React, { useEffect, useState } from "react";
import { auth1 } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from "./Home";
import styles from "./AuthDetails.module.css";
import { SuccessToast,ErrorToast } from "./notifications/Notifications";

// AuthDetails component handles user authentication details
const AuthDetails = () => {
  const [authUser, setAuthUser] = useState("");

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

  // Function to sign out the user
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
    <div className={styles.authDetailsContainer}>
      {authUser ? (
        // Display user information and a sign-out button if authenticated
        <div className={styles.authBox}>
          <div>{`Signed In as ${authUser.email}`}</div>
          <button className={styles.authButton} onClick={userSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <></>
      )}

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
