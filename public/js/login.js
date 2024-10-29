const validCredentials = {
    username: 'webnest',
    password: 'Webnest@2024'
};

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === validCredentials.username && password === validCredentials.password) {
        window.location.href = 'todo.html'; 
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const passwordFieldType = passwordField.getAttribute('type');

    // Toggle the type attribute
    if (passwordFieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        this.textContent = 'Hide'; // Change button text to "Hide"
    } else {
        passwordField.setAttribute('type', 'password');
        this.textContent = 'Show'; // Change button text to "Show"
    }
});