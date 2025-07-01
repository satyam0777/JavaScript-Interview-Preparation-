// CODING PRACTICE

// 1. Reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString("hello")); // "olleh"

// 2. Find the largest number in an array
function largestNumber(arr) {
    return Math.max(...arr);
}
console.log(largestNumber([1, 5, 2, 9, 3])); // 9

// 3. Check for palindrome
function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}
console.log(isPalindrome("madam")); // true

// 4. FizzBuzz
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) console.log("FizzBuzz");
        else if (i % 3 === 0) console.log("Fizz");
        else if (i % 5 === 0) console.log("Buzz");
        else console.log(i);
    }
}
fizzBuzz(15);