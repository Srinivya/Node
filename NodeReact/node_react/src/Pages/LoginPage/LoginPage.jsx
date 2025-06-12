import React from "react";
import styles from "./LoginPage.module.css";
import {Link} from "react-router-dom"

const LoginPage = () => {
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
      <Link to={"/PLP"}>
      <button className={styles.loginBtn}>Login</button> 
      </Link>
     
    </div>
  );
};

export default LoginPage;
