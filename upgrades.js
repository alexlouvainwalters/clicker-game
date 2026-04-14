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
		description: "Click Strength x2",
		cost: 200,
		currentCookiesRequirement: 50,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 2
	},
	fancyOven: {
		identifier: "fancy-oven-upgrade",
		name: "Fancy Oven",
		description: "Click Strength x5",
		cost: 1000,
		currentCookiesRequirement: 400,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 5
	}
};

function createUpgradeContainer(id) {
	const upgrade = upgrades[id];

	const image = document.createElement("img");
	image.id = upgrade.identifier;
	image.src = "assets/images/" + upgrade.identifier + ".png";
	image.onclick = () => buyUpgrade(id);
	image.onmouseenter = (e) => showTooltip(
		upgrade.name + "\n" + upgrade.description + "\nCost: " + formatNumber(upgrade.cost),
		e
	);
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