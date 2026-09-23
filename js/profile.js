const profileForm = document.getElementById("profile-form");
const profileFields = ["first-name", "middle-name", "last-name", "email", "phone", "age", "gender", "country", "emergency-one", "emergency-two"];
const savedProfile = JSON.parse(localStorage.getItem("vayuProfile") || "null");
if (savedProfile) profileFields.forEach((id) => { if (savedProfile[id] !== undefined) document.getElementById(id).value = savedProfile[id]; });
function updateAvatar() { const first = document.getElementById("first-name").value.trim()[0] || "V"; const last = document.getElementById("last-name").value.trim()[0] || "B"; document.getElementById("profile-avatar").textContent = `${first}${last}`.toUpperCase(); }
profileFields.slice(0, 3).forEach((id) => document.getElementById(id).addEventListener("input", updateAvatar));
document.getElementById("payment-button").addEventListener("click", () => { document.getElementById("profile-status").textContent = "Secure payment-provider checkout will open when a live provider key is connected."; });
document.getElementById("profile-photo").addEventListener("change", (event) => { const file = event.target.files[0]; if (file) document.getElementById("profile-status").textContent = `${file.name} selected. Save your profile to keep this choice on this device.`; });
profileForm.addEventListener("submit", (event) => { event.preventDefault(); const profile = {}; profileFields.forEach((id) => { profile[id] = document.getElementById(id).value.trim(); }); localStorage.setItem("vayuProfile", JSON.stringify(profile)); updateAvatar(); document.getElementById("profile-status").textContent = "Profile and emergency contacts saved on this device."; });
updateAvatar();
