import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../Store/Cart-Context";
import CartItem from "./CartItem";
import Checkout from "../Meals/Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹ ${cartCtx.totalAmount}`;

  const hasItems = cartCtx.items.length > 0;

  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmitting , setIsSubmitting] = useState(false);

  const [didSubmitting , setDidSubmitting] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          amount={item.amount}
          price={item.price}
          name={item.name}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const actionModals = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const orderConfirmHandler = async(userData) => {

    setIsSubmitting(true);

    await fetch(
      "https://food-order-app-35450-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orders: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmitting(true);

    cartCtx.clearCart();
  };

  const cartModal = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={orderConfirmHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && actionModals}
    </React.Fragment>
  );

  const isSubmittingModal = <p className={classes.bold}>Sending Order...</p>

  const didSubmittingModal = <React.Fragment>
    <p className={classes.bold}>Order Confirmed!!</p>
    <div className={classes.actions}>
      <button className={classes["button"]} onClick={props.onClose}>
        close
      </button>
      
    </div>
  </React.Fragment>

  return <Modal onClose={props.onClose}>

    {!isSubmitting && !didSubmitting && cartModal}
    {isSubmitting && isSubmittingModal}
    {didSubmitting && !isSubmitting && didSubmittingModal}
  </Modal>;
};

export default Cart;
