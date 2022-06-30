const getOrderIds = (orders) => {
  if (!orders) return null;

  const ordersArray = [];

  for (let order of orders) {
    ordersArray.push(order.id);
  }

  return ordersArray;
};

export default getOrderIds;
