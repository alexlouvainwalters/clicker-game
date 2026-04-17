loadGame();
updateCookieDisplay();
updateUpgradesList();
displayUpgradesInit();
displayBuildingsInit();
checkLockedUpgrades();
checkLockedBuildings();

setInterval(() => {
	checkLockedUpgrades();
	checkLockedBuildings();
	saveGame();
}, 500);

setInterval(() => {
	processTickCPS();
}, 100);