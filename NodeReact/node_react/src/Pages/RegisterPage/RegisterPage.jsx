import React from "react";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <>
      <div className={styles.registerContainer}>
        <h2 className={styles.registerTitle}>Register</h2>

        <div className={styles.inputGroup}>
          <label>First Name:</label>
          <input type="text" required className={styles.inputField} />
        </div>

        <div className={styles.inputGroup}>
          <label>Last Name:</label>
          <input type="text" className={styles.inputField} />
        </div>

        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input type="email" className={styles.inputField} />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone:</label>
          <input type="text" className={styles.inputField} />
        </div>

        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input type="password" className={styles.inputField} />
        </div>

        <button type="submit" className={styles.registerBtn}>Register</button>
      </div>
    </>
  );
};

export default RegisterPage;
