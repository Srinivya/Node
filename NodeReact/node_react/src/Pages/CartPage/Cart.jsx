import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css"; 


const Cart = () => {
  const { cart, RemoveCart, handleIncrement, handleDecrement } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0));
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Your cart is Empty</h1>
        <Link to="/PLP">Continue Shopping</Link>
        <p>You have an account?</p>
        <p>
          <Link to="/login">Login</Link> to check
        </p>
        <p>List out Faster</p>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartWrapper}>
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Cart Page</h2>
          {cart.map((item, index) => (
            <div className={styles.cartItem} key={index}>
              <img src={item.image} alt={item.title} className={styles.productImg} />
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{item.title}</h3>
                <p className={styles.productPrice}>
                  Price: ₹{item.price * item.quantity}
                </p>
              </div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <p className={styles.productQuantity}>{item.quantity}</p>
              <button onClick={() => handleIncrement(item)}>+</button>
              <button onClick={() => RemoveCart(item)}>Remove Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
