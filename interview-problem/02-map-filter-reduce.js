// MAP, FILTER & REDUCE Interview Questions

// Question 1 : Array.map()

const nums1 = [1, 2, 3, 4];

const multiplyThree = nums1.map((num, i, arr) => num * 3); // cb can take num, index and array
console.log(multiplyThree); // [3, 6, 9, 12]



// Question 2 : Array.filter()

const nums2 = [1, 2, 3, 4];

const moreThanTwo = nums2.filter((num, i, arr) => num > 2 === 0);
console.log(moreThanTwo); // [3, 4]



// Question 3 : Array.reduce()

const nums3 = [1, 2, 3, 4];

const sum = nums3.reduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);

console.log(sum); // 10



// Question 4 : Map Polyfill

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }

  return temp; // temp is an array that will hold the results of the callback function
};



// Ques 5 : Filter Polyfill

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) temp.push(this[i]);
  }

  return temp;
};



// Question 6 : Reduce Polyfill

Array.prototype.myReduce = function (cb, initialValue) {
  var accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }

  return accumulator;
};



// Question 7 : map vs foreach

let students = [
  { name: "Piyush", rollNumber: 31, marks: 80 },
  { name: "Jenny", rollNumber: 15, marks: 69 },
  { name: "Kaushal", rollNumber: 16, marks: 35 },
  { name: "Dilpreet", rollNumber: 7, marks: 55 },
];

// Q1 - Return only the names of students in capital

// Solution 1 : Traditional for() loop
let names1 = [];
for (let index = 0; index < studentRecords.length; index++){
     names1.push(students[index].name.toUpperCase());  // Convert each name to uppercase and push it to names1 array
}

console.log(names1);
// Solution 2 : forEach()
let names2 = []
students.forEach( student => {
     names2.push(student.name.toUpperCase()); // Convert each name to uppercase and push it to names2 array
})

console.log(names2);

// Solution 3 : map() 
let names3 = students.map( stu => stu.name.toUpperCase());
console.log(names3); // Convert each name to uppercase and return a new array with the names in uppercase


// Q2 - we want to get the details of students who scored more than 60 marks.

let names4 = students.filter(stu => stu.marks > 60);
console.log(names4);  // Get the details of students who scored more than 60 marks and return a new array with those students' details


// Q3 - Get the details of students who scored more than 60 marks and have rollNumber greater than 15.

let names5 = students.filter(stu => stu.marks > 60 && stu.rollNumber > 15);
console.log(names5); // Get the details of students who scored more than 60 marks and have rollNumber greater than 15 and return a new array with those students' details


// Q4 - Sum total of the marks of the students

let totalMarks1 = students.reduce( ((acc,emp) => acc+emp.marks), 0)
console.log(totalMarks1); // Sum total of the marks of the students and return the total marks


// Q5 - Get only the names of the students who scored more than 60 marks

let names = students.filter(stu => stu.marks > 50).map(stu => stu.name)
console.log(names);  // Get only the names of the students who scored more than 50 marks


// Q6 - print the total marks of the students with marks greater than 60 after 20 marks has been added to those students who scored less than 60.

let totalMarks = studentRecords.map(function(stu){ 
    if(stu.marks < 60){
        stu.marks += 20;}
    return stu;
}).filter(stu => stu.marks > 60).reduce((acc,curr) => acc+curr.marks, 0);

console.log(totalMarks);  // Print the total marks of the students with marks greater than 60 after 20 marks has been added to those students who scored less than 60.