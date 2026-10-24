import React from 'react';
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";


ReactDom.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <OrderProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </OrderProvider>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </React.StrictMode>

);
