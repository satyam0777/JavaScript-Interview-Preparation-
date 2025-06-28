// ASYNCHRONOUS JAVASCRIPT

// Callback example
function fetchDataCallback(callback) {
    setTimeout(() => {
        callback("Data loaded (callback)");
    }, 1000);
}
fetchDataCallback(data => console.log(data));

// Promise example
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data loaded (promise)");
        }, 1000);
    });
}
fetchDataPromise().then(data => console.log(data));

// Async/Await example
async function fetchDataAsync() {
    const data = await fetchDataPromise();
    console.log(data);
}
fetchDataAsync();