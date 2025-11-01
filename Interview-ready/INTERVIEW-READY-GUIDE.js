// ============================================
//  ULTIMATE JAVASCRIPT + MERN INTERVIEW GUIDE
// ============================================

/* 
 * This guide covers HOT INTERVIEW TOPICS that will make you 100% ready
 * Focus: Advanced JS Concepts + MERN Stack Integration
 */

// ============================================
// 1. EVENT LOOP - MOST ASKED! 
// ============================================

/*
 * HOW TO ANSWER:
 * "JavaScript is single-threaded, meaning it can execute one task at a time. 
 * The Event Loop is the mechanism that allows JavaScript to perform non-blocking 
 * asynchronous operations by offloading tasks to the browser APIs and managing 
 * their callbacks."
 * 
 * THEN EXPLAIN THE COMPONENTS:
 */

/*
 * COMPONENTS OF EVENT LOOP:
 * 
 * 1. CALL STACK (Execution Stack)
 *    - Where code executes (LIFO - Last In, First Out)
 *    - Synchronous code runs here
 *    - One task at a time
 * 
 * 2. WEB APIs (Browser APIs)
 *    - setTimeout, setInterval, fetch, DOM events
 *    - Handled by browser, not JavaScript engine
 *    - Run in parallel outside the Call Stack
 * 
 * 3. CALLBACK QUEUE (Task Queue / Macrotask Queue)
 *    - Holds callbacks from setTimeout, setInterval, DOM events
 *    - FIFO (First In, First Out)
 *    - Lower priority than Microtask Queue
 * 
 * 4. MICROTASK QUEUE (Job Queue)
 *    - Holds Promises (.then, .catch, .finally)
 *    - process.nextTick (Node.js), MutationObserver
 *    - HIGHER PRIORITY - executes before Callback Queue
 * 
 * 5. EVENT LOOP
 *    - Continuously monitors Call Stack and Queues
 *    - When Call Stack is empty:
 *      a) First, execute ALL Microtasks
 *      b) Then, execute ONE Macrotask
 *      c) Repeat
 */

// Example 1: Basic Event Loop Understanding
console.log('1. Start'); // Call Stack → Execute immediately

setTimeout(() => {
    console.log('2. Timeout'); // Callback Queue (Macrotask)
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise'); // Microtask Queue (Higher priority)
});

console.log('4. End'); // Call Stack → Execute immediately

// OUTPUT: 1. Start → 4. End → 3. Promise → 2. Timeout
// WHY? 
// 1. Sync code runs first (Start, End)
// 2. Microtasks run next (Promise)
// 3. Macrotasks run last (setTimeout)

// Example 2: Complex Event Loop (INTERVIEW FAVORITE)
console.log('A'); // 1. Call Stack

setTimeout(() => console.log('B'), 0); // 5. Macrotask Queue

Promise.resolve()
    .then(() => console.log('C')) // 3. Microtask Queue
    .then(() => console.log('D')); // 4. Microtask Queue (chained)

setTimeout(() => console.log('E'), 0); // 6. Macrotask Queue

console.log('F'); // 2. Call Stack

// OUTPUT: A → F → C → D → B → E

/*
EXECUTION BREAKDOWN:
1. "A" - Call Stack (sync)
2. setTimeout("B") - Sent to Web API, callback to Macrotask Queue
3. Promise.then("C") - Sent to Microtask Queue
4. setTimeout("E") - Sent to Web API, callback to Macrotask Queue
5. "F" - Call Stack (sync)
6. Call Stack empty! Event Loop checks Microtasks first
7. "C" - Execute from Microtask Queue
8. "D" - Chained Promise, execute from Microtask Queue
9. All Microtasks done! Now execute ONE Macrotask
10. "B" - Execute from Macrotask Queue
11. "E" - Execute from Macrotask Queue
*/

// Example 3: Tricky Interview Question
console.log('1');

setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
});

console.log('6');

// OUTPUT: 1 → 6 → 4 → 2 → 3 → 5

/*
EXPLANATION:
1. "1" - Sync
2. setTimeout - Macrotask Queue [callback with "2" and Promise "3"]
3. Promise "4" - Microtask Queue
4. "6" - Sync
5. Call Stack empty! Run Microtasks
6. "4" - Microtask executes, schedules setTimeout "5" to Macrotask Queue
7. Run ONE Macrotask: "2", which creates Microtask "3"
8. Run new Microtask: "3"
9. Run next Macrotask: "5"
*/

// Example 4: Real-World MERN Example - API Call
const fetchUserData = async () => {
    console.log('1. Fetch started'); // Sync
    
    try {
        const response = await fetch('/api/users'); // Microtask (Promise)
        console.log('2. Response received'); // After Promise resolves
        
        const data = await response.json(); // Microtask (Promise)
        console.log('3. Data parsed'); // After Promise resolves
        
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
};

// Example 5: Node.js Event Loop (process.nextTick)
// process.nextTick has HIGHEST priority (even higher than Promises!)
console.log('Start');

setTimeout(() => console.log('Timeout'), 0); // Macrotask

Promise.resolve().then(() => console.log('Promise')); // Microtask

process.nextTick(() => console.log('NextTick')); // Highest priority!

console.log('End');

// OUTPUT: Start → End → NextTick → Promise → Timeout

/*
SAY TO INTERVIEWER:
"The Event Loop is fundamental to understanding JavaScript's async behavior. 
Here's how I explain it:

1. JavaScript is single-threaded with one Call Stack
2. Async operations (fetch, setTimeout) are handled by Web APIs
3. Callbacks go to different queues based on their type
4. Event Loop constantly checks if Call Stack is empty
5. Priority order: Call Stack → Microtasks → Macrotasks

REAL-WORLD IMPLICATIONS:

In React:
- setState is async and batched (uses Microtasks internally)
- useEffect runs after render (scheduled as Microtask)
- Event handlers execute synchronously but state updates are async

In Node.js/Express:
- I/O operations are non-blocking (Event Loop handles them)
- Database queries return Promises (Microtasks)
- setTimeout/setInterval for delayed tasks (Macrotasks)

COMMON INTERVIEW QUESTIONS I'D EXPECT:
Q: Why setTimeout(fn, 0) doesn't run immediately?
A: It's added to Macrotask Queue, waits for Call Stack to clear + all Microtasks

Q: What's the difference between Microtask and Macrotask?
A: Microtasks (Promises) have higher priority, ALL Microtasks run before next Macrotask

Q: Can the Event Loop block?
A: Yes! Heavy synchronous code blocks the Call Stack (e.g., long for loop)

VISUALIZATION:
Call Stack: [currentFunction]
           ↓ (if empty)
Microtask Queue: [promise1, promise2] → Execute ALL
           ↓ (if empty)
Macrotask Queue: [setTimeout1] → Execute ONE
           ↓ (repeat)

This is why Promises resolve before setTimeout, even with 0ms delay!"
*/

// ============================================
// 2. ASYNC/AWAIT vs PROMISES 🔥
// ============================================

/*
 * ASYNC/AWAIT is syntactic sugar over Promises
 * Makes asynchronous code look synchronous
 */

// Promises Approach
function getUserPromise(id) {
    return fetch(`/api/users/${id}`)
        .then(response => response.json())
        .then(user => fetch(`/api/posts/${user.id}`))
        .then(response => response.json())
        .then(posts => {
            return { user, posts };
        })
        .catch(error => console.error(error));
}

// Async/Await Approach (CLEANER!)
async function getUserAsync(id) {
    try {
        const userResponse = await fetch(`/api/users/${id}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// INTERVIEW QUESTION: Handle Multiple Parallel Requests
// ❌ SLOW - Sequential
async function slowApproach() {
    const user = await fetch('/api/user');
    const posts = await fetch('/api/posts');
    const comments = await fetch('/api/comments');
    return [user, posts, comments];
}

// ✅ FAST - Parallel
async function fastApproach() {
    const [user, posts, comments] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/posts'),
        fetch('/api/comments')
    ]);
    return [user, posts, comments];
}

// MERN Example: Multiple MongoDB Queries
async function getDashboardData(userId) {
    try {
        const [user, orders, products] = await Promise.all([
            User.findById(userId),
            Order.find({ userId }),
            Product.find({ sellerId: userId })
        ]);
        
        return { user, orders, products };
    } catch (error) {
        throw new Error('Dashboard data fetch failed');
    }
}

// ============================================
// 3. CLOSURES - CRITICAL! 
// ============================================

/*
 * HOW TO ANSWER:
 * "A closure is a function that has access to variables in its outer (enclosing) 
 * lexical scope, even after the outer function has finished executing. Closures 
 * are created every time a function is created in JavaScript."
 * 
 * KEY POINTS TO MENTION:
 * 1. Functions remember their lexical scope
 * 2. Inner function has access to outer function's variables
 * 3. Creates data privacy/encapsulation
 * 4. Basis for many JS patterns (modules, callbacks, React hooks)
 */

// Example 1: Basic Closure - Understanding Scope Chain
function outerFunction() {
    const outerVar = 'I am from outer scope';
    
    function innerFunction() {
        console.log(outerVar); // Can access outerVar (closure!)
    }
    
    return innerFunction;
}

const myFunc = outerFunction(); // outerFunction executed and returned
myFunc(); // "I am from outer scope" - outerFunction finished, but variable still accessible!

/*
WHAT HAPPENED:
1. outerFunction() executes
2. Creates outerVar in its scope
3. Creates innerFunction (which "closes over" outerVar)
4. Returns innerFunction
5. outerFunction execution context is removed from Call Stack
6. BUT innerFunction still has reference to outerVar (closure!)
7. Garbage collector doesn't remove outerVar because it's still referenced
*/

// Example 2: Counter with Closure (Data Privacy)
function createCounter() {
    let count = 0; // Private variable - not accessible from outside!
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.count);       // undefined - Private!

// Can't access count directly - Data Encapsulation!
// Each instance has its own closure
const counter2 = createCounter();
console.log(counter2.getCount()); // 0 - Separate closure!

// Example 3: COMMON INTERVIEW TRAP - Loop with var
console.log('❌ WRONG WAY:');
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // What will this print?
    }, 1000);
}
// OUTPUT: 3, 3, 3 (NOT 0, 1, 2!)
// WHY? var is function-scoped, all setTimeout callbacks share same 'i'
// By the time they execute, loop finished and i = 3

console.log('✅ FIX 1 - Using let (block scope):');
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Creates new 'i' for each iteration
    }, 1000);
}
// OUTPUT: 0, 1, 2

console.log('✅ FIX 2 - Using IIFE (Immediately Invoked Function Expression):');
for (var i = 0; i < 3; i++) {
    (function(index) { // IIFE creates new scope
        setTimeout(function() {
            console.log(index);
        }, 1000);
    })(i); // Pass current i value
}
// OUTPUT: 0, 1, 2

console.log('✅ FIX 3 - Using closure explicitly:');
for (var i = 0; i < 3; i++) {
    setTimeout((function(index) {
        return function() {
            console.log(index);
        };
    })(i), 1000);
}

// Example 4: Real-World - Module Pattern (Pre-ES6)
const BankAccount = (function() {
    // Private variables
    let balance = 0;
    const transactionHistory = [];
    
    // Private function
    function recordTransaction(type, amount) {
        transactionHistory.push({
            type,
            amount,
            date: new Date()
        });
    }
    
    // Public API (closure over private variables)
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                recordTransaction('deposit', amount);
                return balance;
            }
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                recordTransaction('withdraw', amount);
                return balance;
            } else {
                return 'Insufficient funds';
            }
        },
        getBalance: function() {
            return balance;
        },
        getHistory: function() {
            return [...transactionHistory]; // Return copy, not reference
        }
    };
})(); // IIFE executes immediately

BankAccount.deposit(1000);
BankAccount.withdraw(500);
console.log(BankAccount.getBalance()); // 500
console.log(BankAccount.balance);      // undefined - Private!

// Example 5: React Hooks - useState Uses Closures!
// Simplified implementation showing how useState works
function useState(initialValue) {
    let state = initialValue; // Closure!
    
    function setState(newValue) {
        state = newValue;
        render(); // Trigger re-render
    }
    
    function getState() {
        return state;
    }
    
    return [getState, setState];
}

// React component using closure
function Counter() {
    const [count, setCount] = useState(0);
    
    function handleClick() {
        setCount(count + 1); // Closure over count
    }
    
    return <button onClick={handleClick}>{count}</button>;
}

// Example 6: MERN - Express Middleware Factory (Closure Pattern)
function createAuthMiddleware(requiredRole) {
    // Closure over requiredRole
    return function(req, res, next) {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    };
}

const adminOnly = createAuthMiddleware('admin');
const moderatorOnly = createAuthMiddleware('moderator');

app.get('/admin/users', adminOnly, getUsers);
app.get('/moderate/posts', moderatorOnly, getPosts);

// Example 7: Debounce Function (Closure for Timer)
function debounce(func, delay) {
    let timeoutId; // Closure! Persists across calls
    
    return function(...args) {
        const context = this;
        
        clearTimeout(timeoutId); // Clear previous timer
        
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// React usage
const SearchComponent = () => {
    const searchAPI = async (query) => {
        const response = await fetch(`/api/search?q=${query}`);
        return response.json();
    };
    
    const debouncedSearch = debounce(searchAPI, 500); // Closure over timeoutId
    
    return <input onChange={(e) => debouncedSearch(e.target.value)} />;
};

// Example 8: Function Factory (Closure for Configuration)
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier; // Closure over multiplier
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Example 9: STALE CLOSURE PROBLEM in React (IMPORTANT!)
function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        // ❌ STALE CLOSURE PROBLEM
        const interval = setInterval(() => {
            console.log(count); // Always logs 0! Closure over initial count
            setCount(count + 1); // Always sets to 1
        }, 1000);
        
        return () => clearInterval(interval);
    }, []); // Empty deps = closure over initial count
    
    // ✅ FIX 1: Include count in dependencies
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(count); // Updates with new count
            setCount(count + 1);
        }, 1000);
        
        return () => clearInterval(interval);
    }, [count]); // Re-create interval when count changes
    
    // ✅ FIX 2: Use functional update (BETTER!)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                console.log(prevCount); // Always has latest value
                return prevCount + 1;
            });
        }, 1000);
        
        return () => clearInterval(interval);
    }, []); // Can keep empty deps!
}

// Example 10: Memoization with Closure
function memoize(fn) {
    const cache = {}; // Closure! Persists across calls
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log('Returning cached result');
            return cache[key];
        }
        
        console.log('Calculating result');
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalculation = (n) => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i;
    }
    return sum;
};

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(1000000)); // Calculating result
console.log(memoizedCalc(1000000)); // Returning cached result

/*
SAY TO INTERVIEWER:
"Closures are everywhere in JavaScript and understanding them is crucial. 
Here's what I know:

DEFINITION:
A closure is created when a function is defined inside another function, 
giving the inner function access to the outer function's variables even 
after the outer function has returned.

HOW IT WORKS:
1. JavaScript creates a scope chain when functions are defined
2. Inner functions maintain references to outer scope variables
3. Garbage collector keeps these variables alive as long as closure exists

REAL-WORLD USES:

1. DATA PRIVACY (Module Pattern):
   - Create private variables/methods
   - Expose only public API
   - Before ES6 modules, this was the main pattern

2. REACT HOOKS:
   - useState, useEffect use closures internally
   - Event handlers close over component state
   - Common pitfall: Stale closures when forgetting dependencies

3. EVENT HANDLERS:
   - Callbacks close over surrounding scope
   - Useful for maintaining context in async operations

4. FUNCTION FACTORIES:
   - Create customized functions
   - Debounce, throttle, memoize
   - Middleware factories in Express

COMMON INTERVIEW QUESTIONS:

Q: Why does setTimeout in a loop print same value?
A: var is function-scoped, all callbacks share same variable. Use let or IIFE.

Q: What's the difference between closure and scope?
A: Scope is the visibility of variables. Closure is when a function remembers 
   its scope even after the outer function has returned.

Q: Can closures cause memory leaks?
A: Yes! If you keep references to large objects in closures unnecessarily. 
   Always clean up event listeners and clear timers.

PRACTICAL TIPS:
- Use closures for data encapsulation
- Be aware of memory implications
- Watch for stale closures in React (include all dependencies)
- Use functional updates in setState to avoid stale closures
- Closures are why we can use modules, callbacks, and higher-order functions

In my projects:
- Custom hooks in React (all use closures)
- Middleware factories in Express
- Debounced search inputs
- Private state in utility functions
- Event handlers with persistent state
"
*/

// ============================================
// 4. THIS KEYWORD - TRICKY! 🔥
// ============================================

/*
 * 'this' context depends on HOW a function is called
 * 1. Global context → window/global
 * 2. Object method → the object
 * 3. Constructor → new instance
 * 4. Arrow function → lexical this (parent scope)
 */

// Example 1: Object Method
const user = {
    name: 'John',
    greet: function() {
        console.log(`Hello, ${this.name}`);
    },
    greetArrow: () => {
        console.log(`Hello, ${this.name}`); // undefined!
    }
};

user.greet(); // "Hello, John"
user.greetArrow(); // "Hello, undefined" (arrow function doesn't have own 'this')

// Example 2: REACT Class Components
class UserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        
        // Must bind 'this' or use arrow function
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
    
    // Or use arrow function (auto-binds)
    handleClickArrow = () => {
        this.setState({ count: this.state.count + 1 });
    }
}

// Example 3: call, apply, bind
const person = { name: 'Alice' };

function introduce(age, city) {
    console.log(`I'm ${this.name}, ${age} years old from ${city}`);
}

introduce.call(person, 25, 'NYC');    // I'm Alice, 25 years old from NYC
introduce.apply(person, [25, 'NYC']); // Same result
const boundIntroduce = introduce.bind(person);
boundIntroduce(25, 'NYC');            // Same result

// ============================================
// 5. PROMISES - DEEP DIVE 🔥
// ============================================

/*
 * Promise States: pending → fulfilled / rejected
 * Always use .catch() or try/catch
 */

// Example 1: Creating Custom Promise
function fetchWithTimeout(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timeout'));
        }, timeout);
        
        fetch(url)
            .then(response => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

// Example 2: Promise Combinators (INTERVIEW FAVORITE!)

// Promise.all() - All must succeed
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => setTimeout(() => resolve('foo'), 100));

Promise.all([promise1, promise2, promise3])
    .then(values => console.log(values)); // [3, 42, "foo"]

// Promise.race() - First to settle wins
Promise.race([
    new Promise((resolve) => setTimeout(() => resolve('fast'), 100)),
    new Promise((resolve) => setTimeout(() => resolve('slow'), 500))
]).then(value => console.log(value)); // "fast"

// Promise.allSettled() - Wait for all, regardless of outcome
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success')
]).then(results => console.log(results));
// [{status: "fulfilled", value: "Success"}, 
//  {status: "rejected", reason: "Error"}, 
//  {status: "fulfilled", value: "Another Success"}]

