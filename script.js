let game = {
	cookies: 0,
	lifetimeCookies: 0,
	clicks: 0,
	clickStrength: 1,
	upgradesUnlocked: {},
	upgradesOwned: {}
};

let upgrades = {
	rusticOven: {
		identifier: "rustic-oven-upgrade",
		name: "Rustic Oven",
		description: "Click Strength x2",
		cost: 50,
		currentCookiesRequirement: 0,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 2
	},
	modernOven: {
		identifier: "modern-oven-upgrade",
		name: "Modern Oven",
		description: "Click Strength x5",
		cost: 200,
		currentCookiesRequirement: 0,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 5
	}
};

function saveGame() {
	localStorage.setItem("save", JSON.stringify(game));
}

function loadGame() {
	const save = localStorage.getItem("save");
	if (save) {
		const parsed = JSON.parse(save);

		game = {
			...game,
			...parsed,
			upgradesUnlocked: parsed.upgradesUnlocked || {},
			upgradesOwned: parsed.upgradesOwned || {}
		};
	}
}

function resetGame() {
	localStorage.removeItem("save");

	game = {
		cookies: 0,
		lifetimeCookies: 0,
		clicks: 0,
		clickStrength: 1,
		upgradesUnlocked: {},
		upgradesOwned: {}
	};

	document.getElementById("upgrade-shop").innerHTML = "";

	updateDisplay();
	displayUpgradesInit();
	saveGame();
}

function changeScore(quantity = 1) {
	game.cookies += quantity;
	if (quantity > 0) {
		game.lifetimeCookies += quantity;
	}

	checkLockedUpgrades();
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

loadGame();
updateCookieDisplay();
displayUpgradesInit();
checkLockedUpgrades();

setInterval(() => {
	checkLockedUpgrades();
	saveGame();
}, 500);