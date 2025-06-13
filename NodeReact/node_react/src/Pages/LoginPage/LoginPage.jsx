import React from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/products");
  };
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>

      <div className={styles.inputGroup}>
        <label>Name:</label>
        <input type="text" className={styles.inputField} />
      </div>
      <div className={styles.inputGroup}>
        <label>Email:</label>
        <input type="text" className={styles.inputField} />
      </div>
      <div className={styles.inputGroup}>
        <label>Password:</label>
        <input type="password" className={styles.inputField} />
      </div>

      <button
        className={styles.loginBtn}
        onClick={() => {
          handleSubmit();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
