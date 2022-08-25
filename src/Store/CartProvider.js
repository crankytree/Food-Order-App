import { useReducer } from "react";
import CartContext from "./Cart-Context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // const updatedItems = [...state.items , action.item];
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if(existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  else if(action.type === "REMOVE"){
    const removeCartItemIndex = state.items.findIndex(item => {
      return item.id === action.id;
    })
    
    const removeCartItem = state.items[removeCartItemIndex];
    let updatedItem = {
      ...removeCartItem, 
      amount: removeCartItem.amount - 1
    }
    let updatedItems = [...state.items]
    if(updatedItem.amount === 0){
      updatedItems.splice(removeCartItemIndex , 1);
    }
    else {
      updatedItems[removeCartItemIndex] = updatedItem; 
    }
    const updatedTotalAmount = state.totalAmount - removeCartItem.price;
    return (
      {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    )
  }
  else if(action.type === "CLEAR"){
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCart({type: "CLEAR"})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
