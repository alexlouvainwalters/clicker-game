let upgrades = {
	plainCookie: {
		identifier: "plain-cookie-upgrade",
		name: "Plain Cookie",
		effectDescription: "CPS x2",
		description: "Can't go wrong with it.",
		cost: 10_000,
		currentCookiesRequirement: 0,
		lifetimeCookiesRequirement: 10_000,
		clicksRequirement: 0,
		effect: () => game.cpsMultiplier *= 2
	},
	crunchyCookie: {
		identifier: "crunchy-cookie-upgrade",
		name: "Crunchy Cookie",
		effectDescription: "CPS x2",
		description: "Wait until after your dentist visit.",
		cost: 100_000,
		currentCookiesRequirement: 0,
		lifetimeCookiesRequirement: 100_000,
		clicksRequirement: 0,
		effect: () => game.cpsMultiplier *= 2
	},
	chocolateChipCookie: {
		identifier: "chocolate-chip-cookie-upgrade",
		name: "Chocolate Chip Cookie",
		effectDescription: "CPS x2",
		description: "How sweet!",
		cost: 10_000_000,
		currentCookiesRequirement: 0,
		lifetimeCookiesRequirement: 10_000_000,
		clicksRequirement: 0,
		effect: () => game.cpsMultiplier *= 2
	},
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
		cost: 10_000,
		currentCookiesRequirement: 1_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	fancyOven: {
		identifier: "fancy-oven-upgrade",
		name: "Fancy Oven",
		effectDescription: "Click Strength x10",
		description: "The future of cookies is now.",
		cost: 500_000,
		currentCookiesRequirement: 25_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.clickStrength *= 10
	},
	mouseClicker: {
		identifier: "mouse-clicker-upgrade",
		name: "Mouse Clicker",
		effectDescription: "Finger CPS x2",
		description: "Of Clicks and Cookies.",
		cost: 5_000,
		currentCookiesRequirement: 500,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 2
	},
	doubleClicker: {
		identifier: "double-clicker-upgrade",
		name: "Double Clicker",
		effectDescription: "Finger CPS x2",
		description: "Micetosis?",
		cost: 20_000,
		currentCookiesRequirement: 4_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 2
	},
	autoClicker: {
		identifier: "auto-clicker-upgrade",
		name: "Auto Clicker",
		effectDescription: "Finger CPS x5",
		description: "Wait, that's cheating!",
		cost: 80_000,
		currentCookiesRequirement: 40_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 5
	},
	turboClicker: {
		identifier: "turbo-clicker-upgrade",
		name: "Turbo Clicker",
		effectDescription: "Finger CPS x4",
		description: "Rocket fuel powered.",
		cost: 400_000,
		currentCookiesRequirement: 150_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 4
	},
	hyperClicker: {
		identifier: "hyper-clicker-upgrade",
		name: "Hyper Clicker",
		effectDescription: "Finger CPS x5",
		description: "Don't give sugar to a mouse...",
		cost: 2_000_000,
		currentCookiesRequirement: 500_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["finger"] *= 5
	},
	dullRollingPin: {
		identifier: "dull-rolling-pin-upgrade",
		name: "Dull Rolling Pin",
		effectDescription: "Grammy CPS x1.5",
		description: "That's pincredible!",
		cost: 10_000,
		currentCookiesRequirement: 2_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 1.5
	},
	shinyRollingPin: {
		identifier: "shiny-rolling-pin-upgrade",
		name: "Shiny Rolling Pin",
		effectDescription: "Grammy CPS x2",
		description: "For Grammy's Secret Recipe.",
		cost: 50_000,
		currentCookiesRequirement: 15_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 2
	},
	metalRollingPin: {
		identifier: "metal-rolling-pin-upgrade",
		name: "Metal Rolling Pin",
		effectDescription: "Grammy CPS x2.5",
		description: "For tough-to-knead dough.",
		cost: 1_000_000,
		currentCookiesRequirement: 300_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 2.5
	},
	spikyRollingPin: {
		identifier: "spiky-rolling-pin-upgrade",
		name: "Spiky Rolling Pin",
		effectDescription: "Grammy CPS x3",
		description: "Store out of sight from children.",
		cost: 50_000_000,
		currentCookiesRequirement: 5_000_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["grammy"] *= 3
	},
	leakyHose: {
		identifier: "leaky-hose-upgrade",
		name: "Leaky Hose",
		effectDescription: "Cookie Tree CPS x3",
		description: "Just found it out back.",
		cost: 20_000,
		currentCookiesRequirement: 5_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["cookieTree"] *= 3
	},
	cleanHose: {
		identifier: "clean-hose-upgrade",
		name: "Clean Hose",
		effectDescription: "Cookie Tree CPS x3",
		description: "Lord of the Rinse.",
		cost: 100_000,
		currentCookiesRequirement: 25_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["cookieTree"] *= 3
	},
	stainlessSteelHose: {
		identifier: "stainless-steel-hose-upgrade",
		name: "Stainless Steel Hose",
		effectDescription: "Cookie Tree CPS x3",
		description: "With a 1 day warranty included!",
		cost: 5_000_000,
		currentCookiesRequirement: 1_000_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["cookieTree"] *= 3
	},
	brokenDrill: {
		identifier: "broken-drill-upgrade",
		name: "Broken Drill",
		effectDescription: "Doughstone CPS x1.5",
		description: "Repairman refused cookies as payment.",
		cost: 500_000,
		currentCookiesRequirement: 50_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["doughstone"] *= 1.5
	},
	industryDrill: {
		identifier: "industry-drill-upgrade",
		name: "Industry Drill",
		effectDescription: "Doughstone CPS x10",
		description: "Cookie density increases with depth.",
		cost: 25_000_000,
		currentCookiesRequirement: 10_000_000,
		lifetimeCookiesRequirement: 0,
		clicksRequirement: 0,
		effect: () => game.buildingsStrength["doughstone"] *= 10
	},
};

function createUpgradeContainer(id) {
	const upgrade = upgrades[id];

	const image = document.createElement("img");
	image.id = upgrade.identifier;
	image.src = "assets/images/" + upgrade.identifier + ".png";
	image.onclick = () => buyUpgrade(id);
	image.onmouseenter = () => {
		currentTooltip = upgrade.identifier;
		showTooltip(
			upgrade.name +
			"<br>" + upgrade.effectDescription +
			"<br>\"" + upgrade.description + "\"" +
			"<br><span class=\"tooltip-cost\">Cost: " + formatNumber(upgrade.cost) + "</span>"
		);
		updateAffordabilityDisplay(document.querySelector("#tooltip .tooltip-cost"), upgrade.cost);
	};
	image.onmouseleave = () => {
		currentTooltip = null;
		hideTooltip();
	};

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