// Promise.any() - First fulfilled promise
Promise.any([
    Promise.reject('Error 1'),
    Promise.resolve('Success'),
    Promise.reject('Error 2')
]).then(value => console.log(value)); // "Success"

// MERN Example: MongoDB Transaction with Promises
async function transferMoney(fromUserId, toUserId, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const opts = { session };
        
        await Account.updateOne(
            { userId: fromUserId },
            { $inc: { balance: -amount } },
            opts
        );
        
        await Account.updateOne(
            { userId: toUserId },
            { $inc: { balance: amount } },
            opts
        );
        
        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

// ============================================
// 6. PROTOTYPAL INHERITANCE 🔥
// ============================================

/*
 * JavaScript uses prototypal inheritance, not classical
 * Every object has a __proto__ property
 */

// Example 1: Prototype Chain
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log(`${this.name} barks!`);
};

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // "Rex makes a sound"
dog.bark();  // "Rex barks!"

// Example 2: ES6 Classes (Syntactic Sugar)
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static compareUsers(user1, user2) {
        return user1.name === user2.name;
    }
}

class Admin extends User {
    constructor(name, email, role) {
        super(name, email);
        this.role = role;
    }
    
    greet() {
        return `${super.greet()}. I'm an admin.`;
    }
}

// ============================================
// 7. DEBOUNCING & THROTTLING 🔥
// ============================================

/*
 * HOW TO ANSWER:
 * "Debouncing and throttling are performance optimization techniques that 
 * control how often a function executes. They're essential for handling 
 * frequent events like scrolling, resizing, or typing."
 * 
 * DEBOUNCING: Delay execution until after a pause in events
 * THROTTLING: Execute at most once per time interval
 */

// ============================================
// DEBOUNCING - "Wait for pause before executing"
// ============================================

/*
 * WHEN TO USE:
 * - Search input (wait until user stops typing)
 * - Window resize (wait until user finishes resizing)
 * - Form validation (wait until user stops typing)
 * - Auto-save (wait until user stops editing)
 */

// Implementation
function debounceFunction(func, delay) {
    let timeoutId; // Closure! Persists across calls
    
    return function(...args) {
        const context = this;
        
        // Clear previous timer
        clearTimeout(timeoutId);
        
        // Set new timer
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

/*
HOW IT WORKS:
1. User triggers event (e.g., typing)
2. Timer starts (e.g., 500ms)
3. User triggers again - RESET timer
4. User triggers again - RESET timer again
5. User stops - After 500ms of no activity, function executes
*/

// Example 1: Search Input (Most Common Use Case)
// WITHOUT Debouncing (BAD - API call on every keystroke!)
function searchAPI(query) {
    fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => console.log(data));
}

// User types "javascript" = 10 API calls! ❌
input.addEventListener('input', (e) => {
    searchAPI(e.target.value); // Too many calls!
});

// WITH Debouncing (GOOD - API call after user stops typing)
const debouncedSearch = debounceFunction(searchAPI, 500);

input.addEventListener('input', (e) => {
    debouncedSearch(e.target.value); // Only calls API after 500ms pause
});

// Example 2: React - Debounced Search
const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    // Search function
    const searchUsers = async (searchTerm) => {
        if (!searchTerm) return;
        
        const response = await fetch(`/api/users/search?q=${searchTerm}`);
        const data = await response.json();
        setResults(data);
    };
    
    // Debounced version
    const debouncedSearch = useCallback(
        debounceFunction((term) => searchUsers(term), 500),
        []
    );
    
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value); // Debounced API call
    };
    
    return (
        <div>
            <input value={query} onChange={handleChange} placeholder="Search..." />
            <ul>
                {results.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    );
};

// Example 3: Window Resize
let windowWidth = window.innerWidth;

// ❌ WITHOUT Debouncing - Fires 100s of times!
window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    updateLayout(windowWidth); // Called too many times!
});

// ✅ WITH Debouncing - Fires once after resize stops
const debouncedResize = debounceFunction(() => {
    windowWidth = window.innerWidth;
    updateLayout(windowWidth);
}, 250);

window.addEventListener('resize', debouncedResize);

// ============================================
// THROTTLING - "Execute at regular intervals"
// ============================================

/*
 * WHEN TO USE:
 * - Scroll events (update progress bar)
 * - Mouse movement tracking
 * - Button clicks (prevent spam)
 * - Infinite scroll (load more data)
 * - Game loop updates
 */

// Implementation
function throttleFunction(func, limit) {
    let inThrottle; // Flag to track if we're in throttle period
    
    return function(...args) {
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args); // Execute immediately
            inThrottle = true; // Set flag
            
            setTimeout(() => {
                inThrottle = false; // Reset flag after limit
            }, limit);
        }
        // If inThrottle is true, ignore this call
    };
}

/*
HOW IT WORKS:
1. Function executes immediately
2. Flag set to "in throttle mode"
3. Ignore all calls for next X milliseconds
4. After X milliseconds, allow next call
5. Repeat
*/

// Example 1: Infinite Scroll
// WITHOUT Throttling - Fires 100s of times!
window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 500;
    
    if (scrollPosition >= threshold) {
        loadMoreData(); // Called too many times!
    }
});

// WITH Throttling - Fires at most once per 300ms
const throttledScroll = throttleFunction(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 500;
    
    if (scrollPosition >= threshold) {
        loadMoreData(); // Called at most once per 300ms
    }
}, 300);

window.addEventListener('scroll', throttledScroll);

// Example 2: React - Scroll Progress Bar
const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    
    const calculateScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollProgress(progress);
    };
    
    useEffect(() => {
        const throttledCalculate = throttleFunction(calculateScroll, 100);
        
        window.addEventListener('scroll', throttledCalculate);
        
        return () => {
            window.removeEventListener('scroll', throttledCalculate);
        };
    }, []);
    
    return (
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
    );
};

// Example 3: Button Click Prevention (Avoid Double Submit)
const handleSubmit = throttleFunction(async (formData) => {
    await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData)
    });
}, 2000); // Can only submit once per 2 seconds

// Example 4: Mouse Position Tracker
let mousePosition = { x: 0, y: 0 };

// ❌ WITHOUT Throttling - Fires on every pixel movement!
document.addEventListener('mousemove', (e) => {
    mousePosition = { x: e.clientX, y: e.clientY };
    updateCursor(mousePosition); // Too many calls!
});

// ✅ WITH Throttling - Fires at most 60 times per second
const throttledMouseMove = throttleFunction((e) => {
    mousePosition = { x: e.clientX, y: e.clientY };
    updateCursor(mousePosition);
}, 16); // ~60fps (1000ms / 60 = 16.67ms)

document.addEventListener('mousemove', throttledMouseMove);

// ============================================
// DEBOUNCE vs THROTTLE - Visual Comparison
// ============================================

/*
SCENARIO: User scrolls for 3 seconds

Without optimization:
Event: ████████████████████████████████ (Fires 100+ times)

With DEBOUNCING (500ms):
Event: ────────────────────────────────█ (Fires once, 500ms after scroll stops)

With THROTTLING (500ms):
Event: █──────█──────█──────█──────█─── (Fires every 500ms while scrolling)

KEY DIFFERENCE:
- Debounce waits for pause, then executes ONCE
- Throttle executes at REGULAR INTERVALS while active
*/

// ============================================
// ADVANCED: Debounce with Immediate Execution
// ============================================

function debounceImmediate(func, delay, immediate = false) {
    let timeoutId;
    
    return function(...args) {
        const context = this;
        const callNow = immediate && !timeoutId;
        
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }, delay);
        
        if (callNow) {
            func.apply(context, args); // Execute immediately on first call
        }
    };
}

