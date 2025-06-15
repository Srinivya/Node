import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";
import apiClient from "../../api/apiClient";
import { Spin } from "antd";
import { CartContext } from "../../Context/CartContext/CartContext";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { cart, addCart } = useContext(CartContext);

  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        console.log("Product detail response:", response.data)
        setProduct(response.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchedProduct();
  }, [id]);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: "40vh",
        }}
      />
    );
  }

  if (!product) {
    return <h1>No Product Found...</h1>;
  }

  const currentItem = cart.find((cartItem) => cartItem._id === product._id);

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>₹{product.price}</p>
        <div className="cart-action">
          {currentItem ? (
            <button
              className="cart-btn go-to-cart"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          ) : (
            <button className="cart-btn add" onClick={() => addCart(product)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
