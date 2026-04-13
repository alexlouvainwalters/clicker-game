let game = {
	cookies: 0,
	cookiesHundredthBuffer: 0,
	lifetimeCookies: 0,
	clicks: 0,
	clickStrength: 1,
	buildingsUnlocked: {},
	numFingerOwned: 0,
	numGrammyOwned: 0,
	upgradesUnlocked: {},
	upgradesOwned: {}
};

let upgrades = {
	rusticOven: {
		identifier: "rustic-oven-upgrade",
		name: "Rustic Oven",
		description: "Click Strength x2",
		cost: 50,
		currentCookiesRequirement: 10,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 2
	},
	modernOven: {
		identifier: "modern-oven-upgrade",
		name: "Modern Oven",
		description: "Click Strength x5",
		cost: 200,
		currentCookiesRequirement: 100,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 5
	}
};

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

function saveGame() {
	localStorage.setItem("save", JSON.stringify(game));
}

function loadGame() {
	const save = localStorage.getItem("save");
	if (save) {
		const parsed = JSON.parse(save);

		game.cookies = parsed.cookies ?? 0;
		game.cookiesHundredthBuffer = parsed.cookiesHundredthBuffer ?? 0;
		game.lifetimeCookies = parsed.lifetimeCookies ?? 0;
		game.clicks = parsed.clicks ?? 0;
		game.clickStrength = parsed.clickStrength ?? 1;
		game.buildingsUnlocked = parsed.buildingsUnlocked ?? {};
		game.numFingerOwned = parsed.numFingerOwned ?? 0;
		game.numGrammyOwned = parsed.numGrammyOwned ?? 0;
		game.upgradesUnlocked = parsed.upgradesUnlocked ?? {};
		game.upgradesOwned = parsed.upgradesOwned ?? {};
	}
}

function resetGame() {
	localStorage.removeItem("save");

	game = {
		cookies: 0,
		cookiesHundredthBuffer: 0,
		lifetimeCookies: 0,
		clicks: 0,
		clickStrength: 1,
		buildingsUnlocked: {},
		numFingerOwned: 0,
		numGrammyOwned: 0,
		upgradesUnlocked: {},
		upgradesOwned: {}
	};

	document.getElementById("upgrade-shop").innerHTML = "";
	document.getElementById("building-shop").innerHTML = "";

	updateCookieDisplay();
	displayUpgradesInit();
	displayBuildingsInit();
	saveGame();
}

function changeScore(quantity = 1) {
	game.cookies += quantity;
	if (quantity > 0) {
		game.lifetimeCookies += quantity;
	}

	checkLockedUpgrades();
	checkLockedBuildings();
	updateCookieDisplay();
	saveGame();
}

function processCookieClick() {
	game.clicks++;
	changeScore(game.clickStrength);
}

function updateCookieDisplay() {
	const displayText = game.cookies === 1 ? "cookie" : "cookies";

	document.getElementById("cookie-display").textContent = game.cookies + " " + displayText;
}

function checkLockedUpgrades() {
	for (let id in upgrades) {
		const upgrade = upgrades[id];

		if (
			!game.upgradesUnlocked[id] &&
			!game.upgradesOwned[id] &&
			game.cookies >= upgrade.currentCookiesRequirement &&
			game.lifetimeCookies >= upgrade.lifetimeCookiesRequirement &&
			game.clicks >= upgrade.clicksRequirement
		) {
			unlockUpgrade(id);
		}
	}
}

function unlockUpgrade(id) {
	const upgrade = upgrades[id];

	if (!document.getElementById(upgrade.identifier)) {
		game.upgradesUnlocked[id] = true;

		const img = document.createElement("img");
		img.id = upgrade.identifier;
		img.src = "assets/images/" + upgrade.identifier + ".png";
		img.onclick = () => buyUpgrade(id);
		document.getElementById("upgrade-shop").appendChild(img);
	}
}

function buyUpgrade(id) {
	const upgrade = upgrades[id];

	if (game.cookies >= upgrade.cost) {
		game.upgradesOwned[id] = true;
		upgrade.effect();
		changeScore(-upgrade.cost);
		document.getElementById(upgrade.identifier).remove();
	}
}

function displayUpgradesInit() {
	for (let id in upgrades) {
		if (
			game.upgradesUnlocked[id] &&
			!game.upgradesOwned[id]
		) {
			unlockUpgrade(id);
		}
	}
}

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

loadGame();
updateCookieDisplay();
displayUpgradesInit();
displayBuildingsInit();
checkLockedUpgrades();
checkLockedBuildings();

setInterval(() => {
	checkLockedUpgrades();
	saveGame();
}, 500);

setInterval(() => {
	processTickCPS();
}, 100);