import React, { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';

const ShowOrders = () => {
  const orderContext = useContext(OrdersContext);
  if (!orderContext) return null;

  function renderOrders() {
    return orderContext.orders.map(order => (
      <div key={order.id}>
        <p>{order.name} = <span className='text-gray-400 font-bold mb-0 mr-l'>{order.id}</span></p>
      </div>
    ))
  }

  return (
    <div className='my-7'>
      <h5 className='text-gray-400'>Orders Supply Chain</h5>
      <div className='flex items-center justify-between'>
        {renderOrders()}
      </div>
      <hr />
    </div>
  )
}
 
export default ShowOrders;