{authUser ? (
    // Display user information and a sign-out button if authenticated
    <div className={styles.authBox}>
      <div>{`Signed In as ${authUser.email}`}</div>
      <div>{`Order Count: ${cartCount}`}</div>
      <button className={styles.authButton} onClick={userSignOut}>
        Sign Out
      </button>
      {/* <Cart/> */}

    </div>
  ) : (
    <></>
  )}
//   npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome

// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig3 = {
  apiKey: "AIzaSyCocF6SZkL1WMa9JUTRXpz14bzs1yJgDwQ",
  authDomain: "busy-buy-1.firebaseapp.com",
  projectId: "busy-buy-1",
  storageBucket: "busy-buy-1.appspot.com",
  messagingSenderId: "136663594022",
  appId: "1:136663594022:web:8e11459fab070fc941e2e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig3);