import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "./ProductListingPage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductListingPage() {
  const [product, setProduct] = useState(null);

  const { cart, addCart, RemoveCart, handleIncrement, handleDecrement } =
    useContext(CartContext);

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProduct(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchedProducts();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {product.map((item) => {
        const isInCart = cart.some((cartItem) => cartItem.id === item.id);
        const currentItem = cart.find((cartItem) => cartItem.id === item.id);

        return (
       
          <div className={styles.card} key={item.id}>
           <Link to={`${item.id}`} className={styles.link}>
            <img className={styles.image} src={item.image} alt={item.title} />
            <h1 className={styles.title}>{item.title}</h1>
            <h1 className={styles.title}>₹{item.price}</h1>
             </Link>
            <h2 className={styles.rate}>{item.rate}</h2>

            <div className="cart-action">
              {isInCart ? (
                <div className="quantity-controls">
                  {currentItem.quantity === 1 ? (
                    <button
                      className="icon-btn remove"
                      onClick={() => RemoveCart(item)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  ) : (
                    <button
                      className="icon-btn"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                  )}
                  <span className="quantity">{currentItem.quantity}</span>
                  <button
                    className="icon-btn"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="cart-btn add" onClick={() => addCart(item)}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
         
        );
      })}
    </div>
  );
}

export default ProductListingPage;
