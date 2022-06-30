import useAxiosFetch from '../hooks/useAxiosFetch';
import { createContext, useState, useEffect } from 'react';

export const OrdersContext = createContext({});

const OrdersContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const { data } = useAxiosFetch('http://localhost:8000/orders');

  useEffect(() => {
    setOrders(data);
  }, [data])

  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export default OrdersContextProvider;