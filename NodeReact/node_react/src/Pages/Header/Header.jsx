import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";



const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <Link to="/products" className={styles.navItem}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className={styles.navItem}>
              <FaShoppingCart size={"25px"}/>
              {cart.length > 0 && (
                <span className={styles.cartCount}>{cart.length}</span>
              )}
            </Link>
          </li>
          <li className={styles.navItem}>Logout</li>
          <li className={styles.icon}>
            <FaUser />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
