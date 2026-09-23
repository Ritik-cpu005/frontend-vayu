document.querySelectorAll(".explore-categories a").forEach((card) => card.addEventListener("click", () => localStorage.setItem("vayuLastInterest", card.querySelector("strong").textContent)));
const destinations = {
	India: {
		Rajasthan: {
			Jaipur: [
				["Amber Fort", 26.9855, 75.8513, "35 min", "11 km"],
				["Hawa Mahal", 26.9239, 75.8267, "15 min", "4 km"],
				["City Palace", 26.9258, 75.8237, "14 min", "4 km"],
				["Jal Mahal", 26.9539, 75.8467, "25 min", "8 km"],
				["Galtaji Temple", 26.9255, 75.8648, "24 min", "9 km"]
			],
			Udaipur: [
				["Lake Pichola", 24.5751, 73.6805, "12 min", "4 km"],
				["City Palace", 24.5764, 73.6835, "10 min", "3 km"],
				["Sajjangarh Palace", 24.5963, 73.6388, "32 min", "11 km"],
				["Bagore Ki Haveli", 24.5797, 73.6828, "9 min", "3 km"],
				["Fateh Sagar Lake", 24.6016, 73.6777, "18 min", "5 km"]
			],
			Jodhpur: [
				["Mehrangarh Fort", 26.2981, 73.0185, "15 min", "4 km"],
				["Blue City Walk", 26.2922, 73.0158, "12 min", "3 km"],
				["Jaswant Thada", 26.3038, 73.0251, "18 min", "5 km"],
				["Umaid Bhawan Palace", 26.2802, 73.0477, "20 min", "7 km"],
				["Toorji Ka Jhalra", 26.2946, 73.0244, "10 min", "3 km"]
			]
		},
		Kerala: {
			Kochi: [
				["Fort Kochi", 9.9658, 76.2421, "20 min", "6 km"],
				["Mattancherry Palace", 9.9581, 76.1939, "30 min", "10 km"],
				["Chinese Fishing Nets", 9.9669, 76.2410, "18 min", "5 km"],
				["Jew Town", 9.9580, 76.1932, "30 min", "10 km"],
				["Kumbalangi Village", 9.8845, 76.2453, "45 min", "17 km"]
			],
			Munnar: [
				["Tea Museum", 10.0892, 77.0597, "12 min", "4 km"],
				["Mattupetty Dam", 10.1076, 77.1194, "35 min", "12 km"],
				["Echo Point", 10.1133, 77.1571, "45 min", "16 km"],
				["Top Station", 10.1324, 77.2483, "1 hr 20 min", "32 km"],
				["Eravikulam National Park", 10.1525, 77.0625, "28 min", "9 km"]
			],
			Thiruvananthapuram: [
				["Kovalam Beach", 8.4004, 76.9787, "30 min", "15 km"],
				["Sree Padmanabhaswamy Temple", 8.4821, 76.9435, "10 min", "3 km"],
				["Napier Museum", 8.5074, 76.9533, "15 min", "4 km"],
				["Veli Tourist Village", 8.5131, 76.8937, "25 min", "10 km"],
				["Poovar Island", 8.3165, 77.0670, "45 min", "29 km"]
			]
		},
		Maharashtra: {
			Mumbai: [
				["Gateway of India", 18.9220, 72.8347, "20 min", "4 km"],
				["Marine Drive", 18.9437, 72.8235, "15 min", "4 km"],
				["Elephanta Caves", 18.9633, 72.9315, "1 hr 30 min", "12 km"],
				["Sanjay Gandhi National Park", 19.2147, 72.9106, "1 hr", "34 km"],
				["Kala Ghoda", 18.9271, 72.8312, "18 min", "4 km"]
			],
			Pune: [
				["Shaniwar Wada", 18.5196, 73.8553, "10 min", "3 km"],
				["Aga Khan Palace", 18.5528, 73.9014, "25 min", "7 km"],
				["Sinhagad Fort", 18.3663, 73.7559, "1 hr", "30 km"],
				["Pataleshwar Cave Temple", 18.5295, 73.8472, "12 min", "3 km"],
				["Khadakwasla Dam", 18.4415, 73.7635, "35 min", "15 km"]
			],
			Nashik: [
				["Sula Vineyards", 20.0168, 73.6839, "30 min", "16 km"],
				["Trimbakeshwar Temple", 19.9320, 73.5296, "50 min", "30 km"],
				["Pandavleni Caves", 20.0119, 73.7528, "20 min", "9 km"],
				["Ram Kund", 20.0059, 73.7901, "10 min", "3 km"],
				["Anjaneri Hills", 19.9482, 73.5549, "45 min", "26 km"]
			]
		},
		Karnataka: {
			Bengaluru: [
				["Lalbagh Botanical Garden", 12.9507, 77.5848, "20 min", "6 km"],
				["Bangalore Palace", 12.9988, 77.5921, "25 min", "7 km"],
				["Cubbon Park", 12.9763, 77.5929, "15 min", "4 km"],
				["ISKCON Temple", 13.0108, 77.5511, "30 min", "10 km"],
				["Nandi Hills", 13.3702, 77.6835, "1 hr 30 min", "60 km"]
			],
			Mysuru: [
				["Mysore Palace", 12.3052, 76.6552, "10 min", "3 km"],
				["Chamundi Hill", 12.2724, 76.6700, "25 min", "9 km"],
				["Brindavan Gardens", 12.4244, 76.5748, "35 min", "20 km"],
				["Devaraja Market", 12.3120, 76.6536, "12 min", "3 km"],
				["St Philomena's Church", 12.3239, 76.6496, "15 min", "4 km"]
			],
			Hampi: [
				["Virupaksha Temple", 15.3350, 76.4600, "8 min", "2 km"],
				["Vijaya Vittala Temple", 15.3145, 76.4770, "20 min", "6 km"],
				["Matanga Hill", 15.3336, 76.4597, "10 min", "3 km"],
				["Lotus Mahal", 15.3255, 76.4536, "18 min", "5 km"],
				["Hampi Bazaar", 15.3352, 76.4603, "7 min", "2 km"]
			]
		},
		"Tamil Nadu": {
			Chennai: [
				["Marina Beach", 13.0500, 80.2824, "18 min", "6 km"],
				["Kapaleeshwarar Temple", 13.0339, 80.2697, "20 min", "7 km"],
				["Fort St. George", 13.0797, 80.2870, "18 min", "5 km"],
				["DakshinaChitra", 12.8193, 80.2288, "55 min", "35 km"],
				["Guindy National Park", 13.0068, 80.2206, "30 min", "11 km"]
			],
			Madurai: [
				["Meenakshi Temple", 9.9195, 78.1193, "10 min", "3 km"],
				["Thirumalai Nayakkar Palace", 9.9157, 78.1194, "12 min", "3 km"],
				["Gandhi Memorial Museum", 9.9327, 78.1382, "18 min", "5 km"],
				["Alagar Koyil", 10.1213, 78.2245, "45 min", "21 km"],
				["Vandiyur Mariamman Teppakulam", 9.9077, 78.1437, "20 min", "6 km"]
			],
			Ooty: [
				["Ooty Lake", 11.4064, 76.6932, "10 min", "3 km"],
				["Doddabetta Peak", 11.4090, 76.7350, "25 min", "9 km"],
				["Botanical Gardens", 11.4162, 76.7115, "12 min", "4 km"],
				["Nilgiri Mountain Railway", 11.4102, 76.6950, "10 min", "3 km"],
				["Emerald Lake", 11.3275, 76.6300, "45 min", "25 km"]
			]
		}
	}
};

