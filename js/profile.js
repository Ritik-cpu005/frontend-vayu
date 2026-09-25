const profileForm = document.getElementById("profile-form");
const profileFields = ["first-name", "middle-name", "last-name", "email", "phone", "age", "gender", "country", "emergency-one", "emergency-two"];
const profilePhotoKey = `vayuProfilePhoto:${localStorage.getItem("vayuLoggedInUser") || "guest"}`;
let selectedProfilePhoto = localStorage.getItem(profilePhotoKey) || "";

function updateAvatar() {
	const first = document.getElementById("first-name").value.trim()[0] || "V";
	const last = document.getElementById("last-name").value.trim()[0] || "B";
	document.getElementById("profile-avatar-initials").textContent = `${first}${last}`.toUpperCase();
	const image = document.getElementById("profile-avatar-image");
	image.hidden = !selectedProfilePhoto;
	if (selectedProfilePhoto) image.src = selectedProfilePhoto;
}
function setProfile(user) {
	const values = { "first-name": user.first_name, "middle-name": user.middle_name, "last-name": user.last_name, email: user.email, phone: user.phone, age: user.age, gender: user.gender, country: user.country, "emergency-one": user.emergency_one, "emergency-two": user.emergency_two };
	profileFields.forEach((id) => { if (values[id] !== null && values[id] !== undefined) document.getElementById(id).value = values[id]; });
	localStorage.setItem("vayuUserId", String(user.id));
	updateAvatar();
}
async function requestProfile(options) {
	if (window.location.protocol === "file:") {
		throw new Error("Open your profile at http://127.0.0.1:8000/profile.html. Opening the HTML file directly causes a Forbidden response.");
	}
	const response = await fetch("/api/auth/profile/", options);
	const contentType = response.headers.get("content-type") || "";
	const data = contentType.includes("application/json") ? await response.json() : {};
	if (!response.ok) throw new Error(data.error || `Profile server returned ${response.status} ${response.statusText}.`);
	return data;
}
async function loadProfile() {
	const data = await requestProfile({ credentials: "same-origin" });
	setProfile(data.user);
}
profileFields.slice(0, 3).forEach((id) => document.getElementById(id).addEventListener("input", updateAvatar));
document.getElementById("payment-button").addEventListener("click", () => { document.getElementById("profile-status").textContent = "Secure payment-provider checkout will open when a live provider key is connected."; });
document.getElementById("profile-photo").addEventListener("change", (event) => {
	const file = event.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		selectedProfilePhoto = reader.result;
		updateAvatar();
		document.getElementById("profile-status").textContent = `${file.name} selected. Save your profile to keep this choice on this device.`;
	});
	reader.readAsDataURL(file);
});
profileForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const values = {}; profileFields.forEach((id) => { values[id] = document.getElementById(id).value.trim(); });
	const payload = { first_name: values["first-name"], middle_name: values["middle-name"], last_name: values["last-name"], email: values.email, phone: values.phone, age: values.age, gender: values.gender, country: values.country, emergency_one: values["emergency-one"], emergency_two: values["emergency-two"] };
	try {
		const data = await requestProfile({ method: "PUT", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(payload) });
		setProfile(data.user);
		try {
			localStorage.setItem(profilePhotoKey, selectedProfilePhoto);
			document.getElementById("profile-status").textContent = `Profile saved to the database. User ID: ${data.user.id}`;
		} catch (error) {
			document.getElementById("profile-status").textContent = "Profile saved, but this photo is too large to store on this device.";
		}
	} catch (error) { document.getElementById("profile-status").textContent = error.message; }
});
loadProfile().catch((error) => { document.getElementById("profile-status").textContent = error.message; });
updateAvatar();
