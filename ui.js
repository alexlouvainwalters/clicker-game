const shortFormat = new Intl.NumberFormat("en");
const longFormat = new Intl.NumberFormat("en", {
	notation: "compact",
	compactDisplay: "long",
	maximumFractionDigits: 3
});

const tooltip = document.getElementById("tooltip");

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
	saveGame();
}

function processCookieClick() {
	game.clicks++;
	changeScore(game.clickStrength);
}

function showTooltip(text) {
	updateTooltip(text);
	tooltip.style.display = "block";
}

function updateTooltip(text) {
	tooltip.textContent = text;
}

function hideTooltip() {
	tooltip.style.display = "none";
}

document.addEventListener("mousemove", (e) => {
	if (tooltip.style.display === "block") {
		tooltip.style.left = e.pageX + 16 + "px";
		tooltip.style.top = e.pageY + 16 + "px";
	}
})