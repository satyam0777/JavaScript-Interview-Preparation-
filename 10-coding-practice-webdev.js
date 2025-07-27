// PRACTICAL JAVASCRIPT WEB DEVELOPMENT QUESTIONS

// 1. Toggle a class on a button click
// <button id="toggleBtn">Toggle</button>
document.getElementById('toggleBtn').addEventListener('click', function() {
    this.classList.toggle('active');
});

// 2. Change the text of a paragraph when a button is clicked
// <button id="changeTextBtn">Change Text</button>
// <p id="textPara">Old Text</p>
document.getElementById('changeTextBtn').onclick = function() {
    document.getElementById('textPara').textContent = "New Text!";
};

// 3. Show/hide a div when a checkbox is checked/unchecked
// <input type="checkbox" id="showHideCheck">
// <div id="myDiv">Hello!</div>
document.getElementById('showHideCheck').addEventListener('change', function() {
    document.getElementById('myDiv').style.display = this.checked ? 'block' : 'none';
});

// 4. Fetch data from an API and display it
// <button id="fetchBtn">Fetch User</button>
// <div id="userData"></div>
document.getElementById('fetchBtn').onclick = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await res.json();
    document.getElementById('userData').textContent = user.name;
};

// 5. Prevent a form from submitting and show an alert instead
// <form id="myForm"><button type="submit">Submit</button></form>
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submission prevented!');
});

// 6. Debounce an input event (e.g., search box)
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
// <input id="searchBox" type="text">
document.getElementById('searchBox').addEventListener('input', debounce(function(e) {
    console.log('Searching for:', e.target.value);
}, 500));

// 7. Create a simple modal popup
// <button id="openModal">Open Modal</button>
// <div id="modal" style="display:none;">Modal Content <button id="closeModal">Close</button></div>
document.getElementById('openModal').onclick = function() {
    document.getElementById('modal').style.display = 'block';
};
document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// 8. Store and retrieve data from localStorage
localStorage.setItem('username', 'Satyam');
console.log(localStorage.getItem('username'));

// 9. Scroll to top button
// <button id="scrollTopBtn">Scroll to Top</button>
document.getElementById('scrollTopBtn').onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 10. Dynamically add list items to a ul
// <input id="itemInput" type="text">
// <button id="addItemBtn">Add</button>
// <ul id="itemList"></ul>
document.getElementById('addItemBtn').onclick = function() {
    const value = document.getElementById('itemInput').value;
    if (value) {
        const li = document.createElement('li');
        li.textContent = value;
        document.getElementById('itemList').appendChild(li);
        document.getElementById('itemInput').value = '';
    }
};