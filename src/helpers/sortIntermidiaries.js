const sortIntermidiaries = (orders) => {
  return orders.sort((a, b) => a.intermidiary_order["id"] - b.intermidiary_order["id"]);
};

export default sortIntermidiaries;
