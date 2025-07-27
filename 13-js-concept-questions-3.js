// EVEN MORE JAVASCRIPT CONCEPT QUESTIONS & PRACTICE

// 1. How to copy an array? (shallow copy)
const arr = [1, 2, 3];
const arrCopy1 = arr.slice();
const arrCopy2 = [...arr];
console.log("Array copy (slice):", arrCopy1);
console.log("Array copy (spread):", arrCopy2);

// 2. How to deep copy an array of objects?
const arrOfObj = [{ a: 1 }, { b: 2 }];
const deepArrCopy = JSON.parse(JSON.stringify(arrOfObj));
console.log("Deep array copy:", deepArrCopy);

// 3. How to check if two arrays are equal?
function arraysEqual(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
}
console.log("Arrays equal:", arraysEqual([1,2,3], [1,2,3]));

// 4. How to find the intersection of two arrays?
const arrA = [1, 2, 3, 4];
const arrB = [3, 4, 5, 6];
const intersection = arrA.filter(x => arrB.includes(x));
console.log("Intersection:", intersection);

// 5. How to remove a specific element from an array?
const arrRemove = [1, 2, 3, 4, 5];
const removed = arrRemove.filter(x => x !== 3);
console.log("Remove 3:", removed);

// 6. How to empty an array?
let arrToEmpty = [1, 2, 3];
arrToEmpty.length = 0;
console.log("Emptied array:", arrToEmpty);

// 7. How to convert arguments object to an array?
function argsToArray() {
    const args = Array.from(arguments);
    console.log("Arguments as array:", args);
}
argsToArray(1, 2, 3);

// 8. How to flatten a deeply nested array?
const deepNested = [1, [2, [3, [4]]]];
const flatDeep = deepNested.flat(Infinity);
console.log("Deep flatten:", flatDeep);

// 9. How to get the max/min value in an array?
const nums = [10, 5, 8, 20];
console.log("Max:", Math.max(...nums));
console.log("Min:", Math.min(...nums));

// 10. How to remove duplicates from an array of objects by a key?
const users = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 1, name: "A" }
];
const uniqueUsers = users.filter(
    (user, idx, arr) => arr.findIndex(u => u.id === user.id) === idx
);
console.log("Unique users by id:", uniqueUsers);

// 11. How to convert a string to an array and back?
const str = "hello";
const strToArr = str.split('');
const arrToStr = strToArr.join('');
console.log("String to array:", strToArr, "Array to string:", arrToStr);

// 12. How to reverse an array without mutating the original?
const orig = [1, 2, 3];
const reversed = [...orig].reverse();
console.log("Original:", orig, "Reversed:", reversed);

// 13. How to fill an array with a value?
const filled = new Array(5).fill(0);
console.log("Filled array:", filled);

// 14. How to find the index of an object in an array by property?
const items = [{ id: 1 }, { id: 2 }];
const idx = items.findIndex(item => item.id === 2);
console.log("Index of id=2:", idx);

// 15. How to merge an array of objects into a single object?
const objArr = [{ a: 1 }, { b: 2 }, { c: 3 }];
const mergedObj = Object.assign({}, ...objArr);
console.log("Merged object:", mergedObj);