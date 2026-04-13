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

function getBuildingCost(building, owned) {
	return Math.floor(building.startCost * Math.pow(building.costMultiplier, owned));
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

		const img = document.createElement("img");
		img.id = building.identifier;
		img.src = "assets/images/" + building.identifier + ".png";
		img.onclick = () => buyBuilding(id);
		document.getElementById("building-shop").appendChild(img);
	}
}

function buyBuilding(id) {
	const building =  buildings[id];

	const ownedKey = "num" + id.charAt(0).toUpperCase() + id.slice(1) + "Owned";
	const owned = game[ownedKey];

	if (game.cookies >= getBuildingCost(building, owned)) {
		changeScore(-getBuildingCost(building, owned));
		game[ownedKey]++;
	}
}

function displayBuildingsInit() {
	for (let id in buildings) {
		if (game.buildingsUnlocked[id]) {
			unlockBuilding(id);
		}
	}
}

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