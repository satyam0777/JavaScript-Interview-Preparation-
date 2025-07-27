// MORE JAVASCRIPT CONCEPT QUESTIONS & PRACTICE

// 1. What will be the output? (let vs var in loops)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log("let:", i), 100);
}
// Output: let: 0, let: 1, let: 2

for (var j = 0; j < 3; j++) {
    setTimeout(() => console.log("var:", j), 100);
}
// Output: var: 3, var: 3, var: 3

// 2. What is the difference between == and ===?
console.log(2 == "2");   // true (type coercion)
console.log(2 === "2");  // false (strict equality)

// 3. How to merge two arrays?
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];
console.log("Merged:", merged);

// 4. How to remove falsy values from an array?
const mixedArr = [0, 1, false, 2, '', 3, null, undefined];
const truthyArr = mixedArr.filter(Boolean);
console.log("Truthy values:", truthyArr);

// 5. What is a closure? Give an example.
function makeCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const counter = makeCounter();
console.log("Closure:", counter(), counter());

// 6. What is hoisting? Example with function and variable
console.log(hoistedVar); // undefined
var hoistedVar = 10;

hoistedFunc(); // "I am hoisted"
function hoistedFunc() {
    console.log("I am hoisted");
}

// 7. How to deep clone an object?
const deepObj = { a: 1, b: { c: 2 } };
const deepClone = JSON.parse(JSON.stringify(deepObj));
console.log("Deep clone:", deepClone);

// 8. How to check if a variable is an array?
console.log(Array.isArray([1, 2, 3])); // true

// 9. What is the output? (const with objects)
const person = { name: "Alex" };
person.name = "Sam";
console.log("Const object mutation:", person.name); // Sam

// 10. How to use reduce to flatten an array of arrays?
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log("Flattened:", flat);

// 11. What is the output? (default parameters)
function greet(name = "Guest") {
    return `Hello, ${name}`;
}
console.log(greet()); // Hello, Guest

// 12. How to use map to create an array of objects from an array of values?
const nums = [1, 2, 3];
const objArr = nums.map(n => ({ value: n }));
console.log("Array of objects:", objArr);

// 13. What is the output? (Destructuring)
const { a, b } = { a: 10, b: 20 };
console.log("Destructured:", a, b);

// 14. How to use filter to get unique values?
const dupArr = [1, 2, 2, 3, 4, 4, 5];
const unique = dupArr.filter((item, idx, arr) => arr.indexOf(item) === idx);
console.log("Unique values:", unique);

// 15. What is the output? (Arrow function and this)
const obj2 = {
    value: 100,
    show: function() {
        setTimeout(() => {
            console.log("Arrow this:", this.value);
        }, 100);
    }
};
obj2.show(); // Arrow this: 100