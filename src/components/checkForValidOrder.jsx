import { useContext } from 'react';
import OrdersContext from '../context/OrdersContext';

const CheckForValidOrder = ({ order }) => {
  const { orders } = useContext(OrdersContext);

  const validOrder = orders.find((item) => (item.id).toString() === order);

  return validOrder ? true : false;
}
 
export default CheckForValidOrder;