const additionalStateCities = {
	"Andhra Pradesh": ["Amaravati", 16.514, 80.516],
	"Arunachal Pradesh": ["Itanagar", 27.084, 93.605],
	Assam: ["Guwahati", 26.144, 91.736],
	Bihar: ["Patna", 25.594, 85.137],
	Chhattisgarh: ["Raipur", 21.251, 81.629],
	Goa: ["Panaji", 15.491, 73.828],
	Gujarat: ["Ahmedabad", 23.022, 72.572],
	Haryana: ["Gurugram", 28.459, 77.026],
	"Himachal Pradesh": ["Shimla", 31.104, 77.173],
	Jharkhand: ["Ranchi", 23.344, 85.309],
	"Madhya Pradesh": ["Bhopal", 23.259, 77.412],
	Manipur: ["Imphal", 24.817, 93.936],
	Meghalaya: ["Shillong", 25.578, 91.893],
	Mizoram: ["Aizawl", 23.727, 92.717],
	Nagaland: ["Kohima", 25.675, 94.109],
	Odisha: ["Bhubaneswar", 20.296, 85.824],
	Punjab: ["Amritsar", 31.634, 74.872],
	Sikkim: ["Gangtok", 27.338, 88.606],
	Telangana: ["Hyderabad", 17.385, 78.487],
	Tripura: ["Agartala", 23.831, 91.286],
	"Uttar Pradesh": ["Lucknow", 26.847, 80.947],
	Uttarakhand: ["Dehradun", 30.316, 78.032],
	"West Bengal": ["Kolkata", 22.573, 88.364]
};