// Usage: Execute immediately, then debounce subsequent calls
const searchImmediate = debounceImmediate(searchAPI, 500, true);

// ============================================
// REAL-WORLD MERN EXAMPLES
// ============================================

// 1. Auto-save in Rich Text Editor
const AutoSaveEditor = () => {
    const [content, setContent] = useState('');
    
    const saveToServer = async (text) => {
        await fetch('/api/documents/save', {
            method: 'POST',
            body: JSON.stringify({ content: text })
        });
        console.log('Saved!');
    };
    
    const debouncedSave = useCallback(
        debounceFunction((text) => saveToServer(text), 1000),
        []
    );
    
    const handleChange = (e) => {
        const value = e.target.value;
        setContent(value);
        debouncedSave(value); // Auto-save after 1s of no typing
    };
    
    return <textarea value={content} onChange={handleChange} />;
};

// 2. Rate Limiting API Requests (Express Middleware)
const createRateLimiter = (maxRequests, timeWindow) => {
    const requests = new Map();
    
    return throttleFunction((req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
        const userRequests = requests.get(ip) || [];
        
        // Filter out old requests
        const recentRequests = userRequests.filter(time => now - time < timeWindow);
        
        if (recentRequests.length < maxRequests) {
            recentRequests.push(now);
            requests.set(ip, recentRequests);
            next();
        } else {
            res.status(429).json({ error: 'Too many requests' });
        }
    }, 1000);
};

// 3. Live Search with Loading State
const LiveSearch = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    
    const search = async (term) => {
        if (!term) {
            setResults([]);
            setLoading(false);
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch(`/api/search?q=${term}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    const debouncedSearch = useCallback(
        debounceFunction((term) => search(term), 300),
        []
    );
    
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        if (value) {
            setLoading(true); // Show loading immediately
        }
        
        debouncedSearch(value);
    };
    
    return (
        <div>
            <input value={query} onChange={handleChange} />
            {loading && <span>Searching...</span>}
            <ul>
                {results.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    );
};

/*
SAY TO INTERVIEWER:
"Debouncing and throttling are essential optimization techniques I use regularly:

DEBOUNCING:
- Purpose: Delay execution until activity stops
- Use cases: Search inputs, auto-save, form validation, resize events
- Benefit: Reduces API calls, prevents unnecessary renders
- Example: User types 'javascript' → Only 1 API call (not 10)

THROTTLING:
- Purpose: Limit execution to fixed intervals
- Use cases: Scroll events, mouse tracking, button spam prevention
- Benefit: Consistent performance, prevents overwhelming the system
- Example: Scroll event → Update at most 10 times/second (not 100+)

KEY DIFFERENCES:

Debounce = 'Wait until they stop'
- Search input: Wait until user stops typing
- Window resize: Wait until user stops resizing

Throttle = 'Do it regularly while they're active'
- Scroll tracking: Update progress bar every 100ms
- Infinite scroll: Check for more data every 200ms

IMPLEMENTATION TIPS:

1. Use closures to maintain timer state
2. Remember to clean up (clearTimeout)
3. Preserve 'this' context with .apply()
4. Use leading edge execution when needed (immediate flag)

REACT-SPECIFIC:

1. Wrap in useCallback to prevent recreation
2. Clean up in useEffect return
3. Consider lodash.debounce for production (edge cases handled)
4. Be careful with dependencies

PERFORMANCE IMPACT:

Without debouncing:
- User types 10 characters = 10 API calls ❌
- Page scroll = 500+ event fires ❌

With debouncing/throttling:
- User types 10 characters = 1 API call ✅
- Page scroll = 30 event fires ✅

REAL PROJECTS I'VE USED THEM:
- Debounce: Search autocomplete, form validation, auto-save editor
- Throttle: Infinite scroll, scroll progress, analytics tracking
- Both: Performance monitoring dashboards

Common mistake to avoid:
Creating new debounced function on every render (React)
❌ const debounced = debounce(fn, 500); // In component
✅ const debounced = useCallback(debounce(fn, 500), []); // Memoized
"
*/

// ============================================
// 8. CURRYING 🔥
// ============================================

/*
 * HOW TO ANSWER:
 * "Currying is a functional programming technique where a function with 
 * multiple arguments is transformed into a sequence of functions, each 
 * taking a single argument. It's named after mathematician Haskell Curry."
 * 
 * KEY CONCEPT: f(a, b, c) → f(a)(b)(c)
 */

// Example 1: Basic Currying - Manual
// Regular function
function addRegular(a, b, c) {
    return a + b + c;
}
console.log(addRegular(1, 2, 3)); // 6

// Curried version
function addCurried(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}
console.log(addCurried(1)(2)(3)); // 6

// Arrow function version (cleaner)
const addCurriedArrow = a => b => c => a + b + c;
console.log(addCurriedArrow(1)(2)(3)); // 6

// Example 2: Generic Curry Function
function curry(func) {
    return function curried(...args) {
        // If we have enough arguments, call the function
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            // Otherwise, return a new function that collects more arguments
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Usage
function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);

// All these work!
console.log(curriedSum(1)(2)(3));    // 6
console.log(curriedSum(1, 2)(3));    // 6
console.log(curriedSum(1)(2, 3));    // 6
console.log(curriedSum(1, 2, 3));    // 6

// Example 3: Practical Use Case - Logging
// Regular logger (repetitive)
function logRegular(level, module, message) {
    console.log(`[${level}] [${module}] ${message}`);
}

logRegular('ERROR', 'Database', 'Connection failed');
logRegular('ERROR', 'Database', 'Query timeout');
logRegular('ERROR', 'Auth', 'Invalid token');

// Curried logger (reusable)
const logCurried = level => module => message => {
    console.log(`[${level}] [${module}] ${message}`);
};

// Create specialized loggers
const errorLog = logCurried('ERROR');
const dbErrorLog = errorLog('Database');
const authErrorLog = errorLog('Auth');

// Now much cleaner!
dbErrorLog('Connection failed');
dbErrorLog('Query timeout');
authErrorLog('Invalid token');

// Example 4: MERN - API Request Builder
const apiRequest = method => url => data => options => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options
    });
};

// Create specialized request functions
const get = apiRequest('GET');
const post = apiRequest('POST');
const put = apiRequest('PUT');
const deleteReq = apiRequest('DELETE');

// Usage in your app
const getUsers = get('/api/users');
const createUser = post('/api/users');
const updateUser = put('/api/users/123');

// Now you can call them
getUsers(null)({ headers: { Authorization: 'Bearer token' } });
createUser({ name: 'John' })({ headers: { Authorization: 'Bearer token' } });

// Example 5: React - Event Handler with Parameters
// Problem: How to pass parameters to event handlers?

// ❌ BAD - Creates new function on every render
const TodoList = ({ todos, onDelete }) => {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                    {/* New function created every render! */}
                </li>
            ))}
        </ul>
    );
};

// ✅ BETTER - Using Currying
const TodoListCurried = ({ todos, onDelete }) => {
    // Curried delete handler
    const handleDelete = (id) => () => {
        onDelete(id);
    };
    
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={handleDelete(todo.id)}>Delete</button>
                    {/* Function created once per todo */}
                </li>
            ))}
        </ul>
    );
};

// Example 6: Express Middleware - Authorization
// Curried authorization middleware
const authorizeRole = (role) => (permission) => (req, res, next) => {
    if (req.user.role === role && req.user.permissions.includes(permission)) {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

// Create specialized middleware
const adminAuth = authorizeRole('admin');
const adminRead = adminAuth('read');
const adminWrite = adminAuth('write');

const moderatorAuth = authorizeRole('moderator');
const moderatorRead = moderatorAuth('read');

// Use in routes
app.get('/api/users', adminRead, getUsers);
app.post('/api/users', adminWrite, createUser);
app.get('/api/posts', moderatorRead, getPosts);

// Example 7: Partial Application (Related to Currying)
// Partial application vs Currying
// Partial: Apply some arguments now, rest later
// Currying: Always one argument at a time

function multiply(a, b, c) {
    return a * b * c;
}

// Partial application using bind
const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

// Partial application using closure
const partial = (fn, ...presetArgs) => {
    return (...laterArgs) => {
        return fn(...presetArgs, ...laterArgs);
    };
};

const multiplyBy5 = partial(multiply, 5);
console.log(multiplyBy5(2, 3)); // 30 (5 * 2 * 3)

// Example 8: Discount Calculator (E-commerce)
const calculatePrice = basePrice => discount => taxRate => {
    const afterDiscount = basePrice - (basePrice * discount / 100);
    const afterTax = afterDiscount + (afterDiscount * taxRate / 100);
    return afterTax;
};

// Create specialized calculators
const product100 = calculatePrice(100);
const with10PercentOff = product100(10);
const withTax = with10PercentOff(8);

console.log(withTax); // 97.2

// Or chain it
const finalPrice = calculatePrice(100)(10)(8); // 97.2

// Reusable discount calculators
const blackFridayDiscount = calculatePrice(100)(50); // 50% off
const regularPrice = calculatePrice(100)(0);         // No discount

console.log(blackFridayDiscount(8)); // 54 (with tax)
console.log(regularPrice(8));        // 108 (with tax)

// Example 9: MongoDB Query Builder
const queryBuilder = collection => filter => projection => options => {
    return collection
        .find(filter)
        .project(projection)
        .options(options);
};

// Create specialized queries
const userQuery = queryBuilder(db.collection('users'));
const activeUsers = userQuery({ status: 'active' });
const activeUsersWithEmail = activeUsers({ email: 1, name: 1 });

// Execute with options
activeUsersWithEmail({ limit: 10, sort: { createdAt: -1 } });

// Example 10: Compose and Pipe with Currying
// Compose: Right to left
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// Pipe: Left to right
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Curried utility functions
const add = x => y => x + y;
const multiply = x => y => x * y;
const subtract = x => y => y - x;

// Usage
const add5 = add(5);
const multiply3 = multiply(3);
const subtract2 = subtract(2);

// Compose: multiply by 3, then add 5, then subtract 2
const calculation1 = compose(subtract2, add5, multiply3);
console.log(calculation1(10)); // 33 ((10 * 3 = 30) + 5 = 35) - 2 = 33

// Pipe: subtract 2, then add 5, then multiply by 3
const calculation2 = pipe(subtract2, add5, multiply3);
console.log(calculation2(10)); // 39 ((10 - 2 = 8) + 5 = 13) * 3 = 39

/*
SAY TO INTERVIEWER:
"Currying is a powerful functional programming technique I use for creating 
reusable and composable functions.

DEFINITION:
Currying transforms a function with multiple parameters into a sequence of 
functions, each taking a single argument.

  Normal: f(a, b, c)
  Curried: f(a)(b)(c)

WHY USE CURRYING:

1. REUSABILITY:
   - Create specialized functions from generic ones
   - Avoid repeating common parameters
   
2. PARTIAL APPLICATION:
   - Apply some arguments now, rest later
   - Build up functionality incrementally
   
3. COMPOSITION:
   - Easier to compose curried functions
   - Better functional programming patterns
   
4. HIGHER-ORDER FUNCTIONS:
   - Works naturally with map, filter, reduce
   - Create powerful utility functions

REAL-WORLD EXAMPLES:

1. LOGGING SYSTEM:
   const log = level => module => message
   const errorLog = log('ERROR')
   const dbError = errorLog('Database')
   dbError('Connection failed')

2. API REQUEST BUILDER:
   const api = method => url => data => options
   const post = api('POST')
   const createUser = post('/api/users')
   createUser({ name: 'John' })({ headers: {...} })

3. AUTHORIZATION MIDDLEWARE:
   const authorize = role => permission => middleware
   const adminRead = authorize('admin')('read')
   app.get('/users', adminRead, handler)

4. REACT EVENT HANDLERS:
   const handleClick = id => () => deleteItem(id)
   <button onClick={handleClick(item.id)}>Delete</button>

5. PRICING CALCULATORS:
   const price = base => discount => tax
   const product = price(100)
   const discounted = product(10)
   const final = discounted(8)

CURRYING vs PARTIAL APPLICATION:

Currying: Always one argument at a time
  const add = a => b => c => a + b + c
  add(1)(2)(3)

Partial Application: Some arguments now, rest later
  const add = (a, b, c) => a + b + c
  const add1 = partial(add, 1)
  add1(2, 3)

ADVANTAGES:
✅ More reusable code
✅ Better composition
✅ Easier testing
✅ Clearer intent
✅ Avoids repetition

DISADVANTAGES:
❌ Can be harder to read for beginners
❌ More memory (creates intermediate functions)
❌ Stack trace can be complex
❌ Debugging can be tricky

LIBRARIES THAT USE CURRYING:
- Ramda (all functions auto-curried)
- Lodash/fp (functional programming variant)
- Redux (action creators)

IN MY PROJECTS:
- Custom hooks in React (curried hooks for reusability)
- Express middleware factories
- API request builders
- Validation functions
- Logger systems
- Price calculators

INTERVIEW TIP:
When explaining, use a simple real-world example first (like the logger), 
then show the technical implementation. This shows both understanding and 
practical application!"
*/

// ============================================
// 9. HIGHER-ORDER FUNCTIONS 🔥
// ============================================

/*
 * Function that takes a function as argument or returns a function
 */

// Example 1: Array Methods (map, filter, reduce)
const numbers = [1, 2, 3, 4, 5];

// map - Transform each element
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - Select elements
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce - Accumulate into single value
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// Example 2: Chaining
const result = numbers
    .filter(n => n > 2)
    .map(n => n * 2)
    .reduce((acc, n) => acc + n, 0); // (3+4+5)*2 = 24

// Example 3: Real MERN - Data Processing
const processOrders = (orders) => {
    return orders
        .filter(order => order.status === 'completed')
        .map(order => ({
            ...order,
            total: order.items.reduce((sum, item) => sum + item.price, 0)
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10); // Top 10 orders
};

// Example 4: Custom HOF
function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with`, args);
        const result = fn(...args);
        console.log(`Result:`, result);
        return result;
    };
}

