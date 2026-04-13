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