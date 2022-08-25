import React , {useContext , useEffect , useState} from "react";
import CartIcon from "../Cart/CartIcon"
import CartContext from "../../Store/Cart-Context"

import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);

    const [btnAnimation , setBtnAnimation] = useState(false)
    const {items} = cartCtx;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnAnimation(true)

        const timer = setTimeout(() => {
            setBtnAnimation(false);
        } , 300);

        return () => {
            clearTimeout(timer);
        }
    } , [items])

    const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ""}`

    const numberOfCartItems = items.reduce((currNum , item) => {
        return currNum + item.amount;
    } , 0)

    return <React.Fragment>
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    </React.Fragment>
}

export default HeaderCartButton;