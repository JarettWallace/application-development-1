const { processOrder } = require("./order");

test("applies discount when total is greater than 100", () => {
  // Arrange
  const price = 25;
  const quantity = 5;
  const expected = (115).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("does not apply discount when total is less than 100", () => {
  // Arrange
  const price = 20;
  const quantity = 4;
  const expected = (80).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("edge case: no discount when total is exactly 100", () => {
  // Arrange
  const price = 20;
  const quantity = 5;
  const expected = (100).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("throws error for negative quantity", () => {
  // Arrange
  const price = 10;
  const quantity = -1;

  // Act, Assert
  expect(() => processOrder(price, quantity)).toThrow("Invalid input");
});

test("throws error for negative price", () => {
  // Arrange
  const price = -10;
  const quantity = 2;

  // Act, Assert
  expect(() => processOrder(price, quantity)).toThrow("Invalid input");
});
