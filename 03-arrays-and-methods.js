// ARRAYS AND METHODS

const numbers = [1, 2, 3, 4, 5];

// map: create a new array with each value doubled
const doubled = numbers.map(num => num * 2);

// filter: create a new array with even numbers only
const evens = numbers.filter(num => num % 2 === 0);

// reduce: sum all numbers in the array
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// forEach: log each number
numbers.forEach(num => console.log(num));

// find: find the first number greater than 3
const firstGreaterThanThree = numbers.find(num => num > 3);

console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);
console.log("First number > 3:", firstGreaterThanThree);