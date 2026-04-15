let upgrades = {
	rusticOven: {
		identifier: "rustic-oven-upgrade",
		name: "Rustic Oven",
		description: "Click Strength x10",
		cost: 500,
		currentCookiesRequirement: 25,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	modernOven: {
		identifier: "modern-oven-upgrade",
		name: "Modern Oven",
		description: "Click Strength x10",
		cost: 10000,
		currentCookiesRequirement: 1000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	fancyOven: {
		identifier: "fancy-oven-upgrade",
		name: "Fancy Oven",
		description: "Click Strength x10",
		cost: 500000,
		currentCookiesRequirement: 25000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	mouseClick: {
		identifier: "mouse-click-upgrade",
		name: "Mouse Click",
		description: "Finger CPS x2",
		cost: 5000,
		currentCookiesRequirement: 500,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 2
	},
	autoClick: {
		identifier: "auto-click-upgrade",
		name: "Auto Click",
		description: "Finger CPS x5",
		cost: 20000,
		currentCookiesRequirement: 4000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 5
	},
	dullRollingPin: {
		identifier: "dull-rolling-pin-upgrade",
		name: "Dull Rolling Pin",
		description: "Grammy CPS x1.5",
		cost: 10000,
		currentCookiesRequirement: 2000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 1.5
	},
	shinyRollingPin: {
		identifier: "shiny-rolling-pin-upgrade",
		name: "Shiny Rolling Pin",
		description: "Grammy CPS x2",
		cost: 50000,
		currentCookiesRequirement: 15000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 2
	}
};

function createUpgradeContainer(id) {
	const upgrade = upgrades[id];

	const image = document.createElement("img");
	image.id = upgrade.identifier;
	image.src = "assets/images/" + upgrade.identifier + ".png";
	image.onclick = () => buyUpgrade(id);
	image.onmouseenter = () => showTooltip(upgrade.name + "\n" + upgrade.description + "\nCost: " + formatNumber(upgrade.cost));
	image.onmouseleave = () => hideTooltip();


	document.getElementById("upgrade-shop").appendChild(image);
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

		createUpgradeContainer(id);
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