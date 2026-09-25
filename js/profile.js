const profileForm = document.getElementById("profile-form");
const profileFields = ["first-name", "middle-name", "last-name", "email", "phone", "age", "gender", "country", "emergency-one", "emergency-two"];

function updateAvatar() { const first = document.getElementById("first-name").value.trim()[0] || "V"; const last = document.getElementById("last-name").value.trim()[0] || "B"; document.getElementById("profile-avatar").textContent = `${first}${last}`.toUpperCase(); }
function setProfile(user) {
	const values = { "first-name": user.first_name, "middle-name": user.middle_name, "last-name": user.last_name, email: user.email, phone: user.phone, age: user.age, gender: user.gender, country: user.country, "emergency-one": user.emergency_one, "emergency-two": user.emergency_two };
	profileFields.forEach((id) => { if (values[id] !== null && values[id] !== undefined) document.getElementById(id).value = values[id]; });
	localStorage.setItem("vayuUserId", String(user.id));
	updateAvatar();
}
async function loadProfile() {
	const response = await fetch("/api/auth/profile/", { credentials: "same-origin" });
	if (!response.ok) throw new Error("Please log in before opening your profile.");
	setProfile((await response.json()).user);
}
profileFields.slice(0, 3).forEach((id) => document.getElementById(id).addEventListener("input", updateAvatar));
document.getElementById("payment-button").addEventListener("click", () => { document.getElementById("profile-status").textContent = "Secure payment-provider checkout will open when a live provider key is connected."; });
document.getElementById("profile-photo").addEventListener("change", (event) => { const file = event.target.files[0]; if (file) document.getElementById("profile-status").textContent = `${file.name} selected. Save your profile to keep this choice on this device.`; });
profileForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const values = {}; profileFields.forEach((id) => { values[id] = document.getElementById(id).value.trim(); });
	const payload = { first_name: values["first-name"], middle_name: values["middle-name"], last_name: values["last-name"], email: values.email, phone: values.phone, age: values.age, gender: values.gender, country: values.country, emergency_one: values["emergency-one"], emergency_two: values["emergency-two"] };
	try {
		const response = await fetch("/api/auth/profile/", { method: "PUT", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(payload) });
		const data = await response.json(); if (!response.ok) throw new Error(data.error || "Unable to save profile.");
		setProfile(data.user); document.getElementById("profile-status").textContent = `Profile saved to the database. User ID: ${data.user.id}`;
	} catch (error) { document.getElementById("profile-status").textContent = error.message; }
});
loadProfile().catch((error) => { document.getElementById("profile-status").textContent = error.message; });
updateAvatar();
