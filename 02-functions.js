// FUNCTIONS

// Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function Expression
const add = function(a, b) {
    return a + b;
};

// Arrow Function
const multiply = (a, b) => a * b;

// Default Parameters
function sayHello(name = "Guest") {
    return `Hello, ${name}!`;
}

// Rest Parameters
function sumAll(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(greet("Alice"));
console.log(add(2, 3));
console.log(multiply(4, 5));
console.log(sayHello());
console.log(sumAll(1, 2, 3, 4));