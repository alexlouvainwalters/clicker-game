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
		game.cpsMultiplier = parsed.clickStrength ?? 1;
		game.buildingsUnlocked = parsed.buildingsUnlocked ?? {};
		game.buildingsOwned = parsed.buildingsOwned ?? {};
		game.buildingsStrength = parsed.buildingsStrength ?? {};
		game.upgradesUnlocked = parsed.upgradesUnlocked ?? {};
		game.upgradesOwned = parsed.upgradesOwned ?? {};
	}

	for (let id in buildings) {
		game.buildingsOwned[id] ??= 0;
		game.buildingsStrength[id] ??= 1;
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
		cpsMultiplier: 1,
		buildingsUnlocked: {},
		buildingsOwned: {},
		buildingsStrength: {},
		upgradesUnlocked: {},
		upgradesOwned: {}
	};

	for (let id in buildings) {
		game.buildingsOwned[id] = 0;
		game.buildingsStrength[id] = 1;
	}

	document.getElementById("upgrade-shop").innerHTML = "";
	document.getElementById("building-shop").innerHTML = "";

	updateCookieDisplay();
	displayUpgradesInit();
	displayBuildingsInit();
	saveGame();
}