const add = (a, b) => a + b;
const addWithLogging = withLogging(add);
addWithLogging(2, 3); // Logs: Calling add with [2, 3], Result: 5

// ============================================
// 10. MERN-SPECIFIC PATTERNS 🔥
// ============================================

// A. REACT CUSTOM HOOKS
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

// Usage
const UserProfile = ({ userId }) => {
    const { data, loading, error } = useFetch(`/api/users/${userId}`);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>{data.name}</div>;
};

// B. EXPRESS MIDDLEWARE PATTERN
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/api/users', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

// C. MONGODB AGGREGATION PIPELINE
const getTopProducts = async () => {
    return await Product.aggregate([
        { $match: { status: 'active' } },
        { $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews'
        }},
        { $addFields: {
            avgRating: { $avg: '$reviews.rating' }
        }},
        { $sort: { avgRating: -1 } },
        { $limit: 10 }
    ]);
};

// D. REACT CONTEXT + REDUCER PATTERN
const AuthContext = React.createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false
    });
    
    const login = async (credentials) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        const user = await response.json();
        dispatch({ type: 'LOGIN', payload: user });
    };
    
    return (
        <AuthContext.Provider value={{ ...state, login }}>
            {children}
        </AuthContext.Provider>
    );
};

// ============================================
// 11. COMMON INTERVIEW CODING CHALLENGES 🔥
// ============================================

// A. Deep Clone Object
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (hash.has(obj)) return hash.get(obj); // Handle circular reference
    
    const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], hash);
        }
    }
    
    return clone;
}

// B. Flatten Array
function flattenArray(arr, depth = Infinity) {
    if (depth === 0) return arr;
    
    return arr.reduce((acc, val) => {
        return acc.concat(
            Array.isArray(val) ? flattenArray(val, depth - 1) : val
        );
    }, []);
}

// Or use built-in
const nested = [1, [2, [3, [4]]]];
console.log(nested.flat(Infinity)); // [1, 2, 3, 4]

// C. Implement Promise.all
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;
                    
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}

// D. Memoization
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Example: Fibonacci with memoization
const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

// E. Event Emitter
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
    
    off(event, listenerToRemove) {
        if (this.events[event]) {
            this.events[event] = this.events[event]
                .filter(listener => listener !== listenerToRemove);
        }
    }
}

// ============================================
// 12. PERFORMANCE OPTIMIZATION 🔥
// ============================================

// A. React - useMemo & useCallback
const ExpensiveComponent = ({ data }) => {
    // Memoize expensive computation
    const processedData = useMemo(() => {
        return data.map(item => /* expensive operation */ item);
    }, [data]);
    
    // Memoize function to prevent re-renders
    const handleClick = useCallback(() => {
        console.log('Clicked');
    }, []);
    
    return <div>{processedData}</div>;
};

// B. React - Code Splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}

// C. Node.js - Clustering
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart worker
    });
} else {
    // Worker process - run Express app
    app.listen(3000);
}

// D. MongoDB - Indexing
// Create index for faster queries
userSchema.index({ email: 1 }); // Single field
userSchema.index({ firstName: 1, lastName: 1 }); // Compound

// E. Caching with Redis
const redis = require('redis');
const client = redis.createClient();

async function getUserWithCache(userId) {
    const cacheKey = `user:${userId}`;
    
    // Check cache first
    const cached = await client.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // Fetch from DB
    const user = await User.findById(userId);
    
    // Store in cache (expire in 1 hour)
    await client.setex(cacheKey, 3600, JSON.stringify(user));
    
    return user;
}

// ============================================
// 13. SECURITY BEST PRACTICES 🔥
// ============================================

// A. Prevent XSS (Cross-Site Scripting)
// Always sanitize user input
const sanitizeInput = (input) => {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

// B. JWT Authentication
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// C. Password Hashing
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// D. Rate Limiting (Express)
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// ============================================
// 14. COMMON MISTAKES TO AVOID ⚠️
// ============================================

// ❌ MISTAKE 1: Mutating state directly in React
// Wrong:
this.state.items.push(newItem);

// Correct:
this.setState({ items: [...this.state.items, newItem] });

// ❌ MISTAKE 2: Not handling Promise rejections
// Wrong:
fetch('/api/data').then(res => res.json());

// Correct:
fetch('/api/data')
    .then(res => res.json())
    .catch(error => console.error(error));

// ❌ MISTAKE 3: Memory leaks with event listeners
// Wrong:
useEffect(() => {
    window.addEventListener('scroll', handleScroll);
});

// Correct:
useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

// ❌ MISTAKE 4: Comparing objects/arrays with ===
console.log({} === {}); // false
console.log([] === []); // false

// Correct: Deep comparison
const isEqual = JSON.stringify(obj1) === JSON.stringify(obj2);
// Or use lodash: _.isEqual(obj1, obj2)

// ❌ MISTAKE 5: Not using environment variables
// Wrong:
const API_KEY = 'abc123secretkey';

// Correct:
const API_KEY = process.env.API_KEY;

// ============================================
// 15. QUICK REFERENCE - COMMON QUESTIONS 🎯
// ============================================

/*
 * HOW TO ANSWER: Use the STAR method
 * S - Situation: Context
 * T - Task: What needed to be done
 * A - Action: How you solved it
 * R - Result: Outcome + learning
 * 
 * ALWAYS: Give example, explain clearly, mention real-world use case
 */

// ============================================
// Q1: What is the difference between let, const, and var?
// ============================================

/*
HOW TO ANSWER:
"In JavaScript, we have three ways to declare variables, and they differ mainly 
in scope, hoisting, and reassignment capabilities."

THEN EXPLAIN WITH EXAMPLES:
*/

// var - Function Scoped, Hoisted, Can be Redeclared
function varExample() {
    console.log(x); // undefined (hoisted)
    var x = 5;
    
    if (true) {
        var x = 10; // Same variable!
        console.log(x); // 10
    }
    console.log(x); // 10 (no block scope)
}

// let - Block Scoped, Temporal Dead Zone, Cannot be Redeclared
function letExample() {
    // console.log(y); // ReferenceError (TDZ)
    let y = 5;
    
    if (true) {
        let y = 10; // Different variable!
        console.log(y); // 10
    }
    console.log(y); // 5 (block scoped)
}

// const - Block Scoped, Must be Initialized, Cannot be Reassigned
function constExample() {
    const z = 5;
    // z = 10; // TypeError
    
    const obj = { name: 'John' };
    obj.name = 'Jane'; // ✅ Allowed (object is mutable)
    // obj = {}; // ❌ Error (cannot reassign)
}

/*
SAY TO INTERVIEWER:
"In modern JavaScript, I prefer using const by default for values that won't 
be reassigned, let for values that will change, and avoid var completely 
because of its function-scoping and hoisting behavior which can lead to bugs."
*/

// ============================================
// Q2: What is hoisting?
// ============================================

/*
HOW TO ANSWER:
"Hoisting is JavaScript's default behavior of moving all declarations to the 
top of their scope during the compilation phase, before code execution."

IMPORTANT: Only declarations are hoisted, not initializations.
*/

// Function Declaration - Fully Hoisted
greet(); // ✅ Works!
function greet() {
    console.log('Hello');
}

// Function Expression - NOT Hoisted
// sayHi(); // ❌ ReferenceError
const sayHi = function() {
    console.log('Hi');
};

// Variable Hoisting
console.log(name); // undefined (declaration hoisted, not value)
var name = 'Alice';

// Temporal Dead Zone with let/const
// console.log(age); // ReferenceError
let age = 25;

/*
SAY TO INTERVIEWER:
"The key difference is that var is hoisted and initialized with undefined, 
while let and const are hoisted but remain in the Temporal Dead Zone until 
the actual declaration is reached. This is why accessing them before 
declaration throws a ReferenceError.

In practice, I always declare variables at the top of their scope to avoid 
confusion, and use function declarations when I need hoisting behavior."
*/

// ============================================
// Q3: Explain == vs === (Type Coercion)
// ============================================

/*
HOW TO ANSWER:
"JavaScript has two types of equality comparisons. Double equals performs 
type coercion before comparison, while triple equals compares both value 
and type without coercion."
*/

// == (Abstract Equality) - Performs Type Coercion
console.log(5 == '5');        // true (string '5' converted to number)
console.log(0 == false);      // true (false converted to 0)
console.log(null == undefined); // true (special case)
console.log('' == 0);         // true (empty string to 0)

// === (Strict Equality) - No Type Coercion
console.log(5 === '5');       // false (different types)
console.log(0 === false);     // false (different types)
console.log(null === undefined); // false (different types)

// TRICKY CASES
console.log([] == ![]); // true 😱
// Explanation: ![] is false, [] converts to 0, false converts to 0

console.log(NaN === NaN); // false (special case)
console.log(Object.is(NaN, NaN)); // true (better way)

/*
SAY TO INTERVIEWER:
"I always use === in my code because it's more predictable and prevents 
unexpected bugs from type coercion. The only exception is when checking 
for null or undefined together:

  if (value == null) // Catches both null and undefined
  
But even then, I prefer explicit checks:
  if (value === null || value === undefined)
  
For checking NaN, I use Number.isNaN() instead of comparison."
*/

// ============================================
// Q4: Explain call, apply, and bind
// ============================================

/*
HOW TO ANSWER:
"These are methods to control the 'this' context of a function. They're 
crucial for borrowing methods and setting explicit context."
*/

const person = {
    firstName: 'John',
    lastName: 'Doe'
};

function introduce(age, city) {
    console.log(`I'm ${this.firstName} ${this.lastName}, ${age} years old from ${city}`);
}

// call() - Invokes immediately with arguments list
introduce.call(person, 30, 'NYC');
// Output: I'm John Doe, 30 years old from NYC

// apply() - Invokes immediately with arguments array
introduce.apply(person, [30, 'NYC']);
// Output: Same as above

// bind() - Returns new function, doesn't invoke
const boundIntroduce = introduce.bind(person, 30);
boundIntroduce('NYC'); // I'm John Doe, 30 years old from NYC

// REAL-WORLD EXAMPLE
const button = {
    content: 'Click me',
    click: function() {
        console.log(this.content + ' clicked');
    }
};

// ❌ Problem: 'this' is lost
setTimeout(button.click, 1000); // undefined clicked

// ✅ Solution 1: bind
setTimeout(button.click.bind(button), 1000); // Click me clicked

// ✅ Solution 2: Arrow function (lexical this)
setTimeout(() => button.click(), 1000); // Click me clicked

/*
SAY TO INTERVIEWER:
"In React class components, I often use bind in the constructor to ensure 
event handlers maintain the correct 'this' context:

  this.handleClick = this.handleClick.bind(this);

Or I use arrow functions as class properties which automatically bind 'this'.

The key difference: call and apply execute immediately, bind returns a new 
function. Use call/apply when you need immediate execution with a specific 
context, and bind when you need a function reference to use later."
*/

// ============================================
// Q5: What is Event Bubbling and Capturing?
// ============================================

/*
HOW TO ANSWER:
"Event propagation in the DOM happens in three phases: capturing (top-down), 
target, and bubbling (bottom-up). Understanding this is crucial for event 
delegation and preventing unwanted behavior."
*/

// HTML Structure Example:
// <div id="parent">
//   <button id="child">Click me</button>
// </div>

// Event Bubbling (Default - bottom to top)
document.getElementById('child').addEventListener('click', (e) => {
    console.log('Child clicked');
});

document.getElementById('parent').addEventListener('click', (e) => {
    console.log('Parent clicked');
});
// Click child → Output: "Child clicked" then "Parent clicked"

// Event Capturing (top to bottom) - use third parameter 'true'
document.getElementById('parent').addEventListener('click', (e) => {
    console.log('Parent captured');
}, true);

// Stop Propagation
document.getElementById('child').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents bubbling to parent
    console.log('Child clicked');
});

// EVENT DELEGATION - Efficient way to handle multiple elements
document.getElementById('parent').addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        console.log('Button clicked:', e.target.textContent);
    }
});

/*
SAY TO INTERVIEWER:
"Event delegation is a powerful pattern I use frequently in React and vanilla JS. 
Instead of attaching listeners to every child element, I attach one listener to 
the parent and check e.target. This is more memory-efficient and works with 
dynamically added elements.

For example, in a todo list app, instead of adding onClick to each todo item, 
I add one listener to the ul and check which li was clicked. This prevents 
memory leaks and improves performance."
*/

// ============================================
// Q6: What is REST vs SPREAD operator?
// ============================================

