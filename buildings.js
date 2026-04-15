let buildings = {
	finger: {
		identifier: "finger-building",
		name: "Finger",
		description: "Finger-lickin' good!",
		startCost: 20,
		costMultiplier: 1.12,
		currentCookiesRequirement: 10,
		baseCPS: 0.1
	},
	grammy: {
		identifier: "grammy-building",
		name: "Grammy",
		description: "Baked with love.",
		startCost: 100,
		costMultiplier: 1.15,
		currentCookiesRequirement: 20,
		baseCPS: 1
	},
	cookieTree: {
		identifier: "cookie-tree-building",
		name: "Cookie Tree",
		description: "Because they grow on trees, right?",
		startCost: 800,
		costMultiplier: 1.17,
		currentCookiesRequirement: 200,
		baseCPS: 5
	}
};

function getCPS() {
	let total = 0;

	for (let id in buildings) {
		total += game.buildingsOwned[id] * buildings[id].baseCPS * game.buildingsStrength[id];
	}

	return total;
}

function processTickCPS() {
	game.cookiesHundredthBuffer += Math.round(getCPS() * 10);

	changeScore(Math.floor(game.cookiesHundredthBuffer / 100));
	game.cookiesHundredthBuffer %= 100;
}

function getBuildingCost(id) {
	const building = buildings[id];

	const owned = game.buildingsOwned[id];

	return Math.floor(building.startCost * Math.pow(building.costMultiplier, owned));
}

function createBuildingContainer(id) {
	const building = buildings[id];

	const container = document.createElement("div");
	container.id = building.identifier;
	container.classList.add("building-shop-item");

	const numOwned = document.createElement("p");
	const owned = game.buildingsOwned[id];
	numOwned.classList.add("building-shop-owned");
	numOwned.textContent = formatNumber(owned);

	const image = document.createElement("img");
	image.src = "assets/images/" + building.identifier + ".png";
	image.onclick = () => buyBuilding(id);

	const name = document.createElement("p");
	name.textContent = building.name;

	const cpsStrength = document.createElement("p");
	const strength = game.buildingsStrength[id];
	cpsStrength.classList.add("building-shop-cps-strength");
	cpsStrength.textContent = "Base CPS: " + formatNumber(building.baseCPS * strength) + " (" + formatNumber(building.baseCPS) + " x " + formatNumber(strength) + ")";

	const description = document.createElement("p");
	description.textContent = building.description;

	const cost = document.createElement("p");
	cost.classList.add("building-shop-cost");
	cost.textContent = "Cost: " + formatNumber(getBuildingCost(id));

	const cps = document.createElement("p");
	cps.classList.add("building-shop-cps");
	cps.textContent = "CPS: " + formatNumber(owned * building.baseCPS * strength);

	container.appendChild(numOwned);
	container.appendChild(image);
	container.appendChild(name);
	container.appendChild(cpsStrength);
	container.appendChild(description);
	container.appendChild(cost);
	container.appendChild(cps);
	document.getElementById("building-shop").appendChild(container);
}

function updateBuildingContainer(id) {
	const building = buildings[id];

	const container = document.getElementById(building.identifier);

	const owned = game.buildingsOwned[id];

	const numOwned = container.querySelector(".building-shop-owned");
	numOwned.textContent = formatNumber(owned);

	const cpsStrength = container.querySelector(".building-shop-cps-strength");
	const strength = game.buildingsStrength[id];
	cpsStrength.textContent = "Base CPS: " + formatNumber(building.baseCPS * strength) + " (" + formatNumber(building.baseCPS) + " x " + formatNumber(strength) + ")";

	const cost = container.querySelector(".building-shop-cost");
	cost.textContent = "Cost: " + formatNumber(getBuildingCost(id));

	const cps = container.querySelector(".building-shop-cps");
	cps.textContent = "CPS: " + formatNumber(owned * building.baseCPS * strength);
}

function checkLockedBuildings() {
	for (let id in buildings) {
		const building = buildings[id];

		if (
			!game.buildingsUnlocked[id] &&
			game.cookies >= building.currentCookiesRequirement
		) {
			unlockBuilding(id);
		}
	}
}

function unlockBuilding(id) {
	const building = buildings[id];

	if (!document.getElementById(building.identifier)) {
		game.buildingsUnlocked[id] = true;

		createBuildingContainer(id);
	}
}

function buyBuilding(id) {
	const building =  buildings[id];

	const owned = game.buildingsOwned[id];

	if (game.cookies >= getBuildingCost(id)) {
		changeScore(-getBuildingCost(id));
		game.buildingsOwned[id]++;

		updateBuildingContainer(id);
	}
}

function displayBuildingsInit() {
	for (let id in buildings) {
		if (game.buildingsUnlocked[id]) {
			unlockBuilding(id);
		}
	}
}