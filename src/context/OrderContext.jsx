import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();
  
  const [orders, setOrders] = useState(() => {
    if (user && user.email) {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      return savedOrders ? JSON.parse(savedOrders) : [];
    }
    return [];
  });

  // Reload orders when user changes
  useEffect(() => {
    if (user && user.email) {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]);
    }
  }, [user]);

  // Save orders whenever they change
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
    }
  }, [orders, user]);
  
  const addOrder = (order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
