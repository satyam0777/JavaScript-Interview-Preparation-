// JAVASCRIPT DIFFERENCE TYPE QUESTIONS (COMMON IN INTERVIEWS)

// 1. Difference between null and undefined
let a;
let b = null;
console.log("a (undefined):", a); // undefined
console.log("b (null):", b);      // null

// 2. Difference between == and ===
console.log("2 == '2':", 2 == '2');   // true
console.log("2 === '2':", 2 === '2'); // false

// 3. Difference between function declaration and function expression
function declared() {
    return "I am a function declaration";
}
const expressed = function() {
    return "I am a function expression";
};
console.log(declared());
console.log(expressed());

// 4. Difference between arrow function and regular function (this binding)
const obj = {
    value: 42,
    regular: function() {
        return this.value;
    },
    arrow: () => {
        // 'this' here is not bound to obj
        return this.value;
    }
};
console.log("Regular function this:", obj.regular()); // 42
console.log("Arrow function this:", obj.arrow());     // undefined

// 5. Difference between let, const, and var
// var: function-scoped, can be redeclared and updated
// let: block-scoped, can be updated but not redeclared in same scope
// const: block-scoped, cannot be updated or redeclared

// 6. Difference between map and forEach
const arr = [1, 2, 3];
const mapped = arr.map(x => x * 2); // returns new array
arr.forEach((x, i) => arr[i] = x * 2); // modifies original array
console.log("map result:", mapped);
console.log("forEach result:", arr);

// 7. Difference between call, apply, and bind
function greet(msg) {
    return msg + ", " + this.name;
}
const user = { name: "Satyam" };
console.log("call:", greet.call(user, "Hello"));      // Hello, Satyam
console.log("apply:", greet.apply(user, ["Hi"]));     // Hi, Satyam
const boundGreet = greet.bind(user, "Hey");
console.log("bind:", boundGreet());                   // Hey, Satyam

// 8. Difference between shallow copy and deep copy
const shallow = [{ a: 1 }];
const shallowCopy = [...shallow];
shallowCopy[0].a = 2;
console.log("Shallow copy affects original:", shallow[0].a); // 2

const deep = [{ a: 1 }];
const deepCopy = JSON.parse(JSON.stringify(deep));
deepCopy[0].a = 5;
console.log("Deep copy does not affect original:", deep[0].a); // 1

// 9. Difference between synchronous and asynchronous code
console.log("Synchronous: 1");
setTimeout(() => console.log("Asynchronous: 2"), 0);
console.log("Synchronous: 3");

// 10. Difference between localStorage and sessionStorage
// localStorage persists even after browser is closed
// sessionStorage is cleared when the page session ends
localStorage.setItem("key", "local");
sessionStorage.setItem("key", "session");
console.log("localStorage:", localStorage.getItem("key"));
console.log("sessionStorage:",sessionStorage.getItem("key"));
// 11. Difference between JSON.stringify and JSON.parse
const jsonString = JSON.stringify({ a: 1, b: 2 });
console.log("JSON.stringify:", jsonString);
const jsonObject = JSON.parse(jsonString);
console.log("JSON.parse:", jsonObject);
// 12. Difference between prototype and __proto__
function Person(name) {
    this.name = name;
}
Person.prototype.sayHello = function() {
    console.log("Hello, " + this.name);
};
const alice = new Person("Alice");
alice.sayHello();   // Hello, Alice
console.log("Prototype:", Person.prototype);    // Prototype: contains methods and properties shared by all instances
console.log("Prototype of alice:", alice.__proto__); // __proto__: points to Person prototype