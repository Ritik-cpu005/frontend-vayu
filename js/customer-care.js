const careForm = document.getElementById("customer-care-form");
const careStatus = document.getElementById("care-status");

careForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    careStatus.textContent = "Sending your message...";
    try {
        const response = await fetch("/api/customer-care/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({
                name: document.getElementById("care-name").value.trim(),
                email: document.getElementById("care-email").value.trim(),
                message: document.getElementById("care-message").value.trim(),
                user_id: localStorage.getItem("vayuUserId") || "",
            }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to send your message.");
        careStatus.textContent = data.message;
        careForm.reset();
    } catch (error) {
        careStatus.textContent = error.message;
    }
});
