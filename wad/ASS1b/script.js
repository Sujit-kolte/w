document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. Capture Form Data
    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value, // In production, never store plain-text passwords
        timestamp: new Date().toISOString()
    };

    // 2. Simulate an Asynchronous Process (AJAX-like behavior)
    // This represents the delay you'd find when sending data to a server
    saveDataAsynchronously(userData)
        .then(response => {
            document.getElementById('status').innerText = response;
            this.reset(); // Clear the form
            console.log(`data:${userData}`);
        })
        .catch(error => {
            document.getElementById('status').innerText = "Error: " + error;
        });
});

/**
 * Simulates a background process to handle storage
 */
function saveDataAsynchronously(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Fetch existing users or initialize empty array
                const users = JSON.parse(localStorage.getItem('users')) || [];

                // Add new user
                users.push(data);

                // Push back to Local Storage
                localStorage.setItem('users', JSON.stringify(users));

                resolve("Registration successful! Data pushed to LocalStorage.");
            } catch (err) {
                reject("Failed to save data.");
            }
        }, 800); // 800ms simulated network delay
    });
}

function showUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear previous list
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `Username: ${user.username}, Email: ${user.email}, Registered At: ${user.timestamp}`;
        userList.appendChild(userItem);
    });
}