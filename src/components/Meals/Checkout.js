import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isFiveChar = (value) => value.trim().length === 5;

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredStreet = inputStreetRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    const inputNameIsValid = !isEmpty(enteredName);
    const inputStreetIsValid = !isEmpty(enteredStreet);
    const inputPostalIsValid = isFiveChar(enteredPostal);
    const inputCityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      inputNameIsValid &&
      inputStreetIsValid &&
      inputPostalIsValid &&
      inputCityIsValid;

    setFormInputsValidity({
      name: inputNameIsValid,
      street: inputStreetIsValid,
      postalCode: inputPostalIsValid,
      city: inputCityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity
    })
  };
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={inputNameRef} type="text" id="name"></input>
        {!formInputsValidity.name && <p>Enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={inputStreetRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Enter a valid Street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postalCode">Postal Code</label>
        <input ref={inputPostalRef} type="text" id="postalCode" />
        {!formInputsValidity.postalCode && (
          <p>Enter a valid PostalCode (5 characters long) </p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={inputCityRef} type="text" id="city" />
        {!formInputsValidity.city && <p> Enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