/*
HOW TO ANSWER:
"Both use the same syntax (...) but serve opposite purposes. Spread expands 
an iterable, while Rest collects multiple elements into an array."
*/

// SPREAD - Expands/Spreads elements
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const user = { name: 'John', age: 30 };
const updatedUser = { ...user, city: 'NYC' }; // { name: 'John', age: 30, city: 'NYC' }

// Copying arrays/objects (shallow copy)
const arrCopy = [...arr1];
const objCopy = { ...user };

// REST - Collects multiple elements
function sum(...numbers) { // Collects all arguments into array
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

const { name, ...otherProps } = { name: 'John', age: 30, city: 'NYC' };
console.log(name); // 'John'
console.log(otherProps); // { age: 30, city: 'NYC' }

// REACT EXAMPLE
const Button = ({ onClick, children, ...otherProps }) => {
    return <button onClick={onClick} {...otherProps}>{children}</button>;
};
// Usage: <Button onClick={handleClick} disabled className="btn">Click</Button>

/*
SAY TO INTERVIEWER:
"I use spread operator constantly in React for immutable state updates:

  setState({ ...state, newProp: value })
  
And rest parameters for flexible function signatures and component props. 
It's important to note that spread creates a shallow copy, so nested objects 
need deep cloning if you want to avoid mutations."
*/

// ============================================
// Q7: Difference between map() and forEach()?
// ============================================

/*
HOW TO ANSWER:
"Both iterate over arrays, but map transforms and returns a new array, 
while forEach just executes a function without returning anything."
*/

const numbers = [1, 2, 3, 4, 5];

// forEach - Returns undefined, just iterates
const forEachResult = numbers.forEach(num => {
    console.log(num * 2);
});
console.log(forEachResult); // undefined

// map - Returns new transformed array
const mapResult = numbers.map(num => num * 2);
console.log(mapResult); // [2, 4, 6, 8, 10]

// forEach cannot be chained
// numbers.forEach().filter(); // ❌ Error

// map can be chained (functional programming)
const result = numbers
    .map(num => num * 2)
    .filter(num => num > 5)
    .reduce((acc, num) => acc + num, 0);

// PERFORMANCE: forEach is slightly faster (doesn't create new array)
// But map is more functional and immutable

/*
SAY TO INTERVIEWER:
"I use map when I need to transform data and get a new array back, especially 
in React for rendering lists:

  {users.map(user => <UserCard key={user.id} user={user} />)}

I use forEach when I just need to perform side effects like logging, updating 
DOM directly, or when I don't need the return value. 

Remember: forEach cannot break or return early. If you need that, use a 
traditional for loop or for...of."
*/

// ============================================
// Q8: What is Virtual DOM?
// ============================================

/*
HOW TO ANSWER:
"The Virtual DOM is a lightweight JavaScript representation of the actual DOM. 
React uses it to optimize DOM updates through a process called reconciliation."

EXPLAIN THE PROCESS:
1. State changes trigger re-render
2. React creates new Virtual DOM tree
3. React diffs (compares) new Virtual DOM with previous Virtual DOM
4. React calculates minimal changes needed
5. React batches and applies only those changes to real DOM
*/

// WHY IT'S FASTER:
// ❌ Direct DOM manipulation (slow)
for (let i = 0; i < 1000; i++) {
    document.getElementById('list').innerHTML += `<li>Item ${i}</li>`;
}
// Each operation causes reflow/repaint

// ✅ Virtual DOM approach (fast)
// React batches all changes, then updates DOM once

// RECONCILIATION ALGORITHM
// React uses 'key' prop to identify which items changed
const TodoList = ({ todos }) => {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
                // ✅ Stable key helps React track changes
                // ❌ Don't use index as key if list can reorder
            ))}
        </ul>
    );
};

/*
SAY TO INTERVIEWER:
"The Virtual DOM is React's secret sauce for performance. Instead of updating 
the real DOM on every change (which is expensive), React:

1. Keeps a virtual copy in memory
2. Compares the new virtual tree with the old one (diffing)
3. Calculates the minimum changes needed
4. Batch updates the real DOM

This is why React is so fast even with complex UIs. However, it's important 
to use proper keys in lists and avoid unnecessary re-renders with React.memo 
or useMemo for optimal performance.

Real-world impact: In a dashboard with 1000+ elements, Virtual DOM ensures 
only changed elements re-render, not the entire tree."
*/

// ============================================
// Q9: What are React Hooks? Explain top hooks.
// ============================================

/*
HOW TO ANSWER:
"Hooks are functions that let you use React features in functional components. 
They were introduced in React 16.8 to replace class components."
*/

// 1. useState - Manage local state
const Counter = () => {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(prev => prev + 1)}>Better</button>
            {/* ✅ Use callback form when new state depends on previous */}
        </div>
    );
};

// 2. useEffect - Side effects (API calls, subscriptions, DOM manipulation)
const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // This runs after component mounts and when userId changes
        fetchUser(userId).then(setUser);
        
        // Cleanup function (runs before unmount or next effect)
        return () => {
            cancelRequest();
        };
    }, [userId]); // Dependency array
    
    return <div>{user?.name}</div>;
};

// 3. useContext - Access context without prop drilling
const ThemeContext = React.createContext('light');

const ThemedButton = () => {
    const theme = useContext(ThemeContext);
    return <button className={theme}>Click</button>;
};

// 4. useRef - Access DOM or persist values without re-render
const InputFocus = () => {
    const inputRef = useRef(null);
    
    useEffect(() => {
        inputRef.current.focus(); // Direct DOM access
    }, []);
    
    return <input ref={inputRef} />;
};

// 5. useMemo - Memoize expensive computations
const ExpensiveList = ({ items }) => {
    const sortedItems = useMemo(() => {
        console.log('Sorting...');
        return items.sort((a, b) => a - b);
    }, [items]); // Only re-sort when items change
    
    return <ul>{sortedItems.map(item => <li key={item}>{item}</li>)}</ul>;
};

// 6. useCallback - Memoize functions (prevent re-creation)
const Parent = () => {
    const [count, setCount] = useState(0);
    
    const handleClick = useCallback(() => {
        console.log('Clicked');
    }, []); // Function won't be recreated on re-renders
    
    return <Child onClick={handleClick} />;
};

// 7. useReducer - Complex state logic (like Redux)
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

const CounterWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div>
            <p>{state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </div>
    );
};

/*
SAY TO INTERVIEWER:
"Hooks revolutionized React development. Before hooks, we needed class 
components for state and lifecycle methods. Now everything can be functional.

Key rules:
1. Only call hooks at the top level (not in loops/conditions)
2. Only call hooks in React functions
3. Always include all dependencies in useEffect

Common mistakes I avoid:
- Missing dependencies in useEffect → stale closures
- Not using useCallback for child component props → unnecessary re-renders
- Overusing useMemo/useCallback → premature optimization

In my projects, I also create custom hooks to share logic:
  useFetch, useAuth, useLocalStorage, useDebounce"
*/

// ============================================
// Q10: What is middleware in Express?
// ============================================

/*
HOW TO ANSWER:
"Middleware functions are the backbone of Express.js. They have access to 
the request and response objects and the next function in the request-response 
cycle. They can modify req/res, end the cycle, or pass control to next middleware."
*/

const express = require('express');
const app = express();

// 1. Application-level middleware (runs on every request)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Pass control to next middleware
});

// 2. Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// 3. Router-level middleware
const router = express.Router();
router.use('/api', (req, res, next) => {
    console.log('API route hit');
    next();
});

// 4. Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// CUSTOM MIDDLEWARE EXAMPLES

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Authorization middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests'
});

// Usage
app.get('/api/users', 
    authenticate, 
    authorize('admin', 'moderator'), 
    limiter,
    (req, res) => {
        // Route handler
    }
);

/*
SAY TO INTERVIEWER:
"Middleware is essential for Express apps. I use it for:

1. Authentication/Authorization - JWT verification
2. Logging - Request/response tracking
3. Error handling - Centralized error responses
4. Validation - Check request data before processing
5. Rate limiting - Prevent abuse
6. CORS - Handle cross-origin requests
7. Compression - gzip responses

The order matters! Middleware executes in the order it's defined. I always:
- Put body parsers early (express.json())
- Put error handlers last (4 parameters)
- Use next() to continue or send response to stop

Common pattern:
  app.use(cors())
  app.use(express.json())
  app.use(logger)
  app.use('/api', routes)
  app.use(errorHandler) // Last!
"
*/

// ============================================
// Q11: What is closure and give real-world example?
// ============================================

/*
HOW TO ANSWER:
"A closure is when a function remembers and accesses variables from its outer 
scope, even after the outer function has finished executing. This creates 
data privacy and enables powerful patterns."
*/

// Basic Example
function outerFunction() {
    const outerVar = 'I am from outer scope';
    
    function innerFunction() {
        console.log(outerVar); // Can access outerVar
    }
    
    return innerFunction;
}

const myFunc = outerFunction();
myFunc(); // "I am from outer scope" - outerFunction has finished, but variable still accessible!

// REAL-WORLD EXAMPLE 1: Data Privacy (Module Pattern)
const BankAccount = (initialBalance) => {
    let balance = initialBalance; // Private variable
    
    return {
        deposit: (amount) => {
            balance += amount;
            return balance;
        },
        withdraw: (amount) => {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return 'Insufficient funds';
        },
        getBalance: () => balance
    };
};

const myAccount = BankAccount(1000);
console.log(myAccount.getBalance()); // 1000
myAccount.deposit(500); // 1500
console.log(myAccount.balance); // undefined - Cannot access private variable!

// REAL-WORLD EXAMPLE 2: React Hooks (Simplified useState)
function createState() {
    let state; // Closure!
    
    function setState(newValue) {
        state = newValue;
        render(); // Trigger re-render
    }
    
    function getState() {
        return state;
    }
    
    return [getState, setState];
}

// REAL-WORLD EXAMPLE 3: Event Handlers
function setupButton(buttonId) {
    const clickCount = { count: 0 }; // Closure over this object
    
    document.getElementById(buttonId).addEventListener('click', function() {
        clickCount.count++;
        console.log(`Button clicked ${clickCount.count} times`);
    });
}

// REAL-WORLD EXAMPLE 4: Debounce/Throttle
function debounce(func, delay) {
    let timeoutId; // Closure!
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

const expensiveOperation = debounce(() => {
    console.log('API call');
}, 500);

/*
SAY TO INTERVIEWER:
"Closures are everywhere in JavaScript, especially in React:

1. Event handlers remember component state
2. Hooks like useState use closures to maintain state
3. Higher-order components wrap and remember props
4. Callbacks in useEffect close over dependencies

Common pitfall: Stale closures in useEffect
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setInterval(() => {
      console.log(count); // Always logs 0! Stale closure
    }, 1000);
  }, []); // Empty deps = closure over initial count
  
  Fix: Include count in deps or use functional update:
  setCount(prev => prev + 1);

Real projects: I use closures for creating private variables, factory functions, 
and custom hooks that maintain internal state."
*/

// ============================================
// Q12: Explain Promise.all, Promise.race, Promise.allSettled, Promise.any
// ============================================

/*
HOW TO ANSWER:
"These are Promise combinators that handle multiple promises differently. 
Choosing the right one depends on your use case."
*/

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);
const promiseError = Promise.reject('Error');

// 1. Promise.all() - All must succeed, fails fast
// Use when: All operations must complete successfully
Promise.all([promise1, promise2, promise3])
    .then(results => console.log(results)) // [1, 2, 3]
    .catch(error => console.log(error));

Promise.all([promise1, promiseError, promise3])
    .then(results => console.log(results))
    .catch(error => console.log(error)); // "Error" - Rejects immediately

// REAL USE CASE: Fetch multiple resources for dashboard
async function loadDashboard() {
    try {
        const [user, posts, notifications] = await Promise.all([
            fetch('/api/user'),
            fetch('/api/posts'),
            fetch('/api/notifications')
        ]);
        // All must succeed to continue
    } catch (error) {
        console.log('One request failed:', error);
    }
}

// 2. Promise.race() - First to settle (resolve or reject) wins
// Use when: You want the fastest response
Promise.race([
    fetch('https://api1.com/data'),
    fetch('https://api2.com/data'),
    new Promise((_, reject) => setTimeout(() => reject('Timeout'), 5000))
]).then(response => console.log('Fastest response:', response));

// REAL USE CASE: Request with timeout
function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}

// 3. Promise.allSettled() - Wait for all, regardless of outcome
// Use when: You need all results, even failures
Promise.allSettled([promise1, promiseError, promise3])
    .then(results => {
        console.log(results);
        // [
        //   { status: 'fulfilled', value: 1 },
        //   { status: 'rejected', reason: 'Error' },
        //   { status: 'fulfilled', value: 3 }
        // ]
    });

// REAL USE CASE: Batch operations where some can fail
async function deleteBatchUsers(userIds) {
    const results = await Promise.allSettled(
        userIds.map(id => deleteUser(id))
    );
    
    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    return { succeeded, failed };
}

// 4. Promise.any() - First to RESOLVE wins (ignores rejections)
// Use when: You need one successful result
Promise.any([promiseError, promise2, promise3])
    .then(result => console.log(result)); // 2 (first to resolve)

Promise.any([promiseError, Promise.reject('Error2')])
    .catch(error => console.log(error)); // AggregateError: All promises rejected

