import React, { useState } from "react";
import { auth1 } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SuccessToast, ErrorToast } from "../notifications/Notifications";
import styles from "./SignUp.module.css";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
  
    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
      ErrorToast("Password should be at least 6 characters");
      return; // Exit early if the password is too short
    }
  
    createUserWithEmailAndPassword(auth1, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        SuccessToast("Sign Up");
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Sign Up");
      });
  };
  

  
  return (
    <div className={styles.signUpContainer}>
     <form onSubmit={signUp} className={styles.signUpForm}>
        <h1>Create an Account</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
