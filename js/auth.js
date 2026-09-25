async function postJson(url, payload) {
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(payload) });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : { error: `Server returned ${response.status} ${response.statusText}.` };
    if (!response.ok) throw new Error(data.error || "Request failed.");
    return data;
}

function validateForm() {
    loginUser();
    return false;
}

async function loginUser() {
    try {
        const { user } = await postJson("/api/auth/login/", { username: document.getElementById("username").value.trim(), password: document.getElementById("password").value });
        localStorage.setItem("vayuLoggedInUser", user.username);
        localStorage.setItem("vayuUserId", String(user.id));
        window.location.href = "home.html";
    } catch (error) { alert(error.message); }
}

function createAccount() {
    registerUser();
    return false;
}

async function registerUser() {
    const payload = { full_name: document.getElementById("fullname").value.trim(), email: document.getElementById("email").value.trim(), username: document.getElementById("username").value.trim(), password: document.getElementById("password").value };
    if (payload.password !== document.getElementById("confirm-password").value) { alert("Passwords do not match."); return false; }
    try { await postJson("/api/auth/register/", payload); alert("Account created successfully. Please log in."); window.location.href = "login.html"; }
    catch (error) { alert(error.message); }
}

function requestPasswordCode() {
    sendPasswordCode();
    return false;
}

async function sendPasswordCode() {
    try {
        const data = await postJson("/api/auth/forgot-password/", { email: document.getElementById("reset-email").value.trim() });
        document.getElementById("reset-status").textContent = data.message;
        document.getElementById("reset-confirmation").hidden = false;
    } catch (error) { document.getElementById("reset-status").textContent = error.message; }
}

function confirmPasswordReset() {
    resetPassword();
    return false;
}

async function resetPassword() {
    try {
        const data = await postJson("/api/auth/reset-password/", { email: document.getElementById("reset-email").value.trim(), code: document.getElementById("reset-code").value.trim(), password: document.getElementById("new-password").value });
        document.getElementById("reset-status").textContent = data.message;
    } catch (error) { document.getElementById("reset-status").textContent = error.message; }
}

function logout() { localStorage.removeItem("vayuLoggedInUser"); localStorage.removeItem("vayuUserId"); window.location.href = "login.html"; }