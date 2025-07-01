// ADVANCED TOPICS

// Closures
function outer() {
    let count = 0;
    return function inner() {
        count++;
        return count;
    };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2

// Hoisting
console.log(a); // undefined (due to hoisting)
var a = 5;

// Scope
function testScope() {
    let x = 10; // block scope
    if (true) {
        let y = 20;
        console.log(x, y); // 10 20
    }
    // console.log(y); // ReferenceError
}
testScope();

// Prototypes & Inheritance
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return `${this.name} makes a noise.`;
};
const dog = new Animal("Dog");
console.log(dog.speak());

// 'this' keyword
const obj = {
    value: 100,
    show: function() {
        return this.value;
    }
};
console.log(obj.show());