Object.entries(additionalStateCities).forEach(([state, [city, latitude, longitude]]) => {
	destinations.India[state] = {
		[city]: [
			[`${city} Heritage Quarter`, latitude + 0.012, longitude + 0.012, "15 min", "4 km"],
			[`${city} Central Market`, latitude - 0.009, longitude + 0.008, "18 min", "5 km"],
			[`${city} State Museum`, latitude + 0.006, longitude - 0.01, "22 min", "7 km"],
			[`${city} Riverside Walk`, latitude - 0.014, longitude - 0.006, "28 min", "9 km"],
			[`${city} Local Food Street`, latitude + 0.004, longitude + 0.016, "25 min", "8 km"]
		]
	};
});

const biharDistricts = {
	Araria: ["Araria", 26.15, 87.46],
	Arwal: ["Arwal", 25.25, 84.68],
	Aurangabad: ["Aurangabad", 24.75, 84.37],
	Banka: ["Banka", 24.88, 86.92],
	Begusarai: ["Begusarai", 25.42, 86.13],
	Bhagalpur: ["Bhagalpur", 25.24, 86.98],
	Bhojpur: ["Ara", 25.56, 84.67],
	Buxar: ["Buxar", 25.57, 83.98],
	Darbhanga: ["Darbhanga", 26.15, 85.90],
	"East Champaran": ["Motihari", 26.65, 84.92],
	Gaya: ["Gaya", 24.80, 85.00],
	Gopalganj: ["Gopalganj", 26.47, 84.44],
	Jamui: ["Jamui", 24.92, 86.22],
	Jehanabad: ["Jehanabad", 25.21, 84.99],
	Kaimur: ["Bhabua", 25.04, 83.61],
	Katihar: ["Katihar", 25.54, 87.57],
	Khagaria: ["Khagaria", 25.50, 86.47],
	Kishanganj: ["Kishanganj", 26.10, 87.95],
	Lakhisarai: ["Lakhisarai", 25.17, 86.09],
	Madhepura: ["Madhepura", 25.92, 86.79],
	Madhubani: ["Madhubani", 26.35, 86.07],
	Munger: ["Munger", 25.37, 86.47],
	Muzaffarpur: ["Muzaffarpur", 26.12, 85.39],
	Nalanda: ["Bihar Sharif", 25.20, 85.52],
	Nawada: ["Nawada", 24.88, 85.54],
	Patna: ["Patna", 25.59, 85.14],
	Purnia: ["Purnia", 25.78, 87.47],
	Rohtas: ["Sasaram", 24.95, 84.00],
	Saharsa: ["Saharsa", 25.88, 86.60],
	Samastipur: ["Samastipur", 25.86, 85.78],
	Saran: ["Chhapra", 25.78, 84.73],
	Sheikhpura: ["Sheikhpura", 25.14, 85.86],
	Sheohar: ["Sheohar", 26.52, 85.30],
	Sitamarhi: ["Sitamarhi", 26.59, 85.49],
	Siwan: ["Siwan", 26.22, 84.36],
	Supaul: ["Supaul", 26.13, 86.60],
	Vaishali: ["Hajipur", 25.69, 85.21],
	"West Champaran": ["Bettiah", 27.10, 84.50]
};

