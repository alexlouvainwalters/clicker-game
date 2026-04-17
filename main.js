loadGame();
updateCookieDisplay();
updateUpgradesList();
updateAchievementsList();
displayUpgradesInit();
displayBuildingsInit();
checkLockedUpgrades();
checkLockedBuildings();
checkLockedAchievements();

setInterval(() => {
	checkLockedUpgrades();
	checkLockedBuildings();
	checkLockedAchievements();
	saveGame();
}, 500);

setInterval(() => {
	processTickCPS();
}, 100);