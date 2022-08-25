import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

import mealsImage from "../../assets/meals2.jpg"

import classes from "./Header.module.css"

const Header = (props) => {
  return <Fragment>
    <header className={classes.header}>
        <h1>Meals-App</h1>
        <HeaderCartButton onShowCart={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
        <img src={mealsImage} alt="Different types of Food"></img>
    </div>
  </Fragment>;
}

export default Header;
