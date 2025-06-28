// ES6 FEATURES

// Template literals
const language = "JavaScript";
console.log(`I am learning ${language}`);

// Destructuring arrays
const arr = [1, 2, 3];
const [first, second] = arr;
console.log(first, second);

// Spread operator
const arr2 = [...arr, 4, 5];
console.log(arr2);

// Rest operator
function showArgs(...args) {
    console.log(args);
}
showArgs(1, 2, 3);

// Default parameters
function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(5));

// Arrow functions (already shown in previous files)

// Modules (syntax only, not runnable in this file)
// export const value = 42;
// import { value } from './module.js';