function updateCookieDisplay() {
	const displayText = game.cookies === 1 ? "cookie" : "cookies";

	document.getElementById("cookie-display").textContent = game.cookies + " " + displayText;
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