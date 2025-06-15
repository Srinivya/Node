import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const{register}=useContext(AuthContext)
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullName = `${value.firstName} ${value.lastName}`;
      await register( {
        name: fullName,
        email: value.email,
        password: value.password,
        role: "user",
      });
      navigate("/login");}
       catch (err) {
      console.log(err);
      setError("Registration failed...");
    }
  };
  const handleChange = (e) => {
    setValue((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className={styles.registerContainer}>
        <h2 className={styles.registerTitle}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.registerBtn}>
            Register
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
