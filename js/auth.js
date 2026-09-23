const defaultUsers = [
    { username: "ritik2007", password: "5122007" },
    { username: "admin", password: "123456" },
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
];

function getUsers() {
    const storedUsers = localStorage.getItem("vayuUsers");

    if (!storedUsers) {
        localStorage.setItem("vayuUsers", JSON.stringify(defaultUsers));
        return defaultUsers;
    }

    return JSON.parse(storedUsers);
}

function validateForm() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const user = getUsers().find((account) =>
        account.username === username && account.password === password
    );

    if (!user) {
        alert("Invalid username or password.");
        return false;
    }

    localStorage.setItem("vayuLoggedInUser", username);
    window.location.href = "home.html";
    return false;
}

function createAccount() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const users = getUsers();

    if (!username || !password) {
        alert("Please enter a username and password.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (users.some((account) => account.username === username)) {
        alert("That username is already in use.");
        return false;
    }

    users.push({ username, password });
    localStorage.setItem("vayuUsers", JSON.stringify(users));
    alert("Account created successfully. Please log in.");
    window.location.href = "login.html";
    return false;
}

function logout() {
    localStorage.removeItem("vayuLoggedInUser");
    window.location.href = "login.html";
}