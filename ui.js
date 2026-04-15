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