import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "./ProductListingPage.module.css";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { Spin } from "antd";

function ProductListingPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const[error,setError]=useState(null);
  const { cart, addCart, RemoveCart, handleIncrement, handleDecrement } =
    useContext(CartContext);

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await apiClient.get("/products");
        setProduct(response.data);
      } catch (e) {
        console.log(e);
        setError("Error in fetching the Products")
      } finally {
        setLoading(false);
      }
    };
    fetchedProducts();
  }, []);

  if (loading) {
    return <Spin className="spinLoading" size="large" style={{textAlign:'center',justifyContent:'center',display:'flex',marginTop:'40vh'}} />;
  }

  if (product.length === 0) {
    return <h1>No Product Found...</h1>;
  }

  if(error){
    return <h1>{error}</h1>
  }

  return (
    <div className={styles.container}>
      {product.map((item) => {
        const currentItem = cart.find((cartItem) => cartItem.id === item.id);

        return (
          <div className={styles.card} key={item.id}>
            <Link to={`${item.id}`} className={styles.link}>
              <img className={styles.image} src={item.image} alt={item.title} />
              <h1 className={styles.title}>{item.title}</h1>
              <h1 className={styles.title}>₹{item.price}</h1>

              <h2 className={styles.rate}>{item.rate}</h2>
            </Link>
            <div className="cart-action">
              {currentItem ? (
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
