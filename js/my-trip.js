const savedRoute = JSON.parse(localStorage.getItem("vayuRoute") || "null");
if (savedRoute) { document.getElementById("route-title").textContent = `${savedRoute.from} to ${savedRoute.to}`; document.getElementById("route-detail").textContent = "Your saved route · Ready when you are"; }

const savedRoute = JSON.parse(localStorage.getItem("vayuRoute") || "null");
const bookedTour = JSON.parse(localStorage.getItem("vayuBookedTour") || "null");
const savedItinerary = JSON.parse(localStorage.getItem("vayuItinerary") || "null");
const festivalTrip = JSON.parse(localStorage.getItem("vayuFestivalTrip") || "null");

const destinationTitle = document.getElementById("destination-title");
const destinationDetail = document.getElementById("destination-detail");
const totalCost = document.getElementById("total-cost");
const bookingIds = document.getElementById("booking-ids");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const saveStatus = document.getElementById("save-status");
let selectedTravelCost = savedItinerary?.travelCost || 0;

if (bookedTour) {
	destinationTitle.textContent = bookedTour.place;
	destinationDetail.textContent = `${bookedTour.city}, ${bookedTour.state} · ${bookedTour.duration}`;
} else if (savedRoute) {
	destinationTitle.textContent = `${savedRoute.from} to ${savedRoute.to}`;
	destinationDetail.textContent = "Your saved route · Ready when you are";
}

if (savedItinerary) {
	startDate.value = savedItinerary.startDate || "";
	endDate.value = savedItinerary.endDate || "";
}

function updateTotal() {
	const tourCost = bookedTour ? 5000 : 0;
	totalCost.textContent = `₹${(selectedTravelCost + tourCost).toLocaleString("en-IN")}`;
}

document.querySelectorAll(".travel-option[data-mode]").forEach((option) => {
	if (savedItinerary?.travelMode === option.dataset.mode) option.classList.add("selected");
	option.addEventListener("click", () => {
		document.querySelectorAll(".travel-option[data-mode]").forEach((item) => item.classList.remove("selected"));
		option.classList.add("selected");
		selectedTravelCost = Number(option.dataset.cost);
		updateTotal();
	});
});

if (savedItinerary?.bookingIds) bookingIds.textContent = savedItinerary.bookingIds.join(" · ");
updateTotal();

if (festivalTrip) {
	document.getElementById("festival-trip").hidden = false;
	document.getElementById("festival-trip-title").textContent = `${festivalTrip.event} · ${festivalTrip.destination}`;
	document.getElementById("festival-trip-detail").textContent = festivalTrip.date ? `Travel date · ${festivalTrip.date}` : "Date to be confirmed";
	document.getElementById("festival-steps").innerHTML = festivalTrip.steps.map((step) => `<span>${step}</span>`).join("");
}

document.getElementById("save-itinerary").addEventListener("click", () => {
	const travelMode = document.querySelector(".travel-option.selected")?.dataset.mode || "Not selected";
	const ids = [`VB-${travelMode.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`];
	if (bookedTour) ids.push(`VB-TOUR-${Date.now().toString().slice(-6)}`);
	const itinerary = {
		travelMode,
		travelCost: selectedTravelCost,
		startDate: startDate.value,
		endDate: endDate.value,
		bookingIds: ids,
		destination: bookedTour?.place || destinationTitle.textContent
	};
	localStorage.setItem("vayuItinerary", JSON.stringify(itinerary));
	bookingIds.textContent = ids.join(" · ");
	saveStatus.textContent = "Itinerary saved successfully.";
});
const bookedTour = JSON.parse(localStorage.getItem("vayuBookedTour") || "null");
if (bookedTour) {
	const card = document.getElementById("booked-tour-card");
	card.classList.remove("empty-trip");
	card.querySelector("span").textContent = `02 · ${bookedTour.state}`;
	document.getElementById("booked-tour-title").textContent = bookedTour.place;
	document.getElementById("booked-tour-detail").textContent = `${bookedTour.city}, ${bookedTour.district} · ${bookedTour.duration}`;
}