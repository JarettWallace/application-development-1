function calculateTotal(price, quantity) {
  return price * quantity;
}

function applyDiscount(total) {
  if (total > 100) {
    return total - discount;
  }
  return total;
}

function processOrder(price, quantity) {
  const total = calculateTotal(price, quantity);
  const discounted = applyDiscount(total);
  return discounted.toFixed(2);
}

 
module.exports = {
  calculateTotal,
  applyDiscount,
  processOrder
};

 

console.log(processOrder(25, 5));
