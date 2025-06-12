import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
   <div className={styles.container}>
     <div className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/PLP" className={styles.navItem}>PLP</Link>
        </li>
        <li>
          <Link to="/cart" className={styles.navItem}>Cart</Link>
        </li>
        <li className={styles.navItem}>Logout</li>
        <li className={styles.icon}>👤</li>
      </ul>
    </div>
   </div>
  );
};

export default Header;
