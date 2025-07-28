// MORE JAVASCRIPT ARRAY & OBJECT PRACTICE QUESTIONS

// 1. How to find the difference between two arrays?
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const difference = arr1.filter(x => !arr2.includes(x));
console.log("Difference (arr1 - arr2):", difference);

// 2. How to chunk an array into smaller arrays of a given size?
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
console.log("Chunked array:", chunkArray([1,2,3,4,5,6,7], 3));

// 3. How to count occurrences of each value in an array?
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log("Occurrences:", count);

// 4. How to get all keys and values from an object as arrays?
const obj = { a: 1, b: 2, c: 3 };
console.log("Keys:", Object.keys(obj));
console.log("Values:", Object.values(obj));

// 5. How to swap two variables without a temp variable?
let x = 5, y = 10;
[x, y] = [y, x];
console.log("Swapped:", x, y);

// 6. How to remove properties from an object?
const person = { name: "Sam", age: 25, city: "Delhi" };
const { city, ...rest } = person;
console.log("Without city:", rest);

// 7. How to get the first and last element of an array?
const nums = [10, 20, 30, 40];
console.log("First:", nums[0], "Last:", nums[nums.length - 1]);

// 8. How to check if an object is empty?
const emptyObj = {};
console.log("Is empty:", Object.keys(emptyObj).length === 0);

// 9. How to merge two objects?
const objA = { a: 1, b: 2 };
const objB = { b: 3, c: 4 };
const merged = { ...objA, ...objB };
console.log("Merged objects:", merged);

// 10. How to get a random element from an array?
const colors = ['red', 'green', 'blue', 'yellow'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
console.log("Random color:", randomColor);

// 11. How to capitalize the first letter of each word in a string?
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
console.log("Capitalized:", capitalizeWords("hello world from javascript"));

// 12. How to find the sum of all even numbers in an array?
const numbers = [1, 2, 3, 4, 5, 6];
const evenSum = numbers.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
console.log("Sum of evens:", evenSum);

// 13. How to flatten an array one level deep?
const nestedArr = [1, [2, 3], [4, 5]];
const flatOne = [].concat(...nestedArr);
console.log("Flatten one level:", flatOne);

// 14. How to find the longest string in an array?
const words = ["cat", "elephant", "dog", "hippopotamus"];
const longest = words.reduce((a, b) => a.length > b.length ? a : b, "");
console.log("Longest word:", longest);

// 15. How to remove all non-numeric values from an array?
const mixed = [1, "a", 2, null, 3, "b", undefined, 4];
const onlyNumbers = mixed.filter(Number.isFinite);
console.log("Only numbers:", onlyNumbers);