// REAL USE CASE: Redundant APIs (fallback)
async function fetchFromMultipleSources(endpoint) {
    return Promise.any([
        fetch(`https://api1.com${endpoint}`),
        fetch(`https://api2.com${endpoint}`),
        fetch(`https://api3.com${endpoint}`)
    ]);
    // Returns first successful response
}

/*
SAY TO INTERVIEWER:
"I choose based on the use case:

✅ Promise.all() - When all operations MUST succeed
  Example: Loading user profile + settings + preferences before showing page

✅ Promise.race() - When I need the fastest result or implement timeout
  Example: Request racing between CDNs, or adding timeout to fetch

✅ Promise.allSettled() - When I need all results regardless of success/failure
  Example: Bulk operations where I need to report success/failure count

✅ Promise.any() - When one success is enough (redundancy/fallback)
  Example: Multiple API endpoints, use whichever responds first successfully

In MERN apps, I commonly use Promise.all for parallel MongoDB queries to 
reduce request time, and Promise.race for implementing request timeouts."
*/

// ============================================
// Q13: What is the difference between null and undefined?
// ============================================

/*
HOW TO ANSWER:
"Both represent absence of value, but they're used in different contexts. 
undefined is JavaScript's default 'nothing', while null is intentional absence."
*/

// undefined - Variable declared but not assigned
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

// Function with no return
function noReturn() {}
console.log(noReturn()); // undefined

// Missing object property
const obj = { name: 'John' };
console.log(obj.age); // undefined

// Missing function parameter
function greet(name) {
    console.log(name); // undefined if not passed
}
greet();

// null - Intentional absence of value
let user = null; // Explicitly set to "no value"
console.log(typeof null); // "object" (JavaScript bug!)

// Checking for both
console.log(null == undefined);  // true (loose equality)
console.log(null === undefined); // false (strict equality)

// BEST PRACTICES
// ✅ Use null when you intentionally want "no value"
let selectedUser = null; // No user selected yet

// ✅ Check for both with loose equality
if (value == null) { // Catches both null and undefined
    console.log('No value');
}

// Or be explicit
if (value === null || value === undefined) {
    console.log('No value');
}

// Modern way: Nullish coalescing operator
const username = user?.name ?? 'Guest'; // Use 'Guest' if null or undefined

/*
SAY TO INTERVIEWER:
"Key differences:

1. undefined = JavaScript's default for uninitialized values
   null = Developer's explicit choice for 'no value'

2. typeof undefined = 'undefined'
   typeof null = 'object' (historical bug, kept for backwards compatibility)

3. In APIs, I return null for 'not found' scenarios:
   const user = await User.findById(id); // returns null if not found

4. In React, I use null to represent 'no render':
   return isLoading ? <Spinner /> : null;

5. Optional chaining (?.) stops at null/undefined:
   user?.profile?.avatar // Safe even if user or profile is null

In production code, I avoid undefined assignments and use null explicitly 
when I mean 'intentionally empty'."
*/

// ============================================
// Q14: Explain async/await and error handling
// ============================================

/*
HOW TO ANSWER:
"async/await is syntactic sugar over Promises that makes asynchronous code 
look and behave like synchronous code. It greatly improves readability."
*/

// WITHOUT async/await (Promise chains)
function getUserDataPromise(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => fetch(`/api/posts/${user.id}`))
        .then(response => response.json())
        .then(posts => ({ user, posts }))
        .catch(error => console.error(error));
}

// WITH async/await (much cleaner!)
async function getUserDataAsync(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw or handle
    }
}

// ERROR HANDLING PATTERNS

// Pattern 1: try/catch (recommended)
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        return null; // Or throw, depending on needs
    }
}

// Pattern 2: .catch() on await (less common)
async function fetchUserAlt(id) {
    const user = await fetch(`/api/users/${id}`)
        .then(res => res.json())
        .catch(error => {
            console.error(error);
            return null;
        });
    return user;
}

// Pattern 3: Go-style error handling
async function fetchUserGo(id) {
    try {
        const user = await fetch(`/api/users/${id}`).then(r => r.json());
        return [null, user]; // [error, data]
    } catch (error) {
        return [error, null]; // [error, data]
    }
}

// Usage
const [error, user] = await fetchUserGo(123);
if (error) {
    console.error(error);
} else {
    console.log(user);
}

// PARALLEL vs SEQUENTIAL

// ❌ SLOW - Sequential (waits for each)
async function slowFetch() {
    const user = await fetch('/api/user');     // Wait 1s
    const posts = await fetch('/api/posts');   // Wait 1s
    const comments = await fetch('/api/comments'); // Wait 1s
    // Total: 3 seconds
}

// ✅ FAST - Parallel
async function fastFetch() {
    const [user, posts, comments] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/posts'),
        fetch('/api/comments')
    ]);
    // Total: 1 second (all requests in parallel)
}

// REAL-WORLD EXAMPLE: Express route handler
app.get('/api/dashboard/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const [user, orders, stats] = await Promise.all([
            User.findById(userId),
            Order.find({ userId }),
            Stats.findOne({ userId })
        ]);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user, orders, stats });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// REACT EXAMPLE: useEffect with async
const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Can't make useEffect callback async directly
        // ❌ useEffect(async () => { ... }) // Wrong!
        
        // ✅ Correct: Define async function inside
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [userId]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return <div>{user?.name}</div>;
};

/*
SAY TO INTERVIEWER:
"async/await is my preferred way to handle asynchronous code because:

1. More readable than Promise chains
2. Error handling with try/catch (familiar pattern)
3. Easier debugging (better stack traces)
4. Works naturally with loops and conditionals

Key points I always remember:
- async functions ALWAYS return a Promise
- await only works inside async functions
- Always use try/catch for error handling
- Use Promise.all for parallel operations
- Don't use await in loops if operations can be parallel

Common mistake to avoid:
  // ❌ Sequential when could be parallel
  for (const id of userIds) {
    await processUser(id); // Waits for each
  }
  
  // ✅ Parallel processing
  await Promise.all(userIds.map(id => processUser(id)));

In my Express APIs, I wrap all route handlers with try/catch or use an 
asyncHandler middleware to avoid uncaught promise rejections."
*/

// ============================================
// Q15: What is the difference between cookies, localStorage, and sessionStorage?
// ============================================

/*
HOW TO ANSWER:
"All three store data on the client side, but they differ in capacity, 
lifetime, and server communication."
*/

// COMPARISON TABLE TO MENTION:
/*
                 Cookies          localStorage      sessionStorage
Size            4KB              5-10MB            5-10MB
Lifetime        Set expiry       Forever           Tab/window close
Server Access   Sent with HTTP   No                No
Scope           Domain           Domain/protocol   Tab/window
Storage API     document.cookie  localStorage API  sessionStorage API
*/

// 1. COOKIES - Old way, sent with every HTTP request
// Set cookie
document.cookie = "username=John; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Read cookie
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Delete cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

// SECURITY FLAGS
document.cookie = "token=abc123; HttpOnly; Secure; SameSite=Strict";
// HttpOnly: Not accessible via JavaScript (prevents XSS)
// Secure: Only sent over HTTPS
// SameSite: Prevents CSRF attacks

// 2. localStorage - Persistent storage (survives browser restart)
// Set item
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));

// Get item
const user = JSON.parse(localStorage.getItem('user'));

// Remove item
localStorage.removeItem('user');

// Clear all
localStorage.clear();

// Check if key exists
if (localStorage.getItem('theme')) {
    applyTheme(localStorage.getItem('theme'));
}

// REACT EXAMPLE: Persist user preferences
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });
    
    const setStoredValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };
    
    return [value, setStoredValue];
};

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');

// 3. sessionStorage - Temporary storage (cleared on tab close)
sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
const savedCart = JSON.parse(sessionStorage.getItem('cartItems'));

// REAL-WORLD USE CASES

// Cookies: Authentication tokens (sent with every request)
// ✅ Good for: JWT tokens, session IDs, user preferences
app.post('/login', (req, res) => {
    const token = generateToken(user);
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
});

// localStorage: Persistent user data
// ✅ Good for: User preferences, theme, cached data, form drafts
const saveFormDraft = (formData) => {
    localStorage.setItem('formDraft', JSON.stringify(formData));
};

// sessionStorage: Temporary session data
// ✅ Good for: Multi-step forms, temporary filters, one-time data
const saveWizardProgress = (step, data) => {
    sessionStorage.setItem(`wizard_step${step}`, JSON.stringify(data));
};

// EVENT LISTENER: Sync across tabs (localStorage only)
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        applyTheme(e.newValue);
    }
});
// This fires when localStorage changes in another tab!

/*
SAY TO INTERVIEWER:
"I choose storage based on requirements:

🍪 COOKIES when:
- Need server access (authentication)
- Small data (<4KB)
- Need to set expiry
- Example: JWT tokens, session IDs

💾 localStorage when:
- Need persistent storage
- Don't need server access
- Larger data (<10MB)
- Example: User preferences, cached data, offline support

📝 sessionStorage when:
- Need temporary storage
- Data only relevant for current tab
- Don't want data to persist after tab close
- Example: Multi-step forms, temporary filters

SECURITY CONSIDERATIONS:
- Never store sensitive data in localStorage/sessionStorage (anyone can access)
- Use HttpOnly cookies for tokens (prevents XSS)
- Always validate and sanitize data from storage
- Be aware of storage quota limits

In my MERN apps:
- JWT in HttpOnly cookie for authentication
- User preferences in localStorage
- Form wizards in sessionStorage
- Large files/images in IndexedDB (not these three)"
*/

// ============================================
// 16. ARROW FUNCTIONS vs REGULAR FUNCTIONS 🔥
// ============================================

/*
 * HOW TO ANSWER:
 * "Arrow functions were introduced in ES6 and they differ from regular functions 
 * in several important ways, especially regarding 'this' binding, arguments object, 
 * and constructor behavior."
 */

// Example 1: 'this' Binding - MOST IMPORTANT DIFFERENCE!

// Regular function - 'this' depends on how it's called
const obj1 = {
    name: 'Regular',
    greet: function() {
        console.log(this.name); // 'this' refers to obj1
    }
};
obj1.greet(); // "Regular"

const greetRegular = obj1.greet;
greetRegular(); // undefined (this refers to global/window)

// Arrow function - 'this' is lexically bound (from parent scope)
const obj2 = {
    name: 'Arrow',
    greet: () => {
        console.log(this.name); // 'this' refers to parent scope, NOT obj2
    }
};
obj2.greet(); // undefined (arrow functions don't have own 'this')

// Example 2: React Class Components - When to Use Each
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        
        // ❌ Problem: Regular function loses 'this' context
        // this.handleClick = this.handleClick.bind(this); // Must bind!
    }
    
    // Regular function - needs binding
    handleClickRegular() {
        this.setState({ count: this.state.count + 1 });
    }
    
    // ✅ Arrow function - automatically binds 'this'
    handleClickArrow = () => {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return (
            <div>
                <button onClick={this.handleClickArrow}>Click</button>
            </div>
        );
    }
}

// Example 3: Arguments Object
// Regular function - has 'arguments' object
function regularSum() {
    console.log(arguments); // [1, 2, 3, 4]
    return Array.from(arguments).reduce((a, b) => a + b, 0);
}
console.log(regularSum(1, 2, 3, 4)); // 10

// Arrow function - NO 'arguments' object
const arrowSum = () => {
    // console.log(arguments); // ReferenceError!
};

// Use rest parameters instead
const arrowSumCorrect = (...args) => {
    console.log(args); // [1, 2, 3, 4]
    return args.reduce((a, b) => a + b, 0);
};
console.log(arrowSumCorrect(1, 2, 3, 4)); // 10

// Example 4: Constructor - Arrow functions CANNOT be constructors
// Regular function - can be used as constructor
function PersonRegular(name) {
    this.name = name;
}
const john = new PersonRegular('John'); // ✅ Works

// Arrow function - CANNOT be constructor
const PersonArrow = (name) => {
    this.name = name;
};
// const jane = new PersonArrow('Jane'); // ❌ TypeError: PersonArrow is not a constructor

// Example 5: Prototype
// Regular function - has prototype
function Dog() {}
console.log(Dog.prototype); // {constructor: ƒ}

// Arrow function - NO prototype
const Cat = () => {};
console.log(Cat.prototype); // undefined

// Example 6: When to Use Each - Callbacks
const numbers2 = [1, 2, 3, 4, 5];

// ✅ Arrow functions are perfect for array methods
const doubled = numbers2.map(n => n * 2);
const evens = numbers2.filter(n => n % 2 === 0);
const sum2 = numbers2.reduce((acc, n) => acc + n, 0);

// Example 7: Event Handlers
const button = document.querySelector('button');

// Regular function - 'this' refers to button element
button.addEventListener('click', function() {
    console.log(this); // <button> element
    this.classList.add('clicked');
});

// Arrow function - 'this' refers to outer scope
button.addEventListener('click', () => {
    console.log(this); // window/global (not the button!)
    // this.classList.add('clicked'); // ❌ Won't work as expected
});

// Example 8: Object Methods - When NOT to Use Arrow Functions
const calculator = {
    value: 0,
    
    // ❌ DON'T use arrow function for methods
    addArrow: (n) => {
        this.value += n; // 'this' doesn't refer to calculator!
        return this;
    },
    
    // ✅ DO use regular function for methods
    addRegular: function(n) {
        this.value += n; // 'this' refers to calculator
        return this;
    }
};

