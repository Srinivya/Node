import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Header = () => {
  const { cart ,clearCart } = useContext(CartContext);
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
   clearCart();
    navigate("/login");
  };

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
              <FaShoppingCart size={"25px"} />
              {cart.length > 0 && (
                <span className={styles.cartCount}>{cart.length}</span>
              )}
            </Link>
          </li>
          {isAuth ? (
            <>
              <li className={styles.navItem} onClick={handleLogout}>
                Logout
              </li>
              <li className={styles.icon}>
                <FaUser />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.navItem}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={styles.navItem}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
