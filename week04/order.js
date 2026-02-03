function calculateTotal(price, quantity) {
  return price * quantity;
}

function applyDiscount(total) {
  if (total > 100) {
    console.warn("Discount applied because total exceeds 100");
    return total - 10;
  }
  console.info("No discount applied");
  return total;
}

function processOrder(price, quantity) {
  console.info("Order processing started");

  if (price < 0 || quantity < 0) {
    console.error("Invalid input: price and quantity must be non-negative");
    throw new Error("Invalid input");
  }

  console.info(`Input received → price: ${price}, quantity: ${quantity}`);

  const total = calculateTotal(price, quantity);
  console.info(`Calculated total: ${total}`);

  const discounted = applyDiscount(total);
  const finalResult = discounted.toFixed(2);

  console.info(`Final order total: ${finalResult}`);
  return finalResult;
}

module.exports = { calculateTotal, applyDiscount, processOrder };

console.log(processOrder(25, 5));
