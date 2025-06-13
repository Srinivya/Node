import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Pages/Header/Header";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProductListingPage from "./Pages/ProductListingPAge/ProductListingPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Cart from "./Pages/CartPage/Cart";
import ProductLayout from "./Layout/ProductLayout";
import CartProvider from "./Context/CartProvider";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />

          <Routes>
            <Route path="/" element={<ProductLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="products" element={<ProductListingPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
