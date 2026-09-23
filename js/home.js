document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("vayuLoggedInUser");
    if (!username) {
        window.location.href = "login.html";
        return;
    }
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);
    document.querySelectorAll("#welcome-user, #hero-user").forEach((element) => {
        element.textContent = displayName;
    });
});