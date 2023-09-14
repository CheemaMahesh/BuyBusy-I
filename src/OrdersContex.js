import { createContext, useState, useEffect, useContext } from "react";

const OrderContext = createContext();

function useValue() {
  const value = useContext(OrderContext);
  return value;
}

function OrdersContext({ children }) { // Corrected "childern" to "children"
  const [cartCount, setCartCount] = useState(0);
  const [cartItems,setCartItems]=useState([]);
//increse cartCount and Adding the items to cart
const handleCartInc=(id)=>{
    setCartCount(cartCount+1);
    // setCartItems([...cartItems,id]);
    setCartItems((prevCartItems) => [...prevCartItems, id]);  
    console.log(cartItems);
}

  useEffect(() => {
    console.log("context is on the cards");
  }, []);

  return (
    <OrderContext.Provider value={{ cartCount, setCartCount ,handleCartInc,cartItems}}>
      {children}
    </OrderContext.Provider>
  );
}

export { useValue };
export default OrdersContext;
