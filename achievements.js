let achievements = {
	myFirstCookie: {
		identifier: "my-first-cookie-achievement",
		name: "My First Cookie",
		description: "Bake a cookie.",
		condition: () => game.lifetimeCookies >= 1
	},
	mySecondCookie: {
		identifier: "my-second-cookie-achievement",
		name: "My Second Cookie",
		description: "Bake another cookie.",
		condition: () => game.lifetimeCookies >= 2
	},
	kForKookies: {
		identifier: "k-for-kookies-achievement",
		name: "K for Kookies",
		description: "Bake 1,000 cookies.",
		condition: () => game.lifetimeCookies >= 1_000
	},
	mForMookies: {
		identifier: "m-for-mookies-achievement",
		name: "M for Mookies",
		description: "Bake 1 million cookies.",
		condition: () => game.lifetimeCookies >= 1_000_000
	},
	artOfTheDough: {
		identifier: "art-of-the-dough-achievement",
		name: "Art of the Dough",
		description: "Bake 1 billion cookies.",
		condition: () => game.lifetimeCookies >= 1_000_000_000
	},
	richCookie: {
		identifier: "rich-cookie-achievement",
		name: "Rich Cookie",
		description: "Bake 1 trillion cookies.",
		condition: () => game.lifetimeCookies >= 1_000_000_000_000
	},
	thisIsAddictive: {
		identifier: "this-is-addictive-achievement",
		name: "This Is Addictive",
		description: "Click the cookie 10 times.",
		condition: () => game.clicks >= 10
	},
	clickingTime: {
		identifier: "clicking-time-achievement",
		name: "Clicking Time",
		description: "Click the cookie 100 times.",
		condition: () => game.clicks >= 100
	},
	justToBeThatMan: {
		identifier: "just-to-be-that-man-achievement",
		name: "Just to Be That Man",
		description: "Click the cookie 1,000 times.",
		condition: () => game.clicks >= 1_000
	},
	cookiemania: {
		identifier: "cookiemania-achievement",
		name: "Cookiemania",
		description: "Click the cookie 10,000 times.",
		condition: () => game.clicks >= 10_000
	},
	why: {
		identifier: "why-achievement",
		name: "Why",
		description: "Click the cookie 100,000 times.",
		condition: () => game.clicks >= 100_000
	},
	productionLine: {
		identifier: "production-line-achievement",
		name: "Production Line",
		description: "Reach 1,000 CPS.",
		condition: () => getCPS() >= 1_000
	},
	cookieEmpire: {
		identifier: "cookie-empire-achievement",
		name: "Cookie Empire",
		description: "Reach 1 million CPS.",
		condition: () => getCPS() >= 1_000_000
	},
	forAllCookiekind: {
		identifier: "for-all-cookiekind-achievement",
		name: "For All Cookiekind",
		description: "Reach 1 billion CPS.",
		condition: () => getCPS() >= 1_000_000_000
	},
	outnumbered: {
		identifier: "outnumbered-achievement",
		name: "Outnumbered",
		description: "Reach 1 trillion CPS.",
		condition: () => getCPS() >= 1_000_000_000_000
	},
	betterCookies: {
		identifier: "better-cookies-achievement",
		name: "Better Cookies",
		description: "Purchase an upgrade.",
		condition: () => Object.keys(game.upgradesOwned).length >= 1
	},
	evenBetterCookies: {
		identifier: "even-better-cookies-achievement",
		name: "Even Better Cookies",
		description: "Purchase 10 upgrades.",
		condition: () => Object.keys(game.upgradesOwned).length >= 10
	},
	theBestCookies: {
		identifier: "the-best-cookies-achievement",
		name: "The Best Cookies",
		description: "Purchase all upgrades.",
		condition: () => Object.keys(game.upgradesOwned).length >= Object.keys(upgrades).length
	},
	crossedForCookies: {
		identifier: "crossed-for-cookies-achievement",
		name: "Crossed for Cookies",
		description: "Own a finger.",
		condition: () => game.buildingsOwned["finger"] >= 1
	},
	moreThanTen: {
		identifier: "more-than-ten-achievement",
		name: "More Than Ten",
		description: "Own 25 fingers.",
		condition: () => game.buildingsOwned["finger"] >= 25
	},
	handsOffMyFood: {
		identifier: "hands-off-my-food-achievement",
		name: "Hands off My Food",
		description: "Own 50 fingers.",
		condition: () => game.buildingsOwned["finger"] >= 50
	},
	digitalCookies: {
		identifier: "digital-cookies-achievement",
		name: "Digital Cookies",
		description: "Own 100 fingers.",
		condition: () => game.buildingsOwned["finger"] >= 100
	},
	stillInDate: {
		identifier: "still-in-date-achievement",
		name: "Still in Date",
		description: "Own a grammy.",
		condition: () => game.buildingsOwned["grammy"] >= 1
	},
	batterThanTheRest: {
		identifier: "batter-than-the-rest-achievement",
		name: "Batter Than the Rest",
		description: "Own 25 grammys.",
		condition: () => game.buildingsOwned["grammy"] >= 25
	},
	buildingAnArmy: {
		identifier: "building-an-army-achievement",
		name: "Building an Army",
		description: "Own 50 grammys.",
		condition: () => game.buildingsOwned["grammy"] >= 50
	},
	oneHundredToughCookies: {
		identifier: "one-hundred-tough-cookies-achievement",
		name: "One Hundred Tough Cookies",
		description: "Own 100 grammys.",
		condition: () => game.buildingsOwned["grammy"] >= 100
	},
	theCircleOfLife: {
		identifier: "the-circle-of-life-achievement",
		name: "The Circle of Life",
		description: "Own a cookie tree.",
		condition: () => game.buildingsOwned["cookieTree"] >= 1
	},
	cookieForest: {
		identifier: "cookie-forest-achievement",
		name: "Cookie Forest",
		description: "Own 25 cookie trees.",
		condition: () => game.buildingsOwned["cookieTree"] >= 25
	},
	zeroEmissions: {
		identifier: "zero-emissions-achievement",
		name: "Zero Emissions",
		description: "Own 50 cookie trees.",
		condition: () => game.buildingsOwned["cookieTree"] >= 50
	},
	rootOfAllEvil: {
		identifier: "root-of-all-evil-achievement",
		name: "Root of All Evil",
		description: "Own 100 cookie trees.",
		condition: () => game.buildingsOwned["cookieTree"] >= 100
	},
	freshOuttaTheGround: {
		identifier: "fresh-outta-the-ground-achievement",
		name: "Fresh Outta the Ground",
		description: "Own a doughstone.",
		condition: () => game.buildingsOwned["doughstone"] >= 1
	},
	sugarDeposits: {
		identifier: "sugar-deposits-achievement",
		name: "Sugar Deposits",
		description: "Own 25 doughstones.",
		condition: () => game.buildingsOwned["doughstone"] >= 25
	},
	rockSolidSnacks: {
		identifier: "rock-solid-snacks-achievement",
		name: "Rock Solid Snacks",
		description: "Own 50 doughstones.",
		condition: () => game.buildingsOwned["doughstone"] >= 50
	},
	oresomeTreats: {
		identifier: "oresome-treats-achievement",
		name: "Oresome Treats",
		description: "Own 100 doughstones.",
		condition: () => game.buildingsOwned["doughstone"] >= 100
	},
	fin: {
		identifier: "fin-achievement",
		name: "Fin",
		description: "Unlock all other achievements.",
		condition: () => Object.keys(game.achievementsOwned).length >= Object.keys(achievements).length - 1
	}
};

function checkLockedAchievements() {
	for (let id in achievements) {
		const achievement = achievements[id];

		if (
			!game.achievementsUnlocked[id] &&
			achievement.condition()
		) {
			completeAchievement(id);
		}
	}
}

function completeAchievement(id) {
	game.achievementsOwned[id] = true;

	updateAchievementsList();
}