calculator.addRegular(5);
console.log(calculator.value); // 5

// Example 9: Returning Objects - Arrow Function Gotcha
// ❌ Wrong - returns undefined (thinks {} is function body)
const getUser1 = () => { name: 'John' };

// ✅ Correct - wrap in parentheses
const getUser2 = () => ({ name: 'John' });

// Example 10: React - When to Use Arrow Functions
const ReactComponent = () => {
    const [items, setItems] = useState([]);
    
    // ✅ Arrow function for event handlers in functional components
    const handleClick = () => {
        console.log('Clicked');
    };
    
    // ✅ Arrow function in useEffect
    useEffect(() => {
        fetchData();
        
        return () => {
            cleanup(); // Cleanup function
        };
    }, []);
    
    // ✅ Arrow functions in JSX
    return (
        <div>
            {items.map(item => (
                <div key={item.id} onClick={() => handleDelete(item.id)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

/*
SAY TO INTERVIEWER:
"Arrow functions and regular functions have important differences:

KEY DIFFERENCES:

1. 'THIS' BINDING (Most Important!):
   - Regular: Dynamic 'this' (depends on how called)
   - Arrow: Lexical 'this' (from parent scope)
   
   Use regular when you need dynamic 'this' (object methods, event handlers)
   Use arrow when you want to preserve outer 'this' (callbacks, React)

2. ARGUMENTS OBJECT:
   - Regular: Has 'arguments' object
   - Arrow: No 'arguments', use rest parameters (...args)

3. CONSTRUCTOR:
   - Regular: Can be used with 'new'
   - Arrow: Cannot be constructor

4. PROTOTYPE:
   - Regular: Has prototype property
   - Arrow: No prototype

5. SYNTAX:
   - Arrow: More concise
   - Regular: More verbose

WHEN TO USE ARROW FUNCTIONS:
✅ Array methods (map, filter, reduce)
✅ Callbacks and Promise chains
✅ React functional components
✅ When you need lexical 'this'
✅ Short, simple functions

WHEN TO USE REGULAR FUNCTIONS:
✅ Object methods
✅ Constructors
✅ When you need 'arguments' object
✅ When you need dynamic 'this'
✅ Event handlers needing element reference

REACT-SPECIFIC:
- Class components: Use arrow functions for auto-binding
- Functional components: Both work, arrow is common
- Event handlers: Arrow functions to avoid binding issues

COMMON MISTAKES:
❌ Using arrow functions for object methods
❌ Trying to use 'new' with arrow functions
❌ Expecting 'arguments' in arrow functions
❌ Using arrow functions when you need dynamic 'this'

In my projects:
- Arrow functions: 90% of the time (callbacks, React, array methods)
- Regular functions: Object methods, constructors, when I need 'this' binding
"
*/

// ============================================
// 17. SCOPE & SCOPE CHAIN 🔥
// ============================================

/*
 * HOW TO ANSWER:
 * "Scope determines the accessibility of variables in JavaScript. It's where 
 * variables and functions are accessible in your code. JavaScript uses lexical 
 * scoping, meaning scope is determined at write-time, not run-time."
 */

// TYPES OF SCOPE:
// 1. Global Scope
// 2. Function Scope
// 3. Block Scope (ES6+)
// 4. Module Scope (ES6 modules)

// Example 1: Global Scope
var globalVar = 'I am global';
let globalLet = 'I am also global';

function testGlobal() {
    console.log(globalVar); // Accessible
    console.log(globalLet); // Accessible
}

// Example 2: Function Scope (var, function declarations)
function functionScopeExample() {
    var functionVar = 'I am function-scoped';
    
    if (true) {
        var functionVar2 = 'I am also function-scoped';
        console.log(functionVar); // Accessible
    }
    
    console.log(functionVar2); // ✅ Accessible (var is function-scoped)
}

// console.log(functionVar); // ❌ ReferenceError (not in global scope)

// Example 3: Block Scope (let, const)
function blockScopeExample() {
    if (true) {
        let blockLet = 'I am block-scoped';
        const blockConst = 'I am also block-scoped';
        var blockVar = 'I am function-scoped';
        
        console.log(blockLet); // ✅ Accessible
    }
    
    // console.log(blockLet); // ❌ ReferenceError (block-scoped)
    console.log(blockVar);    // ✅ Accessible (function-scoped)
}

// Example 4: Scope Chain - Nested Functions
const outerVar = 'outer';

function outer() {
    const middleVar = 'middle';
    
    function middle() {
        const innerVar = 'inner';
        
        function inner() {
            // Can access all outer scopes!
            console.log(outerVar);   // ✅ outer
            console.log(middleVar);  // ✅ middle
            console.log(innerVar);   // ✅ inner
        }
        
        inner();
        // console.log(innerVar); // ❌ Can't access inner scope
    }
    
    middle();
}

outer();

/*
SCOPE CHAIN LOOKUP:
1. Check current scope
2. If not found, check parent scope
3. Keep going up the chain
4. If not found in global scope → ReferenceError
*/

// Example 5: Lexical Scoping (Scope at Write-Time)
function lexicalExample() {
    const message = 'Hello';
    
    function inner() {
        console.log(message); // Looks up scope chain
    }
    
    return inner;
}

const myFunc2 = lexicalExample();
myFunc2(); // "Hello" - remembers lexical scope

// Example 6: Common Interview Trap - Loop with var
console.log('Scope trap:');
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // What will this print?
    }, 1000);
}
// Output: 3, 3, 3 (var is function-scoped, shared by all callbacks)

// Fix 1: Use let (block-scoped)
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 0, 1, 2
    }, 1000);
}

// Fix 2: IIFE to create new scope
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(() => {
            console.log(index); // 0, 1, 2
        }, 1000);
    })(i);
}

// Example 7: Shadowing - Variable with Same Name in Inner Scope
const name1 = 'Global';

function shadowingExample() {
    const name1 = 'Function';
    
    if (true) {
        const name1 = 'Block';
        console.log(name1); // "Block" (shadows outer scopes)
    }
    
    console.log(name1); // "Function" (block scope doesn't affect this)
}

shadowingExample();
console.log(name1); // "Global"

// Example 8: Module Scope (ES6 Modules)
// Each module has its own scope
// file1.js
const privateVar = 'Private to module';
export const publicVar = 'Public';

// file2.js
// import { publicVar } from './file1.js';
// console.log(publicVar); // ✅ Works
// console.log(privateVar); // ❌ Not accessible

// Example 9: IIFE (Immediately Invoked Function Expression) - Create Scope
(function() {
    const privateVariable = 'I am private';
    
    // This variable is not accessible outside
})();

// console.log(privateVariable); // ❌ ReferenceError

// Example 10: React - Scope in Hooks
function ReactScopeExample() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        // This closure has access to 'count' from outer scope
        console.log(count);
        
        const interval = setInterval(() => {
            // Closure over 'count' - might be stale!
            console.log(count);
        }, 1000);
        
        return () => clearInterval(interval);
    }, [count]); // Include in dependencies to avoid stale closures
}

/*
SAY TO INTERVIEWER:
"Scope is fundamental to understanding JavaScript behavior.

TYPES OF SCOPE:

1. GLOBAL SCOPE:
   - Accessible everywhere
   - Variables declared outside functions
   - Avoid polluting global scope

2. FUNCTION SCOPE:
   - Variables accessible within function
   - var and function declarations
   - Each function creates new scope

3. BLOCK SCOPE:
   - Variables accessible within {}
   - let and const (ES6+)
   - if, for, while blocks

4. MODULE SCOPE:
   - Each ES6 module has own scope
   - Encapsulation by default

SCOPE CHAIN:
- JavaScript looks up the scope chain to find variables
- Starts in current scope, goes to parent, then global
- If not found → ReferenceError

LEXICAL SCOPING:
- Scope determined at write-time, not run-time
- Functions remember their creation scope (closures!)
- Nested functions can access outer variables

KEY DIFFERENCES:

var:
- Function-scoped
- Hoisted (can use before declaration)
- Can redeclare

let/const:
- Block-scoped
- Temporal Dead Zone (can't use before declaration)
- Cannot redeclare

COMMON PITFALLS:

1. Loop with var:
   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i)); // 3, 3, 3
   }
   Fix: Use let

2. Accidental global:
   function test() {
     x = 5; // Forgot var/let/const → global!
   }
   Fix: Use strict mode, declare variables

3. Shadowing confusion:
   const x = 1;
   if (true) {
     const x = 2; // Different variable!
   }

BEST PRACTICES:
✅ Use const by default
✅ Use let when you need to reassign
✅ Avoid var (use let/const)
✅ Minimize global variables
✅ Use modules for encapsulation
✅ Be aware of scope chain for closures

IN REACT:
- Hooks create closures over component scope
- Be careful with stale closures in useEffect
- Include all dependencies to avoid bugs

Real projects:
- Module scope for private helper functions
- Block scope in conditionals and loops
- Closures for data privacy
- Avoid global scope pollution
"
*/

// ============================================
// 18. DEEP COPY vs SHALLOW COPY 🔥
// ============================================

/*
 * HOW TO ANSWER:
 * "When copying objects or arrays in JavaScript, we can do either a shallow 
 * copy (copies only the first level) or a deep copy (copies all nested levels). 
 * This is crucial for avoiding unintended mutations, especially in React."
 */

// Example 1: Shallow Copy - Primitives vs References
// Primitives (copied by value)
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (not affected)

// Objects (copied by reference)
let obj3 = { name: 'John' };
let obj4 = obj3; // Reference copy
obj4.name = 'Jane';
console.log(obj3.name); // "Jane" (affected!)

// Example 2: Shallow Copy Methods

// Method 1: Spread operator (...)
const original = { name: 'John', age: 30 };
const shallowCopy1 = { ...original };

shallowCopy1.name = 'Jane';
console.log(original.name); // "John" (not affected)

// Method 2: Object.assign()
const shallowCopy2 = Object.assign({}, original);

// Method 3: Array.slice()
const arr1 = [1, 2, 3];
const arrCopy1 = arr1.slice();

// Method 4: Array spread
const arrCopy2 = [...arr1];

// Example 3: Problem with Shallow Copy - Nested Objects
const person1 = {
    name: 'John',
    address: {
        city: 'NYC',
        country: 'USA'
    }
};

const person2 = { ...person1 }; // Shallow copy

person2.name = 'Jane';
console.log(person1.name); // "John" ✅ Not affected

person2.address.city = 'LA';
console.log(person1.address.city); // "LA" ❌ Affected! (nested object is still referenced)

// Example 4: Deep Copy Methods

// Method 1: JSON.parse(JSON.stringify()) - Simple but has limitations
const deepCopy1 = JSON.parse(JSON.stringify(person1));

deepCopy1.address.city = 'Boston';
console.log(person1.address.city); // "LA" ✅ Not affected

// Limitations of JSON method:
const problematic = {
    date: new Date(),
    func: () => console.log('hi'),
    undefined: undefined,
    symbol: Symbol('id'),
    circular: null
};
problematic.circular = problematic; // Circular reference

// const copy = JSON.parse(JSON.stringify(problematic));
// - date becomes string
// - func is lost
// - undefined is lost
// - symbol is lost
// - circular reference throws error

// Method 2: Recursive Deep Clone (Proper Way)
function deepClone(obj, hash = new WeakMap()) {
    // Handle primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle circular references
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    
    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj);
    }
    
    // Handle Array
    if (Array.isArray(obj)) {
        const arrCopy = [];
        hash.set(obj, arrCopy);
        
        obj.forEach((item, index) => {
            arrCopy[index] = deepClone(item, hash);
        });
        
        return arrCopy;
    }
    
    // Handle Object
    const objCopy = {};
    hash.set(obj, objCopy);
    
    Object.keys(obj).forEach(key => {
        objCopy[key] = deepClone(obj[key], hash);
    });
    
    return objCopy;
}

// Usage
const complex = {
    name: 'John',
    hobbies: ['reading', 'coding'],
    address: {
        city: 'NYC',
        coordinates: { lat: 40, lng: -74 }
    }
};

const deepCopied = deepClone(complex);
deepCopied.address.coordinates.lat = 50;
console.log(complex.address.coordinates.lat); // 40 ✅ Not affected

// Method 3: Using structuredClone (Modern Browsers)
// const deepCopy3 = structuredClone(complex);

// Method 4: Lodash (Production-Ready)
// const _ = require('lodash');
// const deepCopy4 = _.cloneDeep(complex);

// Example 5: React - Immutable State Updates

// ❌ WRONG - Mutates state directly
const Component1 = () => {
    const [user, setUser] = useState({ name: 'John', address: { city: 'NYC' } });
    
    const updateCity = () => {
        user.address.city = 'LA'; // ❌ Direct mutation
        setUser(user); // Won't trigger re-render!
    };
};

// ✅ CORRECT - Shallow copy (if only one level deep)
const Component2 = () => {
    const [user, setUser] = useState({ name: 'John', age: 30 });
    
    const updateName = () => {
        setUser({ ...user, name: 'Jane' }); // ✅ New object
    };
};

