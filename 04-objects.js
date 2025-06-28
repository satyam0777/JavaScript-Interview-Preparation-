// OBJECTS

// Creating an object
const person = {
    name: "Satyam Prajapati",
    age: 21,
    greet: function() {
        return `Hello, my name is ${this.name}`;
    }
};

// Accessing properties
console.log(person.name);      // Satyam Prajapati
console.log(person["age"]);    // 21

// Adding a property
person.city = "Delhi";

// Deleting a property
delete person.age;

// Iterating over properties
for (let key in person) {
    console.log(key, person[key]);
}

// Object destructuring
const { name, city } = person;
console.log(name, city);

// Cloning an object (shallow copy)
const clone = { ...person };
console.log(clone);

// Object methods
console.log(person.greet());