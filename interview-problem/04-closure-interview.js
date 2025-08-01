// CLOSURE Interview Question

// Question 1 : Lexical Scope

// global scope
function local(){
    // local scope
    var username = 'satyam'
    console.log(username)
}
local()


// Question 2 : Closure

function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
      alert(name);  // This will alert 'Mozilla'
    }
    return displayName;
  }
  
  var myFunc = makeFunc(); // myFunc is now a function that, when called, will alert 'Mozilla'
  // myFunc is a closure that captures the variable 'name' from its parent scope
  myFunc(); // This will alert 'Mozilla'


// Question 3 : Closure scope chain 

const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // log 20


// Question 4 : Output

let count = 0;
(function printCount(){
    if(count === 0){
        let count = 1;
        console.log(count); //1
    }
    console.log(count);// 0
})();


// Question 5 : Write function for this addSix()

function createBase(num){
    return function (innerNum) {
        console.log(innerNum + num);
    };
}
var addSix = createBase(6);
addSix(10);
addSix(21);


// Question 6 : Time Optimization

function find() {
    let a = [];
    for (let i =0;i<1000000;i++){
        a[i]= i*i;
    }
    return function (index) {
        console.log(a[index]);    
    }
}
const closure = find();
console.time("6"); // Measure time for closure with 6 
closure(6);
console.timeEnd("6");  // Output time taken for closure with 6
console.time("50");    // Measure time for closure with 50
closure(50);          //
console.timeEnd("50");


// Question 6 : Block scope and set Time out

// using let
function a() {
    for (let i =0;i<3;i++){
        setTimeout(function(log) {  
            console.log(i)  // 0,1,2
        }, i*1000);
    }
}
a(); // using let will give you 0 , 1 ,2

// using var
for (var i =0;i<3;i++){
    function inner(i){
            setTimeout(function(log) {  
                console.log(i)  // 3 times  3
            }, i*1000);
        
    }
    inner(i);
}


// Question 7 : How would you use a closure to create a private counter?

function counter() {
    var _counter = 0;

    function add(increment) {
        _counter += increment;
    }

    function retrive() {
        return "Counter = " + _counter;
    }
    
    return {
        add,
        retrive
    };
}
const c = counter();
c.add(5);  
console.log(c.retrive());  // Counter = 5
c.add(10);
console.log(c.retrive());  // Counter = 15


// Question 8 : Module Pattern : 

var module = (function (){
    function privateMethod(){
        console.log("private");
    }
    return {
    publicMethod : function(){
        console.log("public");
    }
};
    
})();
module.publicMethod(); // public
// module.privateMethod(); // Error: module.privateMethod is not a function
module.privateMethod();  // Error: module.privateMethod is not a function



// Question 9 : Make this run only once

let view;
function Like() {
    let called = 0;

    return function(){
        if (called > 0){
            console.log("Already")
        }else{
            view= "Roadsidecoder";
            console.log("Subscribe", view);
            called++
        }
    };
}
let isSub = Like();
isSub(); // Subscribe Roadsidecoder
isSub(); // Already
isSub(); // Already
isSub(); // Already


// Question 10 : once Polyfill 

function once(func,context) {
    let ran;

    return function(){
        if(func){
            ran = func.apply(context || this, arguments);
            func = null
        }
        return ran;
    };
}
 const hello = once((a,b)=>{
    console.log("Hi",a,b)  
})
 hello(1,2); // Hi 1 2
 hello(1,2); // Hi 1 2
 hello(1,2);
 hello(1,2);


// Question 11 : Memoize Polyfill  

function myMemoize(fn,context) {
    const res = {};
    return function(...args){
        var argsCache = JSON.stringify(args);
        if(!res[argsCache]){ 
            res[argsCache] = fn.call(context || this, ...args);
        }
        return res[argsCache];    
    };
}

const clumsyProduct = (num1,num2) => {
    for (let i = 1; i <= 100000000; i++) {
        return num1 * num2;    
    }
}

const MemoizeClumsyProduct = myMemoize(clumsyProduct);

console.time("First call");
console.log(MemoizeClumsyProduct(9467,7649));
console.timeEnd("First call")

console.time("Second call");
console.log(MemoizeClumsyProduct(9467,7649));
console.timeEnd("Second call");


// Question 12: closure VS scope 
function outerFunction() {
    let outerVariable = 'I am from outer function';

    function innerFunction() {
        let innerVariable = 'I am from inner function';
        console.log(outerVariable); // Accessing outer variable
        console.log(innerVariable); // Accessing inner variable
    }

    return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // This will log both outer and inner variables

// Question 13: Closure with setTimeout
function delayedLog() {
    for (var i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }
}
delayedLog(); // This will log 3 three times

// Question 14: Closure with setTimeout using let
function delayedLogWithLet() {
    for (let i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }
}
delayedLogWithLet(); // This will log 0, 1, 2