destinations.India.Bihar = Object.fromEntries(Object.entries(biharDistricts).map(([district, [city, latitude, longitude]]) => [district, {
	[city]: [
		[`${city} Heritage Quarter`, latitude + 0.012, longitude + 0.012, "15 min", "4 km"],
		[`${city} Central Market`, latitude - 0.009, longitude + 0.008, "18 min", "5 km"],
		[`${city} State Museum`, latitude + 0.006, longitude - 0.01, "22 min", "7 km"],
		[`${city} Riverside Walk`, latitude - 0.014, longitude - 0.006, "28 min", "9 km"],
		[`${city} Local Food Street`, latitude + 0.004, longitude + 0.016, "25 min", "8 km"]
	]
}]));

Object.entries(destinations.India).forEach(([state, cities]) => {
	if (state !== "Bihar") {
		destinations.India[state] = Object.fromEntries(Object.entries(cities).map(([city, places]) => [city, { [city]: places }]));
	}
});

const countrySelect = document.getElementById("country-select");
const stateSelect = document.getElementById("state-select");
const districtSelect = document.getElementById("district-select");
const citySelect = document.getElementById("city-select");
const placeSelect = document.getElementById("place-select");
const summary = document.getElementById("place-summary");
const travelTime = document.getElementById("travel-time");
const savePlace = document.getElementById("save-place");
const mapLabel = document.getElementById("map-label-text");
const imageGrid = document.getElementById("image-grid");
const imageContext = document.getElementById("image-context");
const placeSearch = document.getElementById("place-search");
const placeDialog = document.getElementById("place-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogTitle = document.getElementById("dialog-title");
const dialogLocation = document.getElementById("dialog-location");
const dialogHistory = document.getElementById("dialog-history");
const dialogSeason = document.getElementById("dialog-season");
const dialogStatus = document.getElementById("dialog-status");

const galleryImages = [
	"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
];
const locationImageCache = new Map();
let galleryRenderId = 0;

const heritageCatalog = `
Heritage|Taj Mahal|Agra, Uttar Pradesh|Uttar Pradesh
Heritage|Red Fort|Delhi|Delhi
Heritage|Qutub Minar|Delhi|Delhi
Heritage|Humayun's Tomb|Delhi|Delhi
Heritage|India Gate|Delhi|Delhi
Heritage|Gateway of India|Mumbai, Maharashtra|Maharashtra
Heritage|Hawa Mahal|Jaipur, Rajasthan|Rajasthan
Heritage|Amer Fort|Jaipur, Rajasthan|Rajasthan
Heritage|City Palace|Jaipur, Rajasthan|Rajasthan
Heritage|Jaisalmer Fort|Jaisalmer, Rajasthan|Rajasthan
Heritage|Mehrangarh Fort|Jodhpur, Rajasthan|Rajasthan
Heritage|Umaid Bhawan Palace|Jodhpur, Rajasthan|Rajasthan
Heritage|Chittorgarh Fort|Chittorgarh, Rajasthan|Rajasthan
Heritage|Kumbhalgarh Fort|Rajsamand, Rajasthan|Rajasthan
Heritage|Gwalior Fort|Gwalior, Madhya Pradesh|Madhya Pradesh
Heritage|Golconda Fort|Hyderabad, Telangana|Telangana
Heritage|Charminar|Hyderabad, Telangana|Telangana
Heritage|Mysore Palace|Mysore, Karnataka|Karnataka
Heritage|Victoria Memorial|Kolkata, West Bengal|West Bengal
Heritage|Chhatrapati Shivaji Maharaj Terminus|Mumbai, Maharashtra|Maharashtra
Heritage|Statue of Unity|Kevadia, Gujarat|Gujarat
Heritage|Jallianwala Bagh|Amritsar, Punjab|Punjab
Heritage|Cellular Jail|Port Blair, Andaman & Nicobar|Andaman & Nicobar
Heritage|Vivekananda Rock Memorial|Kanyakumari, Tamil Nadu|Tamil Nadu
Heritage|Bara Imambara|Lucknow, Uttar Pradesh|Uttar Pradesh
Spiritual|Golden Temple|Amritsar, Punjab|Punjab
Spiritual|Varanasi Ghats|Varanasi, Uttar Pradesh|Uttar Pradesh
Spiritual|Kedarnath Temple|Rudraprayag, Uttarakhand|Uttarakhand
Spiritual|Badrinath Temple|Chamoli, Uttarakhand|Uttarakhand
Spiritual|Amarnath Cave|Anantnag, Jammu & Kashmir|Jammu & Kashmir
Spiritual|Vaishno Devi Temple|Katra, Jammu & Kashmir|Jammu & Kashmir
Spiritual|Tirupati Balaji Temple|Tirumala, Andhra Pradesh|Andhra Pradesh
Spiritual|Meenakshi Amman Temple|Madurai, Tamil Nadu|Tamil Nadu
Spiritual|Brihadisvara Temple|Thanjavur, Tamil Nadu|Tamil Nadu
Spiritual|Ramanathaswamy Temple|Rameswaram, Tamil Nadu|Tamil Nadu
Spiritual|Jagannath Temple|Puri, Odisha|Odisha
Spiritual|Sun Temple|Konark, Odisha|Odisha
Spiritual|Somnath Temple|Prabhas Patan, Gujarat|Gujarat
Spiritual|Dwarkadhish Temple|Dwarka, Gujarat|Gujarat
Spiritual|Siddhi Vinayak Temple|Mumbai, Maharashtra|Maharashtra
Spiritual|Mahabodhi Temple|Bodh Gaya, Bihar|Bihar
Spiritual|Dilwara Temples|Mount Abu, Rajasthan|Rajasthan
Spiritual|Akshardham Temple|Delhi|Delhi
Spiritual|Lotus Temple|Delhi|Delhi
Spiritual|Kamakhya Temple|Guwahati, Assam|Assam
Spiritual|Gurudwara Bangla Sahib|Delhi|Delhi
Spiritual|Basilica of Bom Jesus|Old Goa, Goa|Goa
Spiritual|Haji Ali Dargah|Mumbai, Maharashtra|Maharashtra
Spiritual|Velankanni Church|Velankanni, Tamil Nadu|Tamil Nadu
Spiritual|Palitana Temples|Bhavnagar, Gujarat|Gujarat
Archaeological|Ajanta Caves|Aurangabad, Maharashtra|Maharashtra
Archaeological|Ellora Caves|Aurangabad, Maharashtra|Maharashtra
Archaeological|Elephanta Caves|Mumbai, Maharashtra|Maharashtra
Archaeological|Hampi Ruins|Hampi, Karnataka|Karnataka
Archaeological|Khajuraho Temples|Khajuraho, Madhya Pradesh|Madhya Pradesh
Archaeological|Sanchi Stupa|Sanchi, Madhya Pradesh|Madhya Pradesh
Archaeological|Mahabalipuram Monuments|Mamallapuram, Tamil Nadu|Tamil Nadu
Archaeological|Pattadakal Monuments|Pattadakal, Karnataka|Karnataka
Archaeological|Rani ki Vav|Patan, Gujarat|Gujarat
Archaeological|Champaner-Pavagadh Archaeological Park|Gujarat|Gujarat
Archaeological|Nalanda Mahavihara Ruins|Nalanda, Bihar|Bihar
Archaeological|Bhimbetka Rock Shelters|Raisen, Madhya Pradesh|Madhya Pradesh
Mountains|Leh Ladakh|Ladakh|Ladakh
Mountains|Pangong Lake|Ladakh|Ladakh
Mountains|Gulmarg|Jammu & Kashmir|Jammu & Kashmir
Mountains|Srinagar & Dal Lake|Jammu & Kashmir|Jammu & Kashmir
Mountains|Manali & Solang Valley|Himachal Pradesh|Himachal Pradesh
Mountains|Shimla|Himachal Pradesh|Himachal Pradesh
Mountains|Dharamshala & McLeod Ganj|Himachal Pradesh|Himachal Pradesh
Mountains|Spiti Valley|Himachal Pradesh|Himachal Pradesh
Mountains|Ooty|Tamil Nadu|Tamil Nadu
Mountains|Kodaikanal|Tamil Nadu|Tamil Nadu
Mountains|Munnar|Kerala|Kerala
Mountains|Wayanad|Kerala|Kerala
Mountains|Darjeeling|West Bengal|West Bengal
Mountains|Gangtok|Sikkim|Sikkim
Mountains|Nainital|Uttarakhand|Uttarakhand
Mountains|Mussoorie|Uttarakhand|Uttarakhand
Mountains|Valley of Flowers|Uttarakhand|Uttarakhand
Mountains|Shillong|Meghalaya|Meghalaya
Mountains|Tawang|Arunachal Pradesh|Arunachal Pradesh
Mountains|Mount Abu|Rajasthan|Rajasthan
Nature|Goa Beaches|Goa|Goa
Nature|Rann of Kutch|Gujarat|Gujarat
Nature|Alleppey Backwaters|Kerala|Kerala
Nature|Varkala Beach|Kerala|Kerala
Nature|Radhanagar Beach|Havelock Island, Andaman|Andaman & Nicobar
Nature|Jim Corbett National Park|Uttarakhand|Uttarakhand
Nature|Ranthambore National Park|Rajasthan|Rajasthan
Nature|Kaziranga National Park|Assam|Assam
Nature|Sundarbans National Park|West Bengal|West Bengal
Nature|Gir National Park|Gujarat|Gujarat
Nature|Kanha National Park|Madhya Pradesh|Madhya Pradesh
Nature|Jog Falls|Karnataka|Karnataka
Nature|Dudhsagar Falls|Goa|Goa
Nature|Athirappilly Waterfalls|Kerala|Kerala
Nature|Chitrakote Falls|Bastar, Chhattisgarh|Chhattisgarh
Nature|Lonar Crater Lake|Maharashtra|Maharashtra
Nature|Borra Caves|Araku Valley, Andhra Pradesh|Andhra Pradesh
Nature|Root Bridges of Cherrapunji|Meghalaya|Meghalaya
`.trim().split("\n").map((line, index) => {
	const [category, name, location, state] = line.split("|");
	return { category, name, location, state, index };
});

const map = L.map("india-map", { scrollWheelZoom: false }).setView([22.5937, 78.9629], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" }).addTo(map);
let marker = L.marker([22.5937, 78.9629]).addTo(map).bindPopup("India");

function fillSelect(select, values, placeholder) {
	select.innerHTML = `<option value="">${placeholder}</option>`;
	values.forEach((value) => select.add(new Option(value, value)));
	select.disabled = values.length === 0;
}

function resetBelow(selects) {
	selects.forEach((select) => {
		select.innerHTML = `<option value="">Choose ${select.id.replace("-select", "")}</option>`;
		select.disabled = true;
	});
}

countrySelect.addEventListener("change", () => {
	resetBelow([districtSelect, citySelect, placeSelect]);
	fillSelect(stateSelect, Object.keys(destinations[countrySelect.value] || {}), "Choose a state");
	renderGallery();
});

stateSelect.addEventListener("change", () => {
	resetBelow([citySelect, placeSelect]);
	fillSelect(districtSelect, Object.keys(destinations[countrySelect.value]?.[stateSelect.value] || {}), "Choose a district");
	renderGallery();
});

districtSelect.addEventListener("change", () => {
	resetBelow([placeSelect]);
	const cities = Object.keys(destinations[countrySelect.value]?.[stateSelect.value]?.[districtSelect.value] || {});
	fillSelect(citySelect, cities, "Choose a city");
	renderGallery();
});

citySelect.addEventListener("change", () => {
	const places = destinations[countrySelect.value]?.[stateSelect.value]?.[districtSelect.value]?.[citySelect.value] || [];
	fillSelect(placeSelect, places.map(([name]) => name), "Choose a place");
	renderGallery();
});

placeSelect.addEventListener("change", () => {
	const place = (destinations[countrySelect.value]?.[stateSelect.value]?.[districtSelect.value]?.[citySelect.value] || []).find(([name]) => name === placeSelect.value);
	if (!place) return;
	const [name, latitude, longitude, time, distance] = place;
	const city = citySelect.value;
	summary.innerHTML = `<span class="summary-kicker">${stateSelect.value} · ${city}</span><h3>${name}</h3><p>A considered stop in ${city}, chosen for the kind of day you will remember.</p>`;
	document.getElementById("time-value").textContent = time;
	document.getElementById("distance-value").textContent = `${distance} from ${city} city centre · by road`;
	travelTime.hidden = false;
	savePlace.hidden = false;
	savePlace.href = "my-trip.html";
	savePlace.onclick = () => localStorage.setItem("vayuLastPlace", JSON.stringify({ country: countrySelect.value, state: stateSelect.value, city, name }));
	mapLabel.textContent = `${name} · ${city}`;
	marker.setLatLng([latitude, longitude]).bindPopup(`<strong>${name}</strong><br>${time} from ${city} centre`).openPopup();
	map.setView([latitude, longitude], 12, { animate: true });
});

function selectedGalleryPlaces() {
	const districts = destinations[countrySelect.value]?.[stateSelect.value] || {};
	if (!districtSelect.value) return [];
	return Object.entries(districts[districtSelect.value] || {}).flatMap(([city, places]) => places.map((place) => ({ place, city })));
}

function imageForPlace(name, index) {
	const lowerName = name.toLowerCase();
	if (lowerName.includes("market") || lowerName.includes("food")) return galleryImages[3];
	if (lowerName.includes("river") || lowerName.includes("lake")) return galleryImages[2];
	if (lowerName.includes("museum") || lowerName.includes("heritage")) return galleryImages[1];
	return galleryImages[index % galleryImages.length];
}

function renderGallery() {
	const renderId = ++galleryRenderId;
	const query = placeSearch.value.trim().toLowerCase();
	const places = heritageCatalog.filter((item) => {
		const matchesState = !stateSelect.value || item.state === stateSelect.value;
		return matchesState && `${item.name} ${item.location} ${item.category}`.toLowerCase().includes(query);
	});
	imageContext.textContent = stateSelect.value ? `${places.length} places in the ${stateSelect.value} collection. Select an image to learn more.` : `${places.length} handpicked places across India. Select an image to learn more.`;
	if (!places.length) {
		imageGrid.innerHTML = '<p class="empty-gallery">No places match that search yet. Try another word or clear the search.</p>';
		return;
	}
	imageGrid.innerHTML = places.map((item, index) => `<button class="place-card" type="button" data-place-index="${index}" style="background-image: url('${imageForCatalog(item, index)}')"><span>${item.category} · ${item.state}</span><h3>${item.name}</h3><small>${item.location}</small></button>`).join("");
	imageGrid.querySelectorAll(".place-card").forEach((card, index) => card.addEventListener("click", () => openCatalogDetails(places[index])));
	hydrateCatalogImages(places, renderId);
}

function imageForCatalog(item, index) {
	if (locationImageCache.has(item.name)) return locationImageCache.get(item.name);
	const categoryImages = { Heritage: galleryImages[1], Spiritual: galleryImages[0], Archaeological: galleryImages[2], Mountains: galleryImages[4], Nature: galleryImages[3] };
	return categoryImages[item.category] || galleryImages[index % galleryImages.length];
}

async function fetchLocationImage(item) {
	if (locationImageCache.has(item.name)) return locationImageCache.get(item.name);
	const search = encodeURIComponent(`${item.name} ${item.location}`);
	const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${search}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=900&format=json&origin=*`;
	try {
		const response = await fetch(endpoint);
		const data = await response.json();
		const page = data.query && Object.values(data.query.pages)[0];
		const image = page && page.imageinfo && page.imageinfo[0] && (page.imageinfo[0].thumburl || page.imageinfo[0].url);
		if (image) {
			locationImageCache.set(item.name, image);
			return image;
		}
	} catch (error) {
		return imageForCatalog(item, item.index);
	}
	return imageForCatalog(item, item.index);
}

async function hydrateCatalogImages(places, renderId) {
	for (let index = 0; index < places.length; index += 8) {
		if (renderId !== galleryRenderId) return;
		const batch = places.slice(index, index + 8);
		const images = await Promise.all(batch.map((item) => fetchLocationImage(item)));
		if (renderId !== galleryRenderId) return;
		batch.forEach((item, batchIndex) => {
			const card = imageGrid.querySelector(`[data-place-index="${index + batchIndex}"]`);
			if (card && images[batchIndex]) card.style.backgroundImage = `url('${images[batchIndex]}')`;
		});
	}
}

function historyForCatalog(item) {
	const histories = {
		Heritage: `${item.name} is part of India's layered cultural story, shaped by the dynasties, communities and craft traditions of ${item.location}.`,
		Spiritual: `${item.name} remains a living place of faith, shaped by generations of pilgrims, rituals and local tradition.`,
		Archaeological: `${item.name} preserves an important chapter of the Indian subcontinent's architecture, archaeology and artistic history.`,
		Mountains: `${item.name} is a highland escape where landscape, local culture and mountain life meet.`,
		Nature: `${item.name} is a landscape-led destination known for its distinct ecology, scenery and local way of life.`
	};
	return histories[item.category];
}

function openingTimeForCatalog(item) {
	if (item.category === "Spiritual") return "Opening time coming soon · Ritual timings can vary by day.";
	if (item.category === "Nature") return "Usually daylight hours · Park and trail permits may apply.";
	if (item.category === "Mountains") return "Open daylight hours · Weather conditions can change access.";
	return "Opening time coming soon · Check the local authority before visiting.";
}

function openCatalogDetails(item) {
	dialogLocation.textContent = `${item.category} · ${item.location}`;
	dialogTitle.textContent = item.name;
	dialogImage.style.backgroundImage = `url('${imageForCatalog(item, item.index)}')`;
	dialogHistory.textContent = historyForCatalog(item);
	dialogSeason.textContent = `Best time: ${item.category === "Mountains" ? "April to June and September to November" : "October to March, depending on local weather"}. ${openingTimeForCatalog(item)}`;
	dialogStatus.textContent = "";
	placeDialog.showModal();
	placeDialog.dataset.catalogName = item.name;
	placeDialog.dataset.catalogLocation = item.location;
	placeDialog.dataset.catalogState = item.state;
	fetchLocationImage(item).then((image) => { dialogImage.style.backgroundImage = `url('${image}')`; });
}

function openPlaceDetails(place, city) {
	const [name] = place;
	dialogLocation.textContent = `${districtSelect.value} · ${city} · ${stateSelect.value}`;
	dialogTitle.textContent = name;
	dialogImage.style.backgroundImage = `url('${imageForPlace(name, 0)}')`;
	dialogHistory.textContent = `${name} sits within the living story of ${city}. Take time to notice the local craft, food and people around this place, not just the landmark itself.`;
	dialogSeason.textContent = name.toLowerCase().includes("river") || name.toLowerCase().includes("lake") ? "October to March, when the weather is clear and comfortable." : "October to March for cooler days; arrive early for a quieter visit.";
	dialogStatus.textContent = "";
	placeDialog.showModal();
}

placeSearch.addEventListener("input", renderGallery);
document.getElementById("dialog-close").addEventListener("click", () => placeDialog.close());
document.getElementById("make-trip").addEventListener("click", () => {
	const selectedPlace = placeDialog.dataset.catalogName || placeSelect.value;
	const selectedLocation = placeDialog.dataset.catalogLocation || citySelect.value;
	const selectedState = placeDialog.dataset.catalogState || stateSelect.value;
	localStorage.setItem("vayuBookedTour", JSON.stringify({ country: countrySelect.value, state: selectedState, district: districtSelect.value || "Featured destination", city: selectedLocation, place: selectedPlace, duration: "2 days · custom local tour" }));
	dialogStatus.textContent = "Tour added. Opening My Trip...";
	setTimeout(() => { window.location.href = "my-trip.html"; }, 500);
});

countrySelect.dispatchEvent(new Event("change"));