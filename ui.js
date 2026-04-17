const shortFormat = new Intl.NumberFormat("en");
const longFormat = new Intl.NumberFormat("en", {
	notation: "compact",
	compactDisplay: "long",
	maximumFractionDigits: 3
});

const tooltip = document.getElementById("tooltip");
let currentTooltip = null;

function formatNumber(num) {
	if (Math.abs(num) < 1000000) {
		return shortFormat.format(num);
	} else {
		return longFormat.format(num);
	}
}

function updateCookieDisplay() {
	const displayText = game.cookies === 1 ? "cookie" : "cookies";
	document.getElementById("cookie-display").textContent = formatNumber(game.cookies) + " " + displayText;

	document.getElementById("cps-display").textContent = "per second: " + formatNumber(getCPS());
}

function changeScore(quantity = 1) {
	game.cookies += quantity;
	if (quantity > 0) {
		game.lifetimeCookies += quantity;
	}

	checkLockedUpgrades();
	checkLockedBuildings();
	checkLockedAchievements();
	updateCookieDisplay();
	refreshAffordability();
	saveGame();
}

function processCookieClick() {
	game.clicks++;
	changeScore(game.clickStrength);
}

function refreshAffordability() {
	for (let id in buildings) {
		const building = buildings[id];
		const container = document.getElementById(building.identifier);

		if (container) {
			const cost = container.querySelector(".building-shop-cost");
			if (cost) {
				updateAffordabilityDisplay(cost, getBuildingCost(id));
			}
		}
	}

	if (tooltip.style.display === "block" && currentTooltip) {
		const tooltipCost = document.querySelector("#tooltip .tooltip-cost");

		if (tooltipCost) {
			for (let id in upgrades) {
				const upgrade = upgrades[id];

				if (upgrade.identifier === currentTooltip) {
					updateAffordabilityDisplay(tooltipCost, upgrade.cost);
					return;
				}
			}

			for (let id in buildings) {
				const building = buildings[id];

				if (building.identifier === currentTooltip) {
					updateAffordabilityDisplay(tooltipCost, getBuildingCost(id));
					return;
				}
			}
		}
	}
}

function updateAffordabilityDisplay(element, cost) {
	const affordable = game.cookies >= cost;

	element.classList.remove("affordable", "unaffordable");
	element.classList.add(affordable ? "affordable" : "unaffordable");
}

function updateUpgradesList() {
	const container = document.getElementById("upgrade-list");
	container.innerHTML = "";

	const owned = Object.keys(game.upgradesOwned).length;
	const total = Object.keys(upgrades).length;
	const percentage = (100 * owned / total).toFixed(1)

	for (let id in upgrades) {
		const upgrade = upgrades[id];

		const image = document.createElement("img");

		if (game.upgradesOwned[id]) {
			image.src = "assets/images/" + upgrade.identifier + ".png";
			image.onmouseenter = () => showTooltip(
				upgrade.name +
				"<br>" + upgrade.effectDescription +
				"<br>\"" + upgrade.description + "\""
			);
			image.onmouseleave = () => {
				currentTooltip = null;
				hideTooltip();
			};
		} else {
			image.src = "assets/images/locked.png";
			image.onmouseenter = () => showTooltip("Locked");
			image.onmouseleave = () => {
				currentTooltip = null;
				hideTooltip();
			};
		}

		container.appendChild(image);
	}

	const progress = document.getElementById("upgrade-progress");
	progress.textContent = owned + " / " + total + " (" + percentage + "%)";
}

function updateAchievementsList() {
	const container = document.getElementById("achievement-list");
	container.innerHTML = "";

	const owned = Object.keys(game.achievementsOwned).length;
	const total = Object.keys(achievements).length;
	const percentage = (100 * owned / total).toFixed(1)

	for (let id in achievements) {
		const achievement = achievements[id];

		const image = document.createElement("img");

		if (game.achievementsOwned[id]) {
			image.src = "assets/images/" + achievement.identifier + ".png";
			image.onmouseenter = () => showTooltip(
				achievement.name +
				"<br>" + achievement.description
			);
			image.onmouseleave = () => {
				currentTooltip = null;
				hideTooltip();
			};
		} else {
			image.src = "assets/images/locked.png";
			image.onmouseenter = () => showTooltip("Locked");
			image.onmouseleave = () => {
				currentTooltip = null;
				hideTooltip();
			};
		}

		container.appendChild(image);
	}

	const progress = document.getElementById("achievement-progress");
	progress.textContent = owned + " / " + total + " (" + percentage + "%)";
}

function showTooltip(text) {
	updateTooltip(text);
	tooltip.style.display = "block";
}

function updateTooltip(text) {
	tooltip.innerHTML = text;
}

function hideTooltip() {
	tooltip.style.display = "none";
}

document.addEventListener("mousemove", (e) => {
	if (tooltip.style.display === "block") {
		tooltip.style.left = e.pageX + 16 + "px";
		tooltip.style.top = e.pageY + 16 + "px";
	}
});