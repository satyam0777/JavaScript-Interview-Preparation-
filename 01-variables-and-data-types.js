// VARIABLES AND DATA TYPES

// var, let, const
var globalVar = "I am a var variable (function-scoped)";
let blockVar = "I am a let variable (block-scoped)";
const constantVar = "I cannot be reassigned";

// Data Types
let str = "Hello";        // String
let num = 42;             // Number
let bool = true;          // Boolean
let und;                  // Undefined
let nul = null;           // Null
let sym = Symbol("id");   // Symbol
let obj = { a: 1 };       // Object

console.log(typeof str, typeof num, typeof bool, typeof und, typeof nul, typeof sym, typeof obj);

// Difference between let and var
if (true) {
    var x = 10;
    let y = 20;
}
console.log(x); // 10
// console.log(y); // ReferenceError: y is not defined