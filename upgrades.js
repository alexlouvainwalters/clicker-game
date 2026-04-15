let upgrades = {
	rusticOven: {
		identifier: "rustic-oven-upgrade",
		name: "Rustic Oven",
		effectDescription: "Click Strength x10",
		description: "Born to cook pizzas, forced to bake cookies.",
		cost: 500,
		currentCookiesRequirement: 25,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	modernOven: {
		identifier: "modern-oven-upgrade",
		name: "Modern Oven",
		effectDescription: "Click Strength x10",
		description: "With all new temperature dials!",
		cost: 10000,
		currentCookiesRequirement: 1000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	fancyOven: {
		identifier: "fancy-oven-upgrade",
		name: "Fancy Oven",
		effectDescription: "Click Strength x10",
		description: "The future of cookies is now.",
		cost: 500000,
		currentCookiesRequirement: 25000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	mouseClick: {
		identifier: "mouse-click-upgrade",
		name: "Mouse Click",
		effectDescription: "Finger CPS x2",
		description: "Of Clicks and Cookies.",
		cost: 5000,
		currentCookiesRequirement: 500,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 2
	},
	autoClick: {
		identifier: "auto-click-upgrade",
		name: "Auto Click",
		effectDescription: "Finger CPS x5",
		description: "Wait, that's cheating!",
		cost: 20000,
		currentCookiesRequirement: 4000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 5
	},
	dullRollingPin: {
		identifier: "dull-rolling-pin-upgrade",
		name: "Dull Rolling Pin",
		effectDescription: "Grammy CPS x1.5",
		description: "That's pincredible!",
		cost: 10000,
		currentCookiesRequirement: 2000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 1.5
	},
	shinyRollingPin: {
		identifier: "shiny-rolling-pin-upgrade",
		name: "Shiny Rolling Pin",
		effectDescription: "Click Strength x10",
		description: "For Grammy's Secret Recipe.",
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
	image.onmouseenter = () => showTooltip(upgrade.name + "\n" + upgrade.effectDescription + "\n\"" + upgrade.description + "\"\nCost: " + formatNumber(upgrade.cost));
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

		hideTooltip();
		for (let id in buildings) {
			updateBuildingContainer(id);
		}
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