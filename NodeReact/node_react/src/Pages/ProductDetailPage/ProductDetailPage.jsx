import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchedProducts();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
