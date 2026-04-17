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
	},
	doughstone: {
		identifier: "doughstone-building",
		name: "Doughstone",
		description: "The world is built on cookies. Literally.",
		startCost: 20_000,
		costMultiplier: 1.2,
		currentCookiesRequirement: 5_000,
		baseCPS: 100
	}
};

function getCPS() {
	let total = 0;

	for (let id in buildings) {
		total += game.buildingsOwned[id] * buildings[id].baseCPS * game.buildingsStrength[id] * game.cpsMultiplier;
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

	const numOwned = document.createElement("h2");
	const owned = game.buildingsOwned[id];
	numOwned.classList.add("building-shop-owned");
	numOwned.textContent = formatNumber(owned);

	const strength = game.buildingsStrength[id] * game.cpsMultiplier;

	const image = document.createElement("img");
	image.classList.add("building-shop-image");
	image.src = "assets/images/" + building.identifier + ".png";
	image.onclick = () => buyBuilding(id);
	image.onmouseenter = () => {
		currentTooltip = building.identifier;
		showTooltip(
			"Owned: " + formatNumber(owned) +
			"<br>" + building.name +
			"<br>Base CPS: " + formatNumber(building.baseCPS * strength) + " (" + formatNumber(building.baseCPS) + " x " + formatNumber(strength) + ")" +
			"<br>\"" + building.description + "\"" +
			"<br><span class=\"tooltip-cost\">Cost: " + formatNumber(getBuildingCost(id)) + "</span>" +
			"<br>CPS: " + formatNumber(owned * building.baseCPS * strength)
		);
		updateAffordabilityDisplay(document.querySelector("#tooltip .tooltip-cost"), getBuildingCost(id));
	};
	image.onmouseleave = () => {
		currentTooltip = null;
		hideTooltip();
	};

	const cost = document.createElement("p");
	cost.classList.add("building-shop-cost");
	cost.textContent = "Cost: " + formatNumber(getBuildingCost(id));
	updateAffordabilityDisplay(cost, getBuildingCost(id));

	container.appendChild(numOwned);
	container.appendChild(image);
	container.appendChild(cost);
	document.getElementById("building-shop").appendChild(container);
}

function updateBuildingContainer(id) {
	const building = buildings[id];

	const container = document.getElementById(building.identifier);

	if (container) {
		const owned = game.buildingsOwned[id];
		const strength = game.buildingsStrength[id] * game.cpsMultiplier;

		const numOwned = container.querySelector(".building-shop-owned");
		numOwned.textContent = formatNumber(owned);

		const cost = container.querySelector(".building-shop-cost");
		cost.textContent = "Cost: " + formatNumber(getBuildingCost(id));
		updateAffordabilityDisplay(cost, getBuildingCost(id));

		const image = container.querySelector(".building-shop-image");
		image.onmouseenter = () => {
			currentTooltip = building.identifier;
			showTooltip(
				"Owned: " + formatNumber(owned) +
				"<br>" + building.name +
				"<br>Base CPS: " + formatNumber(building.baseCPS * strength) + " (" + formatNumber(building.baseCPS) + " x " + formatNumber(strength) + ")" +
				"<br>\"" + building.description + "\"" +
				"<br><span class=\"tooltip-cost\">Cost: " + formatNumber(getBuildingCost(id)) + "</span>" +
				"<br>CPS: " + formatNumber(owned * building.baseCPS * strength)
			);
			updateAffordabilityDisplay(document.querySelector("#tooltip .tooltip-cost"), getBuildingCost(id));
		};

		updateTooltip(
			"Owned: " + formatNumber(owned) +
			"<br>" + building.name +
			"<br>Base CPS: " + formatNumber(building.baseCPS * strength) + " (" + formatNumber(building.baseCPS) + " x " + formatNumber(strength) + ")" +
			"<br>\"" + building.description + "\"" +
			"<br><span class=\"tooltip-cost\">Cost: " + formatNumber(getBuildingCost(id)) + "</span>" +
			"<br>CPS: " + formatNumber(owned * building.baseCPS * strength)
		);
		updateAffordabilityDisplay(document.querySelector("#tooltip .tooltip-cost"), getBuildingCost(id));
	}
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