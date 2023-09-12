import React, { useState,useRef,useEffect } from "react";
import { auth1 } from "../../firebase";
import { SuccessToast, ErrorToast } from "../notifications/Notifications";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./SignIn.module.css";

const SignIn = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    },[]);

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth1, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        SuccessToast("Login");
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Login");
      });
  };

  return (
    <div className={styles.signInContainer}>
     <form onSubmit={signIn} className={styles.signInForm}>
        <h1>Log In</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          ref={titleRef}
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
        <button type="submit" className={styles.signInButton}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
