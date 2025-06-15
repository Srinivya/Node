import React, { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/products");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed...");
      }
    }
  };
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input type="text" className={styles.inputField} />
        </div>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="text"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.loginBtn}>Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
