import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Pages/Header/Header";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProductListingPage from "./Pages/ProductListingPAge/ProductListingPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Cart from "./Pages/CartPage/Cart";
import ProductLayout from "./Layout/ProductLayout";
import CartProvider from "./Context/CartContext/CartProvider";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";

import ProtectiveRoutes from "../Routes/ProtectiveRoutes";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext/AuthContext";
import UnAuthorized from "./Pages/UnAuthorized/UnAuthorized";

function App() {
  
   const { isAuth, userRole } = useContext(AuthContext);
  return (
    <>
    
       
          <CartProvider>
            <Header />

            <Routes>
              <Route path="/" element={<ProductLayout />}>
               <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} /> 
               
                <Route path="products" element={<ProductListingPage />} />
                <Route
                  path="products/:id"
                  element={
                    <ProtectiveRoutes
                      isAuth={isAuth}
                      userRole={userRole}
                      allowededRoles={["user", "admin"]}
                    >
                      <ProductDetailPage />
                    </ProtectiveRoutes>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectiveRoutes
                      isAuth={isAuth}
                      userRole={userRole}
                      allowededRoles={["admin"]}
                    >
                      <Cart />
                    </ProtectiveRoutes>
                  }
                />
              </Route>
             <Route path="/unauthorized" element={<UnAuthorized/>}/>
            </Routes>
          </CartProvider>
       
    
    </>
  );
}

export default App;
