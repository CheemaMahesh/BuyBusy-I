import { createContext, useState, useEffect, useContext } from "react";
import {db3} from "./firebase";
import { doc, setDoc,collection ,onSnapshot} from "firebase/firestore"; 
import { auth1 } from "./firebase";
import { signOut } from "firebase/auth";
import { SuccessToast,ErrorToast } from "./components/notifications/Notifications";


const OrderContext = createContext();

function useValue() {
  const value = useContext(OrderContext);
  return value;
}

function OrdersContext({ children }) { // Corrected "childern" to "children"
  const [cartCount, setCartCount] = useState(0);
  const [cartItems,setCartItems]=useState([]);

//SignOut
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


//increse cartCount and Adding the items to cart
async function handleCartInc (id) {
  try {
    console.log("Entering handleCartInc with id:", id);

      const docRef=doc(collection(db3,"my idss"));
      // const docRef = doc(collection(db2, "orderDetails"));
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

  useEffect(()=>{
    // const docRef=doc(collection(db3,"my idss"));
    onSnapshot(collection(db3, "my idss"), (snapShot) => {
      const data = snapShot.docs.map((doc) => {
        return {
          ...doc.data()
        };
      });
      setCartItems(data);
      setCartCount((prevCount) => data.length);
        })

  },[]);

  return (
    <OrderContext.Provider value={{ cartCount,userSignOut, setCartCount ,handleCartInc,cartItems}}>
      {children}
    </OrderContext.Provider>
  );
}

export { useValue };
export default OrdersContext;
