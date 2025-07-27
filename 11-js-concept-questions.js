// JAVASCRIPT CONCEPT QUESTIONS & PRACTICE

// 1. Difference between var, let, and const
// Q: What is the difference between var, let, and const in JavaScript?
function varLetConstDemo() {
    if (true) {
        var a = 1; // function-scoped
        let b = 2; // block-scoped
        const c = 3; // block-scoped, cannot be reassigned
    }
    console.log(a); // 1
    // console.log(b); // ReferenceError
    // console.log(c); // ReferenceError
}
varLetConstDemo();

// 2. Different ways to declare functions
// Function Declaration
function add(a, b) {
    return a + b;
}
// Function Expression
const subtract = function(a, b) {
    return a - b;
};
// Arrow Function
const multiply = (a, b) => a * b;
// Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("IIFE executed");
})();

console.log(add(2, 3));        // 5
console.log(subtract(5, 2));   // 3
console.log(multiply(3, 4));   // 12

// 3. Async function and Promises
// Q: What is an async function? How does it work with Promises?
async function fetchData() {
    return "Data fetched!";
}
fetchData().then(console.log); // Data fetched!

// Example with await
async function asyncExample() {
    const result = await Promise.resolve("Resolved!");
    console.log(result);
}
asyncExample();

// 4. Array map, filter, reduce examples
const arr = [1, 2, 3, 4, 5];

// map: square each number
const squares = arr.map(x => x * x);
console.log("Squares:", squares);

// filter: keep even numbers
const evens = arr.filter(x => x % 2 === 0);
console.log("Evens:", evens);

// reduce: sum all numbers
const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum);

// 5. Practice: Write a function that doubles each value in an array using map
function doubleArray(arr) {
    return arr.map(x => x * 2);
}
console.log("Doubled:", doubleArray([2, 4, 6]));

// 6. Practice: Write a function that returns the product of all numbers in an array using reduce
function productArray(arr) {
    return arr.reduce((acc, curr) => acc * curr, 1);
}
console.log("Product:", productArray([2, 3, 4]));

// 7. Practice: Write an async function that waits 1 second and then returns "done"
async function waitAndReturn() {
    await new Promise(res => setTimeout(res, 1000));
    return "done";
}
waitAndReturn().then(console.log);

// 8. Practice: Show how to clone an object and update a property
const obj = { a: 1, b: 2 };
const newObj = { ...obj, b: 3 };
console.log("Cloned and updated:", newObj);

// 9. Practice: What happens if you try to reassign a const variable?
// const x = 5;
// x = 10; // TypeError: Assignment to constant variable

// 10. Practice: What is the output?
// let x = 10;
// if (true) {
//     let x = 20;
//     console.log(x); // 20
// }
// console.log(x); // 10

// 11. Practice: What is the output?
// for (var i = 0; i < 3; i++) {
//     setTimeout(() => console.log(i), 100);
// }
// Output: 3 3 3 (because var is function-scoped, not block-scoped)