// ✅ CORRECT - Deep copy for nested objects
const Component3 = () => {
    const [user, setUser] = useState({ 
        name: 'John', 
        address: { city: 'NYC' } 
    });
    
    const updateCity = () => {
        setUser({
            ...user,
            address: {
                ...user.address,
                city: 'LA'
            }
        }); // ✅ Deep copy
    };
};

// Example 6: Array Mutations in React
const TodoApp = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React' },
        { id: 2, text: 'Build App' }
    ]);
    
    // ❌ WRONG - Mutates array
    const addTodoWrong = (text) => {
        todos.push({ id: 3, text }); // ❌ Mutation
        setTodos(todos);
    };
    
    // ✅ CORRECT - Creates new array
    const addTodoCorrect = (text) => {
        setTodos([...todos, { id: 3, text }]); // ✅ New array
    };
    
    // ✅ CORRECT - Update nested object in array
    const updateTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, text: newText } // ✅ New object
                : todo
        ));
    };
    
    // ✅ CORRECT - Delete from array
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
};

// Example 7: Immer Library (React State Management)
// import produce from 'immer';

const ComponentWithImmer = () => {
    const [state, setState] = useState({
        user: { name: 'John', address: { city: 'NYC' } }
    });
    
    const updateCity = () => {
        // setState(produce(state, draft => {
        //     draft.user.address.city = 'LA'; // Looks like mutation, but creates copy!
        // }));
    };
};

/*
SAY TO INTERVIEWER:
"Understanding copy operations is critical for React and avoiding bugs.

SHALLOW COPY:
- Copies only the first level
- Nested objects/arrays are still referenced
- Methods: spread (...), Object.assign(), Array.slice()

Example:
  const copy = { ...original };
  copy.nested.value = 'changed'; // ❌ Affects original!

DEEP COPY:
- Copies all levels recursively
- Completely independent copy
- Methods: JSON.parse(JSON.stringify()), custom recursive function, structuredClone, Lodash

Example:
  const copy = JSON.parse(JSON.stringify(original));
  copy.nested.value = 'changed'; // ✅ Doesn't affect original

WHEN TO USE EACH:

Shallow Copy:
✅ Simple objects (one level)
✅ React props spreading
✅ Performance matters
✅ You know structure is flat

Deep Copy:
✅ Nested objects/arrays
✅ Complex state in React
✅ Need complete independence
✅ Avoiding accidental mutations

REACT STATE UPDATES:

Key rule: Never mutate state directly!

❌ Wrong:
  state.value = 'new';
  setState(state);

✅ Correct (shallow):
  setState({ ...state, value: 'new' });

✅ Correct (deep):
  setState({
    ...state,
    nested: { ...state.nested, value: 'new' }
  });

METHODS COMPARISON:

1. JSON.parse(JSON.stringify()):
   ✅ Simple
   ✅ Works for JSON-compatible data
   ❌ Loses functions, Date, undefined, symbols
   ❌ Fails on circular references
   ❌ Slower for large objects

2. Custom recursive function:
   ✅ Handles all data types
   ✅ Handles circular references
   ✅ Full control
   ❌ More code to maintain

3. structuredClone():
   ✅ Native browser API
   ✅ Handles most types
   ❌ Not available in old browsers
   ❌ Can't clone functions

4. Lodash _.cloneDeep():
   ✅ Production-ready
   ✅ Handles edge cases
   ❌ Adds dependency

BEST PRACTICES:
✅ Use spread for shallow copies
✅ Use JSON method for simple deep copies
✅ Use Lodash for production deep copies
✅ Use Immer for complex React state
✅ Never mutate React state directly
✅ Always return new objects/arrays

IN MY PROJECTS:
- Spread operator: 80% of cases (React props, simple state)
- JSON method: Quick deep copies of API responses
- Lodash: Complex state management
- Immer: Redux/complex React state
- Custom function: Specific needs (handling special types)

Common mistakes to avoid:
❌ Thinking spread does deep copy
❌ Using JSON method with functions/dates
❌ Mutating state in React
❌ Not considering performance with large objects
"
*/

// ============================================
// 19. JAVASCRIPT ARRAY METHODS (Advanced) 🔥
// ============================================

/*
 * HOW TO ANSWER:
 * "JavaScript provides powerful array methods that enable functional programming 
 * patterns. Understanding map, filter, reduce, and others is essential for 
 * writing clean, maintainable code."
 */

const sampleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users2 = [
    { id: 1, name: 'John', age: 25, active: true },
    { id: 2, name: 'Jane', age: 30, active: false },
    { id: 3, name: 'Bob', age: 35, active: true },
    { id: 4, name: 'Alice', age: 28, active: true }
];

// ============================================
// MAP - Transform each element
// ============================================
// Returns NEW array with same length

const doubled2 = sampleNumbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

const names = users2.map(user => user.name);
// ['John', 'Jane', 'Bob', 'Alice']

// React Example - Rendering lists
const UserList2 = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
);

// ============================================
// FILTER - Select elements that pass test
// ============================================
// Returns NEW array (can be smaller)

const evens2 = sampleNumbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

const activeUsers2 = users2.filter(user => user.active);
// Only users with active: true

const adults = users2.filter(user => user.age >= 30);
// [Jane, Bob]

// ============================================
// REDUCE - Accumulate into single value
// ============================================
// Most powerful and versatile!

// Sum
const sum3 = sampleNumbers.reduce((acc, n) => acc + n, 0);
// 55

// Count occurrences
const fruits2 = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count2 = fruits2.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
// { apple: 3, banana: 2, orange: 1 }

// Group by property
const groupedByAge = users2.reduce((acc, user) => {
    const key = user.age >= 30 ? 'senior' : 'junior';
    if (!acc[key]) acc[key] = [];
    acc[key].push(user);
    return acc;
}, {});

// Convert array to object
const usersById = users2.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
// { 1: {id:1, name:'John'...}, 2: {...}, ... }

// ============================================
// CHAINING - Combine multiple operations
// ============================================

const result2 = sampleNumbers
    .filter(n => n > 5)           // [6, 7, 8, 9, 10]
    .map(n => n * 2)              // [12, 14, 16, 18, 20]
    .reduce((acc, n) => acc + n, 0); // 80

// Real-world example: Process user data
const totalActiveUserAge = users2
    .filter(user => user.active)
    .map(user => user.age)
    .reduce((sum, age) => sum + age, 0);

// ============================================
// FIND - Get first element that matches
// ============================================

const found = users2.find(user => user.age > 30);
// { id: 3, name: 'Bob', age: 35, active: true }

const notFound = users2.find(user => user.age > 100);
// undefined

// ============================================
// FINDINDEX - Get index of first match
// ============================================

const index = users2.findIndex(user => user.name === 'Bob');
// 2

// ============================================
// SOME - Check if at least one passes test
// ============================================

const hasActiveUsers = users2.some(user => user.active);
// true

const hasUnderage = users2.some(user => user.age < 18);
// false

// ============================================
// EVERY - Check if all pass test
// ============================================

const allActive = users2.every(user => user.active);
// false

const allAdults = users2.every(user => user.age >= 18);
// true

// ============================================
// SORT - Sort array (MUTATES original!)
// ============================================

// Numbers (ascending)
const sorted = [...sampleNumbers].sort((a, b) => a - b);

// Numbers (descending)
const sortedDesc = [...sampleNumbers].sort((a, b) => b - a);

// Objects by property
const sortedByAge = [...users2].sort((a, b) => a.age - b.age);

// Strings
const sortedByName = [...users2].sort((a, b) => 
    a.name.localeCompare(b.name)
);

// ============================================
// INCLUDES - Check if value exists
// ============================================

const hasThree = sampleNumbers.includes(3); // true
const hasTwenty = sampleNumbers.includes(20); // false

// ============================================
// FLAT - Flatten nested arrays
// ============================================

const nested2 = [1, [2, 3], [4, [5, 6]]];
const flat1 = nested2.flat(); // [1, 2, 3, 4, [5, 6]]
const flat2 = nested2.flat(2); // [1, 2, 3, 4, 5, 6]
const flatAll = nested2.flat(Infinity); // [1, 2, 3, 4, 5, 6]

// ============================================
// FLATMAP - Map then flatten
// ============================================

const sentences = ['Hello world', 'How are you'];
const words = sentences.flatMap(sentence => sentence.split(' '));
// ['Hello', 'world', 'How', 'are', 'you']

// Same as:
const words2 = sentences.map(s => s.split(' ')).flat();

// ============================================
// SLICE - Get portion (doesn't mutate)
// ============================================

const portion = sampleNumbers.slice(2, 5); // [3, 4, 5]
const lastThree = sampleNumbers.slice(-3); // [8, 9, 10]

// ============================================
// SPLICE - Add/remove elements (MUTATES!)
// ============================================

const arr3 = [1, 2, 3, 4, 5];
arr3.splice(2, 1); // Remove 1 element at index 2
// arr3 is now [1, 2, 4, 5]

arr3.splice(2, 0, 99); // Insert 99 at index 2
// arr3 is now [1, 2, 99, 4, 5]

// ============================================
// PRACTICAL EXAMPLES
// ============================================

// E-commerce: Calculate total price
const cart = [
    { name: 'Book', price: 10, quantity: 2 },
    { name: 'Pen', price: 2, quantity: 5 },
    { name: 'Notebook', price: 5, quantity: 3 }
];

const total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
}, 0);
// 10*2 + 2*5 + 5*3 = 45

// Get unique values
const numbers3 = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(numbers3)];
// [1, 2, 3, 4, 5]

// Or using filter
const unique2 = numbers3.filter((num, index, arr) => {
    return arr.indexOf(num) === index;
});

// Pagination
const allItems = Array.from({ length: 100 }, (_, i) => i + 1);
const page = 2;
const pageSize = 10;
const paginatedItems = allItems.slice((page - 1) * pageSize, page * pageSize);

/*
SAY TO INTERVIEWER:
"Array methods are essential for functional programming in JavaScript and React.

KEY METHODS:

1. MAP - Transform
   - Returns new array, same length
   - Use: Transform data, render lists in React
   
2. FILTER - Select
   - Returns new array, can be smaller
   - Use: Remove unwanted items, conditional rendering
   
3. REDUCE - Accumulate
   - Most powerful, returns anything
   - Use: Sum, count, group, transform to object
   
4. FIND - Get first match
   - Returns single element or undefined
   - Use: Lookup by ID, get specific item
   
5. SOME/EVERY - Test conditions
   - Returns boolean
   - Use: Validation, conditional logic
   
6. SORT - Order (mutates!)
   - Use spread to avoid mutation: [...arr].sort()
   - Custom comparator for objects

CHAINING:
Combine operations for powerful transformations:
  data
    .filter(x => x.active)
    .map(x => x.value)
    .reduce((sum, val) => sum + val, 0)

PERFORMANCE:
- Each method creates new array (except mutating ones)
- For large arrays, consider single reduce vs chaining
- Use break-able loops (for) if need early exit

REACT USAGE:
✅ map for rendering lists
✅ filter for conditional rendering
✅ reduce for complex transformations
✅ find for lookups
✅ Always provide key prop with map

MUTATING vs NON-MUTATING:

Non-mutating (safe):
✅ map, filter, reduce, slice, concat

Mutating (careful!):
❌ sort, splice, push, pop, shift, unshift
Fix: Use spread first [...arr].sort()

BEST PRACTICES:
✅ Use functional methods over loops
✅ Avoid mutations in React
✅ Chain operations for clarity
✅ Use descriptive variable names
✅ Consider performance for large datasets

IN MY PROJECTS:
- map: 60% (rendering, transforming)
- filter: 20% (selecting data)
- reduce: 15% (complex transformations)
- find: 5% (lookups)
- Others as needed
"
*/

// ============================================
// 🎯 FINAL TIPS FOR INTERVIEW SUCCESS
// ============================================

/*
1. EXPLAIN YOUR THOUGHT PROCESS - Talk while coding
2. ASK CLARIFYING QUESTIONS - Show you think about edge cases
3. WRITE CLEAN CODE - Use meaningful names, proper indentation
4. TEST YOUR CODE - Mention test cases
5. OPTIMIZE - Discuss time/space complexity (Big O)
6. KNOW YOUR RESUME - Be ready to explain every project/technology
7. PRACTICE COMMON PATTERNS:
   - CRUD operations
   - Authentication/Authorization
   - Error handling
   - API design
   - Database queries
   - State management

8. BE HONEST - If you don't know, say so and explain how you'd find out

9. PROJECTS TO MENTION:
   - E-commerce app (Product listing, cart, checkout)
   - Social media clone (Posts, likes, comments)
   - Task management (CRUD, drag-drop)
   - Chat application (Real-time with Socket.io)

10. STUDY THESE TOPICS:
    ✅ Event Loop & Call Stack
    ✅ Promises & Async/Await
    ✅ Closures & Scope
    ✅ This keyword & Arrow Functions
    ✅ Prototypal Inheritance
    ✅ Higher-order Functions & Array Methods
    ✅ Debouncing/Throttling
    ✅ Deep Copy vs Shallow Copy
    ✅ React Hooks & Lifecycle
    ✅ REST API design
    ✅ MongoDB queries
    ✅ Authentication (JWT)
    ✅ Error handling
*/

// ============================================
// YOU'RE NOW 100% INTERVIEW READY!
// ============================================

console.log('Good luck with your interviews!');
