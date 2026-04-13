let buildings = {
	finger: {
		identifier: "finger-building",
		name: "Finger",
		description: "(Base CPS: 0.1)",
		startCost: 200,
		costMultiplier: 1.12,
		currentCookiesRequirement: 100,
		baseCPS: 0.1
	},
	grammy: {
		identifier: "grammy-building",
		name: "Grammy",
		description: "(Base CPS: 1)",
		startCost: 500,
		costMultiplier: 1.15,
		currentCookiesRequirement: 250,
		baseCPS: 1
	}
};

function getCPS() {
	return (
		game.numFingerOwned * buildings.finger.baseCPS +
		game.numGrammyOwned * buildings.grammy.baseCPS
	);
}

function processTickCPS() {
	game.cookiesHundredthBuffer += Math.round(getCPS() * 10);

	changeScore(Math.floor(game.cookiesHundredthBuffer / 100));
	game.cookiesHundredthBuffer %= 100;
}

function getBuildingCost(building, owned) {
	return Math.floor(building.startCost * Math.pow(building.costMultiplier, owned));
}

function createBuildingContainer(id) {
	const building = buildings[id];

	const container = document.createElement("div");
	container.id = building.identifier;
	container.classList.add("building-shop-item");

	const numOwned = document.createElement("p");
	const ownedKey = "num" + id.charAt(0).toUpperCase() + id.slice(1) + "Owned";
	const owned = game[ownedKey];
	numOwned.classList.add("building-shop-owned");
	numOwned.textContent = owned;

	const image = document.createElement("img");
	image.src = "assets/images/" + building.identifier + ".png";
	image.onclick = () => buyBuilding(id);

	const name = document.createElement("p");
	name.textContent = building.name;

	const description = document.createElement("p");
	description.textContent = building.description;

	const cost = document.createElement("p");
	cost.classList.add("building-shop-cost");
	cost.textContent = "Cost: " + getBuildingCost(building, owned);

	const cps = document.createElement("p");
	cps.classList.add("building-shop-cps");
	cps.textContent = "CPS: " + (owned * building.baseCPS);

	container.appendChild(numOwned);
	container.appendChild(image);
	container.appendChild(name);
	container.appendChild(description);
	container.appendChild(cost);
	container.appendChild(cps);
	document.getElementById("building-shop").appendChild(container);
}

function updateBuildingContainer(id) {
	const building = buildings[id];

	const container = document.getElementById(building.identifier);

	const ownedKey = "num" + id.charAt(0).toUpperCase() + id.slice(1) + "Owned";
	const owned = game[ownedKey];

	const numOwned = container.querySelector(".building-shop-owned");
	numOwned.textContent = owned;

	const cost = container.querySelector(".building-shop-cost");
	cost.textContent = "Cost: " + getBuildingCost(building, owned);

	const cps = container.querySelector(".building-shop-cps");
	cps.textContent = "CPS: " + (owned * building.baseCPS);
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

	const ownedKey = "num" + id.charAt(0).toUpperCase() + id.slice(1) + "Owned";
	const owned = game[ownedKey];

	if (game.cookies >= getBuildingCost(building, owned)) {
		changeScore(-getBuildingCost(building, owned));
		game[ownedKey]++;

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