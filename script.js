let game = {
	cookies: 0,
};

function saveGame() {
	localStorage.setItem("save", JSON.stringify(game));
}

function loadGame() {
	const save = localStorage.getItem("save");
	if (save) {
		const parsed = JSON.parse(save);

		game = {
			...game,
			...parsed
		};
	}
}



function addScore(quantity = 1) {
	game.cookies += quantity;
	updateDisplay();
	saveGame();
}

function updateDisplay() {
	const displayText = game.cookies === 1 ? "cookie" : "cookies";

	document.getElementById("cookie-display").textContent = game.cookies + " " + displayText;
}

loadGame();
saveGame();
updateDisplay();
setInterval(saveGame, 5000);