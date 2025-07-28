// MOST COMMONLY ASKED JAVASCRIPT INTERVIEW QUESTIONS

// 1. Reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log("Reverse 'hello':", reverseString("hello"));

// 2. Check if a string is a palindrome
function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}
console.log("Is 'madam' palindrome?:", isPalindrome("madam"));

// 3. Find the maximum number in an array
function maxInArray(arr) {
    return Math.max(...arr);
}
console.log("Max in [1, 5, 2, 9]:", maxInArray([1, 5, 2, 9]));

// 4. FizzBuzz problem
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) console.log("FizzBuzz");
        else if (i % 3 === 0) console.log("Fizz");
        else if (i % 5 === 0) console.log("Buzz");
        else console.log(i);
    }
}
console.log("FizzBuzz up to 15:");
fizzBuzz(15);

// 5. Remove duplicates from an array
function removeDuplicates(arr) {
    return [...new Set(arr)];
}
console.log("Remove duplicates:", removeDuplicates([1,2,2,3,4,4,5]));

// 6. Find the factorial of a number
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
console.log("Factorial of 5:", factorial(5));

// 7. Find the missing number in an array from 1 to n
function findMissing(arr, n) {
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
console.log("Missing in [1,2,4,5]:", findMissing([1,2,4,5], 5));

// 8. Check if two strings are anagrams
function areAnagrams(a, b) {
    return a.split('').sort().join('') === b.split('').sort().join('');
}
console.log("Are 'listen' and 'silent' anagrams?:", areAnagrams("listen", "silent"));

// 9. Count vowels in a string
function countVowels(str) {
    return (str.match(/[aeiou]/gi) || []).length;
}
console.log("Vowel count in 'interview':", countVowels("interview"));

// 10. Find the intersection of two arrays
function intersection(arr1, arr2) {
    return arr1.filter(x => arr2.includes(x));
}
console.log("Intersection of [1,2,3] and [2,3,4]:", intersection([1,2,3], [2,3,4]));
// 11. Flatten a nested array
function flattenArray(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
    }, []);
}
console.log("Flatten [1, [2, 3], [4, 5]]:", flattenArray([1, [2, 3], [4, 5]]));  
// 12. Find the longest word in a sentence
function longestWord(sentence) {
    return sentence.split(' ').reduce((longest, word) => {
        return word.length > longest.length ? word : longest;
    }, '');
}
console.log("Longest word in 'The quick brown fox':", longestWord("The quick brown fox"));
// 13. Check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
console.log("Is 7 prime?:", isPrime(7));
// 14. Merge two sorted arrays
function mergeSortedArrays(arr1, arr2) {
    const merged = [];
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }
    // Append any remaining elements from either array
    return merged.concat(arr1.slice(i)).concat(arr2.slice(j));
}
console.log("Merge [1, 3, 5] and [2, 4, 6]:", mergeSortedArrays([1, 3, 5], [2, 4, 6]));

// 15. Find the first non-repeating character in a string
function firstNonRepeatingChar(str) {
    const charCount = {};
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    for (const char of str) {
        if (charCount[char] === 1) return char;
    }
    return null;
}
console.log("First non-repeating character in 'abacabad':", firstNonRepeatingChar("abacabad"));