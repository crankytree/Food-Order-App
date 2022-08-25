import React , {useState} from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header"
import CartProvider from "./Store/CartProvider";

import Meals from "./components/Meals/Meals"
 
function App() {

  const [showCart , setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  }

  const hideCartHandler = () => {
    setShowCart(false);
  }

  return <CartProvider>
    {showCart && <Cart onClose={hideCartHandler}/>}
    <Header onShowCart={showCartHandler} />
    <main>
      <Meals/>
    </main>
  </CartProvider>
}

export default App;
