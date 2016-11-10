var eggs = 0;
var breedsClicks = 0;
var eggsPerSecond = 0;
var clicks = 1;
var totalEggs = 0;
var love = 50;
var loveDrop = 0.01;
var upgradeCount = 0;
var saveString = "null";
var loaded = 0;
var eventCount = 0;
var eventsChance = 5000;
var totalBuildings = 8;
var EPSModifier = 1;
var clickBoost = 0;
var baseClicks = 1;
var isPopupOn = 0;
var achievementsUnlocked = 0;
var oldTimer = new Date().getTime();
var delay;
var expPoints = 0;
var level = 1;
var loveMessageFlag = 0;
var x;
var expPointGain = 1;
var expVariable = 0;

//BigClick
function updateEPS() {
	updateBuildingsDesc();
	eggsPerSecond = 0;
	for (i = 0; i < totalBuildings; i++) {
		eggsPerSecond = Math.round(((eggsPerSecond + (buildingsAmount[i] * buildingsGain[i]))) * 100) / 100;
		document.getElementById(buildingsNames[i]).innerHTML = buildingsAmount[i].toString();
		document.getElementById(buildingsCostNames[i]).innerHTML = buildingsPrice[i].toString();
	}
	eggsPerSecond *= EPSModifier * buff;
	document.getElementById('eggsPerSecond').innerHTML = parseFloat(Math.round(eggsPerSecond * 100) / 100).toFixed(2);
	achievementsAmount();
	clicks = baseClicks + eggsPerSecond * clickBoost;
	document.getElementById("clicksAmountes").innerHTML = parseFloat(Math.round(clicks * 100) / 100).toFixed(2);
	document.getElementById("upgradeCount").innerHTML = upgradeCount.toString();
	currentExpGain = 0;
	for (i = 0; i < totalDojos; i++) {
		currentExpGain += dojoAmount[i] * dojoGain[i];
	}
}

function updateEggs() {
	document.getElementById('bidoofs').innerHTML = parseFloat(Math.round(eggs * 10) / 10).toFixed(1);
	love = Math.round(love * 1000) / 1000;

	checkLove();
	sumBuildings();
	niceTexts();
	achievementChecker();

	document.getElementById("love").innerHTML = '<progress value="' + parseFloat(Math.round(love * 100) / 100).toFixed(1) + '" max="100" id="lovebar"></progress><p>Love Meter</p>'
	document.getElementById("totaleggs").innerHTML = parseFloat(Math.round(totalEggs * 10) / 10).toFixed(1);
	document.getElementById("gametime").innerHTML = parseFloat(Math.round(seconds / 10)).toFixed(0);
	document.getElementById("totalBuildings").innerHTML = buildingsTotal.toString();
	document.getElementById("eventCount").innerHTML = eventCount.toString();
	document.getElementById("achives").innerHTML = achievementsUnlocked.toString();

	if (expPoints >= Math.pow(level + 1, 3)) {
		level++;
		printPopup("Level up! Lv." + level);
	}
	updateExp();
	document.getElementById("expToolTip").title = "Exp. Points per Second: " + (Math.round(currentExpGain * 100) / 100).toString();
	document.getElementById("totalExpPoints").innerHTML = (Math.round(expPoints * 10) / 10).toString();


}

function niceTexts() {
	if (totalEggs < 6) {
		document.getElementById("thingsThatHappen").innerHTML = "Bidoofs are staring at you with dumb look on their faces...";
	}
	if (totalEggs >= 6) {
		document.getElementById("thingsThatHappen").innerHTML = "Bidoofs have overtaken your whole party...";
	}
	if (totalEggs >= 30) {
		document.getElementById("thingsThatHappen").innerHTML = "Bill called you, there's not enough space to store Bidoofs...";
	}
	if (totalEggs >= 1000) {
		document.getElementById("thingsThatHappen").innerHTML = "You get the feeling that too many eyes are staring at you...";
	}
	if (totalEggs >= 10000) {
		document.getElementById("thingsThatHappen").innerHTML = "You got 10000 emails with the same Bidoof photo attached...";
	}
	if (totalEggs >= 100000) {
		document.getElementById("thingsThatHappen").innerHTML = "One of the Bidoofs won the national election...";
	}
	if (totalEggs >= 1000000) {
		document.getElementById("thingsThatHappen").innerHTML = "Grandma Bidoof just started her own cereal brand...";
	}
	if (totalEggs >= 10000000) {
		document.getElementById("thingsThatHappen").innerHTML = "Bidoof political party split, riots start in capital...";
	}
	if (love >= 60 && loveMessageFlag == 1) {
		document.getElementById("thingsThatHappen").innerHTML = "So far you've managed to please your Bidoofs...";
	}
	if (love < 40 && loveMessageFlag == 1) {
		document.getElementById("thingsThatHappen").innerHTML = "Bad things may happen if your love is low...";
	}
	if (love < 20 && loveMessageFlag == 1) {
		document.getElementById("thingsThatHappen").innerHTML = "Bad things WILL happen now that your love is low!";
	}
	if (((spareFlag[27] == 1) || (killTracker[27] > 0)) && ((spareFlag[28] == 0) && (killTracker[28] == 0))) {
		document.getElementById("thingsThatHappen").innerHTML = "YOU HAVE AWAKENED HIM.";
	}
	if (((spareFlag[27] == 1) || (killTracker[27] > 0)) && ((spareFlag[28] == 0) && (killTracker[28] == 0)) && loveMessageFlag == 1) {
		document.getElementById("thingsThatHappen").innerHTML = "STAY DETERMINED.";
	}
	if (boosteffect == 1) {
		document.getElementById("thingsThatHappen").innerHTML = "AAAA BIDOOFBOOST AAA EGGS";
	}
	//console.log(totalEggs);}
}


function saveGame() {
	saveString = eggs.toString() + "|" +
		love + "|" +
		seconds + "|" +
		breedsClicks + "|" +
		totalEggs + "|" +
		eventCount + "|" +
		buff + "|" +
		boosteffect + "|" +
		boostTimer + "|";
	saveString += "Q|"
	for (i = 0; i < totalBuildings; i++) {
		saveString += buildingsPrice[i] + "|" + buildingsAmount[i] + "|";
	}
	saveString += "X|";
	for (j = 0; j < totalUpgrades; j++) {
		saveString += upgradeIsBought[j] + "|";
	}
	saveString += "Y|";
	for (k = 0; k < totalAchievements; k++) {
		saveString += eggchivmentsUnlocked[k] + "|";
	}
	saveString += "Z|";
	for (i = 0; i < totalDojos; i++) {
		saveString += dojoAmount[i] + "|";
	}
	saveString += "V|";
	saveString += expPoints + "|";
	for (i = 0; i < totalUpgrades; i++) {
		saveString += killTracker[i] + "|";
	}
	console.log(saveString);
	addCookie("savefile2", saveString, 365 * 10);
	document.getElementById('isLoved').innerHTML = "Game Saved!";
	timercount = 0;
}

function addCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie() {
	document.cookie = 'savefile=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	var loadedsave = document.cookie;
	var s = loadedsave.length;
	console.log(loadedsave);
	updateBuildingsDesc();
	toggleEggs();
	if (s != 0) {
		loadedsave = loadedsave.substring(10, s);
		console.log(loadedsave);
		document.getElementById('isLoved').innerHTML = "Save loaded!";

		var arrayofvalues = loadedsave.split("|");
		//document.getElementById('thingsThatHappen').innerHTML = arrayofvalues;
		var arrayofbuildings = arrayofvalues.indexOf("Q") + 1;
		var arrayofupgrades = arrayofvalues.indexOf("X") + 1;
		var arrayofachievements = arrayofvalues.indexOf("Y") + 1;
		var arrayofdojos = arrayofvalues.indexOf("Z") + 1;
		var arrayofrest = arrayofvalues.indexOf("V") + 1;
		console.log(arrayofbuildings);
		eggs = parseInt(arrayofvalues[0]);
		love = arrayofvalues[1];
		seconds = parseInt(arrayofvalues[2]);
		breedsClicks = arrayofvalues[3];
		totalEggs = parseInt(arrayofvalues[4]);
		eventCount = parseInt(arrayofvalues[5]);
		buff = parseInt(arrayofvalues[6]);
		boosteffect = parseInt(arrayofvalues[7]);
		boostTimer = parseInt(arrayofvalues[8]);

		for (i = 0; i < totalBuildings; i++) {
			buildingsPrice[i] = parseInt(arrayofvalues[arrayofbuildings + i * 2]);
			buildingsAmount[i] = parseInt(arrayofvalues[arrayofbuildings + 1 + i * 2]);
		}

		for (var j = 0; j < totalUpgrades; j++) {
			upgradeIsBought[j] = parseInt(arrayofvalues[arrayofupgrades + j]);
			if (upgradeIsBought[j] == 1) {
				upgradeTypeThings(j);
				spareFlag[j] = 1;
			}
		}

		for (var l = 0; l < totalAchievements; l++) {
			eggchivmentsUnlocked[l] = parseInt(arrayofvalues[arrayofachievements + l]);
		}
		for (i = 0; i < totalDojos; i++) {
			dojoAmount[i] = parseInt(arrayofvalues[arrayofdojos + i]);
			var tempDojos = dojoAmount[i];
			for (j = tempDojos; j > 0; j--) {
				dojoPrice[i] = Math.floor(dojoPrice[i] * 1.3);
			}

		}
		expPoints = parseInt(arrayofvalues[arrayofrest]);
		for (i = 0; i < totalUpgrades; i++) {
			killTracker[i] = parseInt(arrayofvalues[arrayofrest + 1 + i]);
		}
		for (i = level; i < 1000; i++) {
			if (expPoints >= Math.pow(level + 1, 3)) {
				level++;
			} else {
				break;
			}
		}
	}
	achievementChecker();
	toggleEggs();
	updateEggs();
	updateEPS();
	printPopup("Welcome to Bidoof Clicker, 2015, 2016 Szymbar");
	loaded = 1;
}
window.onload = getCookie;

function checkLove() {
	if (love > 100) {
		love = 100;
	} else if (love < 0) {
		love = 0;
	}
}
//Clicking
var bidoofAppears = 0;

function bidoofClick(e) {
	eggs += clicks;
	updateEggs();
	breedsClicks++;
	totalEggs = Math.round((totalEggs + clicks) * 10) / 10;
	document.getElementById("clicks").innerHTML = breedsClicks.toString();
	document.getElementById("totaleggs").innerHTML = totalEggs.toString();
	checkLove();
	love = Math.round((love + 0.3) * 100) / 100;
	updateEggs();
	var xcoord = 0;
	var ycoord = 0;
	if (!e) e = window.event;
	if (e.pageX || e.pageY) {
		xcoord = e.pageX;
		ycoord = e.pageY;
	} else if (e.clientX || e.clientY) {
		xcoord = e.clientX;
		ycoord = e.clientY;
	}
	console.log(xcoord + " " + ycoord);
	bidoofAppears = 1;
	bidoofAppearsTimer = 0;
	document.getElementById("clickingEggs").style.top = ycoord + 15 + "px";
	document.getElementById("clickingEggs").style.left = xcoord + 5 + "px";
	document.getElementById("clickingEggs").visibility = "visible";
	document.getElementById("clickingEggs").style.opacity = "0.4";
	expPoints += expPointGain + expVariable * currentExpGain;
	console.log(expPoints);
	updateEggs();
	updateExp();
}

function updateExp() {
	var expstring = '<progress id="expbar" value="';
	if (level == 1) {
		expstring += (expPoints + 1 - Math.pow(level, 3)).toString() + '" max="' + (Math.pow(level + 1, 3)).toString() + '"></progress><p>Exp Points: ' + (Math.round(expPoints)).toString() + '/' + (Math.pow(level + 1, 3)).toString() + '; Lv.' + level.toString() + '</p>';

	} else {
		expstring += (expPoints - Math.pow(level, 3)).toString() + '" max="' + (Math.pow(level + 1, 3) - Math.pow(level, 3)).toString() + '"></progress><p>Exp Points: ' + (Math.round(expPoints - Math.pow(level, 3))).toString() + '/' + (Math.pow(level + 1, 3) - Math.pow(level, 3)).toString() + '; Lv.' + level.toString() + '</p>';

	}
	document.getElementById("exp").innerHTML = expstring;
}


//Menu
function toggleEggs() {
	document.getElementById("powerup").style.display = 'none';
	document.getElementById("statistics").style.display = 'none';
	document.getElementById("achievements").style.display = 'none';
	var loadAllEggFactories = "";
	for (i = 0; i < totalBuildings; i++) {
		//loadAllEggFactories+='<button name="upgrade" class="abc" id="upgrade" type="reset" onclick="buy('+i+')">'+buildingsHTML[i]+'<br />'+buildingsDesc[i]+'<br />Mamas: <span id="'+ buildingsNames[i]+ '">0</span><br />Cost: <span id="'+ buildingsCostNames[i] + '">15</span></button><br />';
		loadAllEggFactories += '<button name="upgrade" class="abc" id="upgrade" type="reset" onclick="buy(' + i + ')"><div id="' + buildingsNames[i] + '" class="buildingamount">0</div><div id="buildingdetails"><span id="subtitles">' + buildingsHTML[i] + '</span><br />' + buildingsDesc[i] + '<br/>Cost: <span id="' + buildingsCostNames[i] + '">' + buildingsPrice[i] + '</span></div></button><br />';
	}
	console.log(loadAllEggFactories);
	document.getElementById("upgrade").innerHTML = loadAllEggFactories;
	document.getElementById("upgrade").style.display = 'inline';
	document.getElementById("dojo").style.display = 'none';
	document.getElementById("battles").style.display = 'none';
	updateEggs();
	updateEPS();
	toggledAchives = 0;
}

/*function toggleUpgrades () {
    	document.getElementById("upgrade").style.display = 'none';
    	document.getElementById("statistics").style.display = 'none';
    	document.getElementById("achievements").style.display = 'none';
    	document.getElementById("powerup").style.display = 'inline';
		document.getElementById("dojo").style.display = 'none';
		document.getElementById("battles").style.display = 'none';
        var loadAllUpgrades="";
	for (j=0; j<totalUpgrades; j++) {
		loadAllUpgrades+='<button class="powered" id="' + upgradeNames[j] + '" type="reset" onclick="buyUpgrade(' + j + ')">' + upgradeHTML[j] + '<br />' + upgradeDesc[j] + '<br /><span id="complectionrate">Cost: <span id="' + upgradeCostNames[j] + '">' + upgradePrice[j] + '</span></span></button>';
	}
	document.getElementById("powerup").innerHTML = loadAllUpgrades;
	for (i=0; i<totalUpgrades; i++) {
		if (upgradeIsBought[i]==0) {
			document.getElementById(upgradeNames[i]).disabled = false;
		} else if (upgradeIsBought[i]==1) {
			document.getElementById(upgradeNames[i]).disabled = true; 
			document.getElementById(upgradeCostNames[i]).innerHTML = "DONE"; 
		}
	}
	toggledAchives=0;
}*/

function toggleStats() {
	document.getElementById("powerup").style.display = 'none';
	document.getElementById("upgrade").style.display = 'none';
	document.getElementById("achievements").style.display = 'none';
	document.getElementById("statistics").style.display = "inline";
	document.getElementById("clicks").innerHTML = breedsClicks.toString();
	document.getElementById("upgradeCount").innerHTML = upgradeCount.toString();
	document.getElementById("dojo").style.display = 'none';
	document.getElementById("battles").style.display = 'none';
	toggledAchives = 0;
}
var toggledAchives = 0;

function toggleAchives() {
	document.getElementById("powerup").style.display = 'none';
	document.getElementById("statistics").style.display = 'none';
	document.getElementById("upgrade").style.display = 'none';
	document.getElementById("achievements").style.display = 'inline-block';
	document.getElementById("dojo").style.display = 'none';
	document.getElementById("battles").style.display = 'none';
	loadAchives();
	toggledAchives = 1;
}

function toggleDojo() {
	document.getElementById("powerup").style.display = 'none';
	document.getElementById("statistics").style.display = 'none';
	document.getElementById("upgrade").style.display = 'none';
	document.getElementById("achievements").style.display = 'none';
	document.getElementById("dojo").style.display = 'inline';
	document.getElementById("battles").style.display = 'none';
	var loadDojo = "";
	for (i = 0; i < totalDojos; i++) {
		loadDojo += '<button name="upgrade" class="abc" id="upgrade" type="reset" onclick="buyDojos(' + i + ')"><div id="' + dojoHTML[i] + '" class="buildingamount">0</div><div id="buildingdetails"><span id="subtitles">' + dojoNames[i] + '</span><br />' + dojoDesc[i] + '<br/>Cost: <span id="' + dojoHTML[i] + 'Price' + '">' + dojoPrice[i] + '</span></div><span id="dojotext" class="dojotext">Giving you a whooping ' + Math.floor(dojoGain[i] * 100) / 100 + 'XP/s</span></button><br />';
	}
	document.getElementById("dojo").innerHTML = loadDojo;
	for (i = 0; i < totalDojos; i++) {
		document.getElementById(dojoHTML[i]).innerHTML = dojoAmount[i].toString();
		document.getElementById(dojoHTML[i] + "Price").innerHTML = dojoPrice[i].toString();
	}
	toggledAchives = 0;
}

function toggleBattles() {
	document.getElementById("powerup").style.display = 'none';
	document.getElementById("statistics").style.display = 'none';
	document.getElementById("upgrade").style.display = 'none';
	document.getElementById("achievements").style.display = 'none';
	document.getElementById("dojo").style.display = 'none';
	document.getElementById("battles").style.display = 'inline';
	document.getElementById("battleMenu").style.display = 'inline';
	document.getElementById("battleCanvas").style.display = 'none';
	toggledAchives = 0;
	drawBattleMenu();
	//drawCanvas(0);
}

//Events
var boosteffect = 0;
var buff = 1;

function event() {
	var whateventwillitbe = Math.round(Math.random() * 4);
	if (whateventwillitbe == 0) {
		printPopup("Lucky! Your Bidoofs hatched some bonus eggs!");
		eggs += eggsPerSecond * 200;
	} else if (whateventwillitbe == 1) {
		printPopup("Hot Skitty on Wailord action boosts your love!");
		love += (100 - love) * 0.2;
	} else if (whateventwillitbe == 2) {
		printPopup("You got a free random Mama Bidoof from loving Bidoofs!");
		buildingsAmount[0] += 1;
		buildingsPrice[0] = Math.floor(buildingsPrice[0] * 1.30);
		document.getElementById(buildingsNames[0]).innerHTML = buildingsAmount[0].toString();
		document.getElementById(buildingsCostNames[0]).innerHTML = buildingsPrice[0].toString();
	} else if (whateventwillitbe == 3) {
		printPopup("Your eggs per second get boosted for 30 seconds!");
		boosteffect = 1;
		buff = 7;
	} else if (whateventwillitbe == 4) {
		printPopup("You got some free Exp. Points!");
		expPoints += Math.pow(level + 1, 3);
	}
	console.log("Lucky " + whateventwillitbe + " " + love * eventsChance / 100 + " " + randomTime);
	updateEPS();
	updateEggs();
	eventCount++;
}

function unluckyEvent() {
	var whateventwillitbe = Math.round(Math.random());
	if (whateventwillitbe == 0) {
		printPopup("You don't love your Bidoofs enough, so you lost some Eggs...");
		eggs -= eggs * 0.2;
	} else if (whateventwillitbe == 1) {
		printPopup("You've lost even more love!");
		love -= love * 0.2;
	}
	console.log("Unlucky " + whateventwillitbe + " " + love * eventsChance / 100 + " " + randomTime);
	updateEggs();
	updateEPS();
	eventCount++;
}

//Buildings
var buildingsPrice = [15, 100, 500, 2200, 8912, 42424, 111111, 666666];
var buildingsGain = [0.1, 0.7, 3, 7, 35, 142, 565, 1666];
var buildingsAmount = [0, 0, 0, 0, 0, 0, 0, 0];
var buildingsNames = ["mama", "shiny", "zombie", "kopatsch", "ahmed", "thinker", "brute", "liquid"];
var buildingsCostNames = ["mamaCost", "shinyCost", "zombieCost", "kopatschCost", "ahmedCost", "thinkerCost", "bruteCost", "liquidCost"];
var buildingsTotal = 0;
var buildingsHTML = ["Mama Bidoof", "Wannabe Shiny Painted Bidoof", "Zombidoof", "Simonnnnnn Bidoof", "Nuke Bidoof", "The Bidoof Thinker", "Russian Brute Bidoofs", "Liquid Plasma Bidoof"];
var buildingsDesc = [];

function updateBuildingsDesc() {
	buildingsDesc = [];
	buildingsDesc.push("Apparently only makes " + Math.round(buildingsGain[0] * EPSModifier * 100) / 100 + " eggs per second.",
		"Gives ya " + Math.round(buildingsGain[1] * EPSModifier * 100) / 100 + " eggs per second. It isn't really shiny. It's painted.",
		"'Converts' " + Math.round(buildingsGain[2] * EPSModifier * 100) / 100 + " brains into eggs per second ( ͡° ͜ʖ ͡°)",
		"Explorers digging out " + Math.round(buildingsGain[3] * EPSModifier * 100) / 100 + " eggs per second.",
		"30-Bidoof big terrorist organisation trapping " + Math.round(buildingsGain[4] * EPSModifier * 100) / 100 + " people in eggs per second.",
		"Evolution line with minibrains in their teeth allowing to make " + Math.round(buildingsGain[5] * EPSModifier * 100) / 100 + " eggs per second.",
		"Have giant muscles and play Tetris. Their secret to make " + Math.round(buildingsGain[6] * EPSModifier * 100) / 100 + " EPS is vodka.",
		"It wasn't so easy to cool them down to -1K, but since they make " + Math.round(buildingsGain[7] * EPSModifier * 100) / 100 + " EpS, it's worth it!")
}

function buy(order) {
	if (eggs >= buildingsPrice[order]) {
		buildingsAmount[order] += 1;
		eggs = Math.round(eggs - buildingsPrice[order]);
		buildingsPrice[order] = Math.floor(buildingsPrice[order] * 1.3);

		document.getElementById(buildingsNames[order]).innerHTML = buildingsAmount[order].toString();
		document.getElementById(buildingsCostNames[order]).innerHTML = buildingsPrice[order].toString();

		updateEggs();
		updateEPS();
		console.log(buildingsAmount);
	}

}

function sumBuildings() {
	buildingsTotal = 0;
	for (i = 0; i < totalBuildings; i++) {
		buildingsTotal += buildingsAmount[i];
	}
}

//Upgrades
var totalUpgrades = 29;
var upgradeIsBought = [
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0
];

var upgradeNames = [ /*"papa", "daycare", "eventsHappen", "alphaMale", "ancientBidoof", "polishBidoof"*/ ];
var upgradeCostNames = [ /*"papaCost", "doofCareCost", "eventsHappenCost", "alphaMaleCost", "ancientBidoofCost", "polishBidoofCost"*/ ];
var upgradeType = [
	0, 1, 5, 3,
	5, 0, 5, 6,
	2, 6, 5, 4,
	1, 0, 5, 7,
	6, 4, 5, 2,
	7, 3, 5, 6,
	6, 5, 3, 0,
	3
];
var upgradeSubType = [
	0, 0, 0, 0,
	1, 0, 2, 0,
	0, 1, 3, 0,
	0, 0, 4, 0,
	2, 0, 5, 0,
	0, 0, 6, 3,
	4, 7, 0, 0,
	0
];
var upgradeValue = [
	0.8, 0.5, 1.4, 0.15,
	1.35, 2.2, 1.3, 2.8,
	0.66, 2.5, 1.25, 10.0,
	0.5, 10, 1.25, 0.03,
	2, 23.5, 1.22, 0.66,
	0.06, 0.06, 1.21, 1.9,
	1.8, 1.2, 2.1, 5000,
	3
];
var upgradeDesc = [
	/*"clicking Bidoofs gives 0.8 more eggs", "love drops 2 times slower", "Mama Bidoofs make 1.4x eggs now", "random events happen 1,5 times more often", "all Factories make 5% more eggs",
		"your clicks give 0.04 of EPS more.", "your Factories make 6% more EPS now.",*/
];
//var upgradePrice = [50, 100, 1500, 4000, 5500, 15000];
var upgradeHTML = [ /*"Papa Bidoof","'DoofDaycare","Bidoof Events","Alpha Male Bidoof","Ancient Bidoof","Polish Bidoof"*/ ];
for (i = 0; i < 29; i++) {
	upgradeNames.push("upgrade" + i);
	upgradeCostNames.push("upgrade" + i + "Cost");
	upgradeHTML.push("upgrade " + i);
	if (upgradeType[i] == 0) {
		upgradeDesc.push("clicking Bidoofs gives " + upgradeValue[i] + " more eggs now");
	} else if (upgradeType[i] == 1) {
		upgradeDesc.push("love drops now " + upgradeValue[i] + "x as fast");
	} else if (upgradeType[i] == 2) {
		upgradeDesc.push("events happen now " + upgradeValue[i] + "x as fast as before");
	} else if (upgradeType[i] == 3) {
		upgradeDesc.push("all factories make " + upgradeValue[i] + " times more eggs");
	} else if (upgradeType[i] == 4) {
		upgradeDesc.push("clicking gives " + upgradeValue[i] + " more Exp Points");
	} else if (upgradeType[i] == 5) {
		upgradeDesc.push(buildingsHTML[upgradeSubType[i]] + " makes " + upgradeValue[i] + " times more eggs");
	} else if (upgradeType[i] == 6) {
		upgradeDesc.push("your dojo #" + (upgradeSubType[i] + 1) + " gives you " + upgradeValue[i] + " times more Exp Points");
	} else if (upgradeType[i] == 7) {
		upgradeDesc.push("clicking gives " + upgradeValue[i] + "x your current Exp Per Second");
	}
}


function upgradeTypeThings(number) {
	if (upgradeType[number] == 0) {
		clicks = clicks + upgradeValue[number];
		baseClicks = baseClicks + upgradeValue[number];
	} else if (upgradeType[number] == 1) {
		loveDrop = loveDrop * upgradeValue[number];
	} else if (upgradeType[number] == 2) {
		eventsChance = eventsChance * upgradeValue[number];
		randomTime = Math.round((Math.random() * (eventsChance - (eventsChance * 0.2))) + eventsChance * 0.2);
		timeranotherone = 0;
	} else if (upgradeType[number] == 3) {
		EPSModifier = EPSModifier + upgradeValue[number];
	} else if (upgradeType[number] == 4) {
		expPointGain += upgradeValue[number];
	} else if (upgradeType[number] == 5) {
		buildingsGain[upgradeSubType[number]] = buildingsGain[upgradeSubType[number]] * upgradeValue[number];
	} else if (upgradeType[number] == 6) {
		dojoGain[upgradeSubType[number]] = dojoGain[upgradeSubType[number]] * upgradeValue[number];
	} else if (upgradeType[number] == 7) {
		expVariable += upgradeValue[number];
	}
	upgradeCount++;
	updateEggs();
	updateEPS();
}

/*function buyUpgrade (number) {
   	if(eggs >= upgradePrice[number]) {
		eggs = eggs - upgradePrice[number];
		upgradeTypeThings(number);
		upgradeIsBought[number] = 1;
		document.getElementById(upgradeCostNames[number]).innerHTML = "DONE";
		document.getElementById(upgradeNames[number]).disabled = true;
	}
}*/
//Dojos
var totalDojos = 5;
var dojoPrice = [20, 500, 1999, 42000, 150000];
var dojoAmount = [0, 0, 0, 0, 0];
var dojoGain = [0.2, 1.5, 3, 35, 150];
var dojoNames = ["Punching bag", "Cardboard Zigzagoon", "Ekans Mecha", "Dire Mamoswine", "Distortion World Void Containers"];
var dojoDesc = ["No, Bidoofs don't punch this one. They chew it instead.", "Just Bidoofs rebel movement against the discrimination of Sinnoh.", "As harmless as the reports tend to indict.", "He's really pissed off. You ate his Dire Straits album.", "Not sure eating them is a good idea but whatever."];
var dojoHTML = ["pbag", "czig", "emeh", "dmam", "dwvc"];
var currentExpGain = 0;

function buyDojos(order) {
	if (eggs >= dojoPrice[order]) {
		dojoAmount[order] += 1;
		eggs = Math.round(eggs - dojoPrice[order]);
		dojoPrice[order] = Math.floor(dojoPrice[order] * 1.3);

		document.getElementById(dojoHTML[order]).innerHTML = dojoAmount[order].toString();
		document.getElementById(dojoHTML[order] + "Price").innerHTML = dojoPrice[order].toString();
		updateEggs();
		updateEPS();
		console.log(dojoAmount);
	}

}

//Achievements
var totalAchievements = 85;
var eggchivmentsUnlocked = [
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0
];
var eggchivmentsNames = [
	"Newbie Breeder",
	"Better than a newbie Breeder",
	"I really want a mama...",
	"Even neaty Breeder",
	"Hostile Fiend In Making",
	"Neat Breeder",
	"More than a neaty Breeder",
	"Teeth Sharpener",
	"Almost pretty dangerous",
	"Really kinda dangerous",
	"Wait, I didn't program it in...",
	"Ka-ching!",
	"Ka-five-chings!",
	"Ka-alotof-chings!",
	"KAEVERYTHINGISMINECHING",
	"...that's a lot of Mamas",
	"...wait, which Mama is real?",
	"...are you my real Mama?",
	"...so where are my Papas now?",
	"Just like the PopStar Bidoof",
	"And he was pretty popular",
	"He had like 20 fans",
	"Or 30 I don't remember",
	"Now everyone wants to be shiny",
	"THRILLER, THRILLER NIGHT",
	"THERE ARE ZOMBIES ON YOUR LAWN",
	"WE DON'T WANT ZOMBIES ON THE LAWN",
	"BRAINZZZZZZZZZ",
	"HFJHFDHSFLKSHFJKHFHJKLSKJF",
	"Kamina would be proud",
	"I'm sure Kamina wouldn't complain",
	"Okay maybe he would just a little",
	"They made the Drill Arm for Kid Icarus",
	"THEIR DRILLS ARE THE DRILLS THAT...",
	"Terrorists win",
	"Wait, wasn't 5 the team size limit?",
	"LET THE BODIES HIT THE FLOOR",
	"or burn before they even do",
	"Worse than a thermonuclear bomb",
	"hey thx i feel s0 smarty right now",
	"Phoenix Wright couldn't handle them",
	"To eat Old Gateau or not to eat?",
	"To breed or not to breed?",
	"To be or not to be?",
	"SOLYD WORK BY RUZZIAN ENGINEERZ",
	"TRUZT MEY I'M AN ENGYNEER",
	"KAAALYNKA KALYNKA BORSTCH MOYA",
	"NAS NE DOGONYAT PUTIN SENPAI",
	"-40 degrees patented vodka treatment",
	"Defying the laws of the physics",
	"A random black hole popped somewhere",
	"Bidoof scientists agree: we're doomed",
	"Blendtec agrees: it'll blend",
	"It's not a good idea to microwave this",
	"Future Rocky Bidoofoa",
	"Stress management level hard",
	"Number one boxer in the world",
	"Never skip the leg day kids...",
	"As weak as Paper Mario Sticker Star",
	"Looks tougher than actually is",
	"Bruce Lee would strike through them",
	"Don't let it fall on your head",
	"Even worse than AT-ATs honestly",
	"As strong as Kataphraktos...",
	"It takes one Gundam to beat them now",
	"TENGEN TOPPA GURREN LAGANN",
	"bohemian rhapsody",
	"another brick in the wall",
	"starway to heaven",
	"brothers in arms",
	"Lookin' for Gaster or something?",
	"Testers agree: tastes empty",
	"Where did I lose my breeding room?",
	"this name is null",
	"That's still a neaty breeder+",
	"Very neaty breeder...?",
	"Very VERY neaty breeder.",
	"Beginner in the Bidoofgarden",
	"How long can you play this game?",
	"wow ur patient",
	"How long can you stand it?",
	"Just a little longer...",
	"And a little longer longer...",
	"Wow, an hour already :O",
	"Aren't you bored already?"
];

var eggchivmentsValues = [
	10, 50, 1, 500, 5,
	2500, 50000, 25, 50, 80,
	101, 1, 5, 10, 29,
	10, 20, 30, 50, 1,
	10, 20, 30, 45, 1,
	10, 20, 30, 40, 1,
	10, 20, 30, 35, 1,
	10, 20, 25, 30, 1,
	10, 15, 20, 25, 1,
	5, 10, 15, 20, 1,
	3, 5, 10, 15, 1,
	10, 25, 50, 1, 10,
	20, 40, 1, 10, 20,
	30, 1, 10, 15, 25,
	1, 5, 10, 20, 222222,
	999999, 55555556, 60, 300, 600,
	1200, 1800, 2400, 3600, 5400
];
var eggchivmentsTypes = [
	0, 0, 1, 0, 2,
	0, 0, 2, 2, 2,
	2, 3, 3, 3, 3,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 4,
	4, 4, 4, 4, 4,
	4, 4, 4, 4, 4,
	4, 4, 4, 4, 4,
	4, 4, 4, 4, 0,
	0, 0, 5, 5, 5,
	5, 5, 5, 5, 5
];
var eggchivmentsSubTypes = [
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 1,
	1, 1, 1, 1, 2,
	2, 2, 2, 2, 3,
	3, 3, 3, 3, 4,
	4, 4, 4, 4, 5,
	5, 5, 5, 5, 6,
	6, 6, 6, 6, 7,
	7, 7, 7, 7, 0,
	0, 0, 0, 1, 1,
	1, 1, 2, 2, 2,
	2, 3, 3, 3, 3,
	4, 4, 4, 4, 0,
	0, 0, 0, 0, 0,
	0, 0, 0, 0, 0
];
var eggchivmentsTypesAmount = Math.max.apply(Math, eggchivmentsTypes) + 1;
var eggchivmentOrder = [];

var eggchivmentsTitles = ["You've made 10 eggs!",
	"You have made 50 eggs!",
	"You've bought 1 Mama Bidoof!",
	"You have made a whooping 500 eggs!",
	"You're Lv.5 now!",
	"You've produced 2500 eggs by now...",
	"You've already produced freaking 50000 eggs!",
	"You're Lv.25!",
	"You've went up to Lv.50!",
	"You're Lv.80 now...",
	"You're... over Lv.100 now...?!",
	"You've got one upgrade!",
	"You've got 5 upgrades now!",
	"You've unlocked 10 upgrades!",
	"You've unlocked every single upgrade!",
];


var eggchivmentsSubNames = ["Make 10 eggs.",
	"Make 50 eggs.",
	"Buy 1 Mama Bidoof",
	"Make 500 eggs.",
	"Get to the level 5",
	"Produce 2500 eggs.",
	"Produce 50000 eggs.",
	"Get to the level 25",
	"Get to the level 50",
	"Get to the level 80",
	"Break the game by going to level 101...",
	"Get 1 upgrade",
	"Get 5 upgrades",
	"Unlock 10 upgrades",
	"Unlock all upgrades"
];

for (i = 0; i < 39; i++) {
	eggchivmentsTitles[i + 15] = "You've bought " + eggchivmentsValues[i + 15] + " " + buildingsHTML[eggchivmentsSubTypes[i + 15]] + "!";
	eggchivmentsSubNames[i + 15] = "Buy " + eggchivmentsValues[i + 15] + " " + buildingsHTML[eggchivmentsSubTypes[i + 15]];
}
for (i = 0; i < 20; i++) {
	eggchivmentsTitles[i + 54] = "You've bought " + eggchivmentsValues[i + 54] + " " + dojoNames[eggchivmentsSubTypes[i + 54]] + "!";
	eggchivmentsSubNames[i + 54] = "Buy " + eggchivmentsValues[i + 54] + " " + dojoNames[eggchivmentsSubTypes[i + 54]];
}
for (i = 0; i < 3; i++) {
	eggchivmentsTitles[i + 74] = "You've produced " + eggchivmentsValues[i + 74] + " eggs now!";
	eggchivmentsSubNames[i + 74] = "Produce " + eggchivmentsValues[i + 74] + " eggs";
}
for (i = 0; i < 8; i++) {
	eggchivmentsTitles[i + 77] = "You've played for " + eggchivmentsValues[i + 77] + " seconds!";
	eggchivmentsSubNames[i + 77] = "Play for " + eggchivmentsValues[i + 77] + " seconds";
}


function eggchivmentalTypes(call) {
	if (eggchivmentsTypes[call] == 0) {
		return totalEggs;
	} else if (eggchivmentsTypes[call] == 1) {
		return buildingsAmount[eggchivmentsSubTypes[call]];
	} else if (eggchivmentsTypes[call] == 2) {
		return level;
	} else if (eggchivmentsTypes[call] == 3) {
		return upgradeCount;
	} else if (eggchivmentsTypes[call] == 4) {
		return dojoAmount[eggchivmentsSubTypes[call]];
	} else if (eggchivmentsTypes[call] == 5) {
		return seconds / 10;
	}
}

function achievementChecker() {
	for (i = 0; i < totalAchievements; i++) {
		if (eggchivmentalTypes(i) >= eggchivmentsValues[i] && eggchivmentsUnlocked[i] == 0) {
			unlockAchievement(i, eggchivmentsNames[i]);
		}
	}
}

function unlockAchievement(number, text) {
	printPopup("Achievement unlocked! " + text);
	eggchivmentsUnlocked[number] = 1;
	if (loaded == 1) {
		console.log(totalEggs + " " + eggchivmentsUnlocked[0] + " " + isPopupOn);
	}
	updateEPS();
	loadAchives();
}

function achievementsAmount() {
	achievementsUnlocked = 0;
	for (i = 0; i < totalAchievements; i++) {
		if (eggchivmentsUnlocked[i] == 1) {
			achievementsUnlocked++;
		}
	}
}

function loadAchives() {
	var loadAllAchievements = "";
	eggchivmentOrder = [];
	for (j = 0; j < eggchivmentsTypesAmount; j++) {
		for (i = 0; i < totalAchievements; i++) {
			if (eggchivmentsTypes[i] == j) {
				if (eggchivmentsUnlocked[i] == 0) {
					loadAllAchievements += '<button name="achievement" class="stillOngoing" id="achievement" type="reset" disabled style="background-size: 0px">' + /*<progress id="exp" class="achievementBar" value="0" max="' + eggchivmentsValues[i] + '"></progress> + */ '<div class="achievementdetails"><span id="subtitles">' + eggchivmentsNames[i] + '</span></br>' + eggchivmentsSubNames[i] + '</div><div id="achievementamount"><img style="width:40px; height:auto" class="achievementamount" id="achievement' + i + '" src="Bidoof100pxblack.png" align="right"></div></button></br>'
					eggchivmentOrder.push(i);
				} else {
					loadAllAchievements += '<button name="achievement" class="abc" id="achievement" type="reset" disabled style="background-size: 500px"><div class="achievementdetails"><span id="subtitles">' + eggchivmentsNames[i] + '</span><br/>' + eggchivmentsTitles[i] + '</div><div id="achievementamount"><img style="width:40px; height:40px" class="achievementamount" id="achievement' + i + '" src="Bidoof100px.png" align="right"></div></button></br>'
				}
			}
		}
	}
	document.getElementById("achievements").innerHTML = loadAllAchievements;
	refreshAchives();
}

function refreshAchives() {
	var progressBarString;
	for (i = 0; i < eggchivmentOrder.length; i++) {
		progressBarString = (eggchivmentalTypes(eggchivmentOrder[i]) / eggchivmentsValues[eggchivmentOrder[i]]) * 500 + "px 100px";
		x = document.getElementsByClassName("stillOngoing");
		x[i].style.backgroundSize = progressBarString;
	}
}
//Call popup
var pseudoFIFO = [];

function printPopup(string) {
	pseudoFIFO.push(string);
}

//Battles
//Oh damn. About time :S
//this tutorial about canvas sucks but whatever
//let's start with menu tho
function drawBattleMenu() {
	var loadBattleMenu = "";
	loadBattleMenu += '<span id="battleinfobar">' + battleHints(Math.round(Math.random() * 4)) + '</span></br>';
	for (i = 0; i < 7; i++) {
		for (j = 0; j < 4; j++) {
			loadBattleMenu += "<span title='Upgrade: ";
			if (spareFlag[i * 4 + j] == 1) {
				loadBattleMenu += upgradeDesc[i * 4 + j];
			} else {
				loadBattleMenu += "???";
			}
			loadBattleMenu += "' class='tooltipbattle'><button id='battlemenubutton' onclick=drawCanvas(" + (i * 4 + j) + ");";
			if (j == 3 && ((spareFlag[i * 4] == 0 && killTracker[i * 4] == 0) || (spareFlag[i * 4 + 1] == 0 && killTracker[i * 4 + 1] == 0) || (spareFlag[i * 4 + 2] == 0 && killTracker[i * 4 + 2] == 0))) {
				loadBattleMenu += " disabled ";
			}
			loadBattleMenu += " style='outline:0;";
			if (j == 3) {
				loadBattleMenu += "max-width:200px;";
			}
			if (spareFlag[i * 4 + j] == 1 && killTracker[i * 4 + j] > 1) {
				loadBattleMenu += "background-image: url(battleSprites/" + (i * 4 + j) + ".png);background-color: #8F8123;'><div id='cost' style='display: none;'>" + battlePrices[i * 4 + j] + "</div><div id='enemiesNames' style='display: inline;'>" + enemiesNames[i * 4 + j] + "</div></button>";
			} else if (spareFlag[i * 4 + j] == 1) {
				loadBattleMenu += "background-image: url(battleSprites/" + (i * 4 + j) + ".png);background-color: #14600E;'><div id='cost' style='display: none;'>" + battlePrices[i * 4 + j] + "</div><div id='enemiesNames' style='display: inline;'>" + enemiesNames[i * 4 + j] + "</div></button>";
			} else if (killTracker[i * 4 + j] > 0) {
				loadBattleMenu += "background-image: url(battleSprites/" + (i * 4 + j) + ".png);background-color: #A00A0C;'><div id='cost' style='display: none;'>" + battlePrices[i * 4 + j] + "</div><div id='enemiesNames' style='display: inline;'>" + enemiesNames[i * 4 + j] + "</div></button>";
			} else if (spareFlag[i * 4 + j] == 0 && killTracker[i * 4 + j] == 0) {
				loadBattleMenu += "background-image: url(battleSprites/" + 30 + ".png);'><div id='cost' style='display: none;'>" + battlePrices[i * 4 + j] + "</div><div id='enemiesNames' style='display: inline;'>" + enemiesNames[30] + "</div></button>";
			}
			loadBattleMenu += "</span>"
		}
		/*if (killTracker[i*4+3]>0) {
		    loadBattleMenu += "background-color: #800A0C;";
		} if (spareFlag[i*4+3]==1) {
		    loadBattleMenu += "background-color: #34800E;";
		}*/
		loadBattleMenu += /*"'><div id='cost' style='display: none;'>" + battlePrices[i*4+3] + "</div><div id='enemiesNames' style='display: inline;'>" + enemiesNames[i*4+3] + "</div></button>*/ "</br>";
		if (killTracker[i * 4 + 3] == 0 && spareFlag[i * 4 + 3] == 0) {
			break;
		}
	}
	if (spareFlag[27] != 0 || killTracker[27] != 0) {
		loadBattleMenu += "<button id='battlemenubutton' onclick=drawCanvas(" + 28 + ");  style=' text-shadow: 1px 1px 0 #440000, -1px -1px 0 #440000,1px -1px 0 #440000, -1px 1px 0 #440000,1px 1px 0 #440000; color: #FF0000; max-width: 500px; background-position: center bottom 60px; height: 430px; padding-top: 370px; font-size: 35px; background-size: 380px 350px; max-height: 430px; background-image: url(battleSprites/" + 28 + ".png); outline:0;";
		if (killTracker[28] != 1 && spareFlag[28] != 1) {
			loadBattleMenu += "background-color: #000;";
		}
		if (killTracker[28] > 0) {
			loadBattleMenu += "background-color: #400506;";
		}
		if (spareFlag[28] == 1) {
			loadBattleMenu += "background-color: #1b3808;";
		}
		loadBattleMenu += "'><div id='cost' style='display: none;'>" + battlePrices[28] + "</div><div id='enemiesNames' style='display: inline;'>" + enemiesNames[28] + "</div></button><br>";
	}
	document.getElementById("battleMenu").innerHTML = loadBattleMenu;
}

function battleHints(hintID) {
	if (hintID == 0) {
		return "Defeat 3 enemies to face the boss";
	} else if (hintID == 1) {
		return "Defeat boss of the batch to unlock a new one";
	} else if (hintID == 2) {
		return "Kill to get Exp, spare to get upgrades!";
	} else if (hintID == 3) {
		return "If you die, level up and keep trying!";
	} else if (hintID == 4) {
		return "Always stay determined.";
	}
}
//here's the real deal
var enemiesMaxHP = [
	10, 18, 18, 30,
	31, 38, 50, 80,
	75, 100, 105, 120,
	120, 170, 150, 180,
	180, 190, 220, 250,
	250, 280, 290, 320,
	320, 280, 450, 400,
	600
];
var enemiesAttackVal = [
	4, 11, 18, 50,
	26, 35, 60, 55,
	50, 0, 62, 65,
	70, 100, 80, 25,
	110, 120, 120, 80,
	130, 150, 140, 160,
	180, 15, 250, 200,
	16
];
var enemiesAttackFramesVal = [
	18, 15, 12, 31,
	16, 15, 26, 23,
	18, 10, 18, 16,
	18, 34, 19, 5,
	19, 20, 18, 14,
	18, 19, 18, 20,
	19, 1, 20, 15,
	1
];
var enemiesAttackNames = ["BUG BITE", "GUST", "DOUBLE SLAP", "WATER GUN",
	"MUD SHOT", "BITE", "SLAM", "ICE PUNCH",
	"RAZOR LEAF", "SPLASH", "DISCHARGE", "DRAGON BREATH",
	"EARTH POWER", "GIGA IMPACT", "FLASH CANNON", "LICK",
	"DRAGON PULSE", "EARTHQUAKE", "FLAMETHROWER", "AURORA BEAM",
	"SEED FLARE", "OUTRAGE", "LAND'S WRATH", "PSYSTRIKE",
	"FREEZE SHOCK", "QUICK ATTACK", "JUDGEMENT", "HYDRO PUMP",
	"TACKLE"
];
var baseEXP = [
	200, 800, 1500, 3800,
	4800, 5300, 7000, 13000,
	23000, 43000, 60000, 80000,
	100000, 170000, 350000, 600000,
	900000, 1100000, 1600000, 4000000,
	5000000, 6000000, 8000000, 1200000,
	2000000, 2500000, 3030100, 5000000,
	10000000
];
var killTracker = [
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0
];
var spareFlag = [
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0
];
var battlePrices = [
	100, 200, 350, 600,
	500, 777, 1200, 2500,
	4000, 5000, 7000, 8500,
	9000, 10000, 12000, 13000,
	14000, 16000, 20000, 25000,
	28000, 50000, 80000, 100000,
	145000, 200000, 400000, 900000,
	6666666
]
var enemiesNames = [
	"Caterpie", "Pidove", "Rabbity", "Just a regular Mudkip",
	"Stunfisk", "Carnivine", "Quagsire", "Party dude Ludicolo",
	"Snover", "Annihilator", "EMOlga", "Your bestie Goodra",
	"Donphan", "Snorlax", "Magnezone", "Lickylicfdsjklhjhsal",
	"Noivern", "Flygon", "Chandelure", "The Legendary Suicune",
	"Ruthless", "Rayquaza", "Zygarde", "Fan Favourite Mewtwo",
	"Blkkyurem", "RATATATAT", "Arceus.", "Final Guardian Psyduck",
	"Y O U",
	"Gyardos", "???"
];

//asdfasdfasdfasdf

var welcomeTexts = [
	["munch munch", "oh, hey", "Heyyy! You're a friend of all Caterpies!", "Glad to see you pal!", "Are you really as bad as the others say?", "Oh. I've heard of you. Bad things.", "You didn't kill my friend... did you?", "LEAVE ME ALONE.", "die please", "WHY ARE YOU STILL DOING THIS?!"],
	["So what's on TV tonight at 8?", "To eat pizza or not to eat...", "Sup! Been a while!", "Came to watch The Bold And The Beautiful with me?", "You don't look THAT bad...", "Uh. Um.", "Wait... Is it you?", "OH SCREW MY LUCK TONIGHT", "I JUST WANNA WATCH TV", "i have to destroy you"],
	["hOOOIII!!!!!", ":3333", "iT'S yOOOUUUU <333", "yAAAAY!!!!!", "hOI!!!!!", "...hOI?", "...uMMMM...", "u r... eVIL!!!", "i nO lIKES U!!!!!", "You shouldn't have done that."],
	["Hey, you know me from TV, right? I'm a BOSS! :3", "Look, bosses can be adorable too: muuuuuud...KIP! :3", "ohOH you wanna hang out with me even more? :3", "I wrote a poem: bidoofmudkipz bffs forever! :3", "Uhm. So yeah, I'm a boss. Mud-kip!", "...you're not here to hang out with me, rignt?", "...you know, I have wife and children...", "AARRRRGHHHHHH MY INNER BEAST AWAKEN :3", ": >", "I WILL FLATTEN YOU"],
	["l00l, a b1d00f o_o", "0h w0w a b1d00f o_o", "0h 1t's my p4l b1d00f aga1n o_o", "s0 gl4d t0 s33 u pal o_o", "0h 1t's th1s guy b1d00f o_o", "b1d00f?! n00000 o_o", "fuk4 1t's h1m aga1n o_o", "FRYING PAN < DRYING PAN P L Z o_o", "AWWW I WANTED TO LIVE UNTIL TOMORROW o_o", "N O O_O"],
	["HEEEEEEEYYYY, mind if i taste you a bit?", "Sup, did anyone tell you that you look tasty?", "Oh, it's my most deliciousest pal!", "Hey delicious cutie!", "Mmmmm... They were right, he looks tasty...", "Is it that hyperactive morsel?", "Should I chew him before I talk to him...?", "MY TEETH ARE SHARPER THAN YOURS", "I'LL DEVOUR YOU BEFORE YOU SCREAM", "Let's get right to the part where I eat you."],
	["GLAD TO SEE YOU IN MY SHOP :)", "I HAVE SPECIAL BARGAINS JUST FOR YOU :)", "HEY, YOU'RE BACK! -30% OFF FOR MY PAL! :)", "HEEEYYY, WANT MORE OF MY SPECIAL GOODS? :)", "HELLO :)", "...WELCOME :)", "...WANNA BUY ANYTHING? :)", "Oh. Um. Hi?", "...this is getting ridiculous", "NOT SELLING ANYTHING TO YOU."],
	["EVERYBODY PUT YOUR HANDS UUUUPPP AMIGOS!", "PARTY LIKE IT'S GEN3 OVER AGAAAIN AMIGO!", "OOOH, GLAD TO SEE YOU AMIGO! LET'S SALSA AMIGO!", "A SPECIAL TUNE FOR AMIGO, DARUDE SANDSTORM!", "CAN YOU MOVE YOUR BOOTY AS GOOD AS I DO?", "OH STOP IT, GO DANCE WITH ME!", "COME ON, JOIN THE PARTY INSTEAD", "Amigo, what are you doing?", "Just tell that you can't dance amigo...", "Everyone but him..."],
	["weegee weegee", "it's kinda cold i think", "weegee weegee paaaaal!", "it's not cold when pal is here!", "c o l d", "asking you if you'll hug me is a bad idea, huh?", "i don't need help, i'm fine", "OH IT'S SO VERY COLD", "I'M NOT USED TO WEARING COATS", "I-IT'S S-S-SO F-F-FREAKING C-C-COLD"],
	["Hello, I'm a mythical luckbringer!", "Just LOOK at my amazing crown!", "Luck shall be cast upon you, my friend!", "Thanks for being the follower of my crown!", "Welcome to MY kingdom!", "Bow upon me!", "Show some proper respect to your ruler!", "Your disobedience will be remembered.", "I shall strike you down!", "I'LL KILL YOU OR DIE TRYING!"],
	["hi. i'm not as happy as i look like", "i don't know why am i even smiling", "hello? :awkward smile:", "...nice to see you...", "don't tell me you came to ruin my smile", "you've made one of my kind even more miserable", "sadsadsadsadsadsad", "stop trying already, it's worthless", "screw it all", "this feels like suicinding"],
	["A FRIEND! A FRIEND!", "COME LET ME HUG YOU", ":steals your breath away with his hugs:", "AWWWWWWWWW :3333", "WANNA BE A FRIEND?", "DON'T WORRY M8 I STILL ACCEPT SIGNUPS FOR FRIENDS", "NO TEARS ONLY HUGS NOW", "...no hugs?", "...please.", "MY ARMY OF FRIENDS WILL STOMP YOU DOWN"],
	["ACHOO!", "alright, a pokemon i don't know", "You should come here for dinners more often", "I have some berries if you want", "...oh. Well then.", "No hurting animals in this zoo.", "You won't be getting my peanuts.", "This is private property, get out.", "You didn't even buy the ticket...", "ALL FORCE AHEAD"],
	["(trying to get up)", "(no longer trying to get up)", "HEEEEEYYYYZZZzzzzz", "i like pokeflute music", "(trying hard to get up)", "(he's almost up by now)", "(one wrong move and he'll stand up...)", "(the ground shakes under his feet)", "(he uses his stomach to assist his standing up)", "ARRGGGHHHHHHH"],
	["I'm connected to a 2400V current.", "Did anyone tell I look shocking?", "This socket really likes you.", "I know a dance where you bind yourself with a cable.", "My jolts can be dangerous.", "Came to check if I lie?", "Don't worry, I have enough power to kill you.", "You're diszapping.", "Prepare to face the Thunderstorm!", "BECOME THE WITNESS OF MY ZAPS"],
	["LIIIIIIIIIIIIIIIIIIIIIIIIIIIICCCCCKKKK", "that was the longest lick of your life", "Came for some extra licks?", "(mad licking)", "LICKLICKLICK.", "Enough saliva? Check.", "(warms up his tongue)", "I'm gonna need a lot of licks for that.", "(they should've weakened him already before...)", "STARE AT MY TONGUE."],
	["Go back to route 201 or something", "You don't even come close to me", "I've heard you're nearly close to me!", "I won't hold back as much this time", "...can't be, I'm just imagining things.", "How is it possible they lost with this?", "Huh. So he was a wimp after all.", "Should I be scared? Can't be.", "I'm the signature of Kalos doggamit!", "I'LL TEAR YOU DOWN."],
	["Special Hoennish Forces to the rescue!", "I can always quake the earth if you're stuck", "Heyyyy, came to help on my job?", "We've got tons of Pokemons to rescue!", "Hey, did you trap some other Pokemons?", "You're not a nice scout.", "No cookies for you.", "Hey, what did you do to the other helpers?", "Sit over here and don't move", "FLYYYYYYYYY"],
	["...the sun is kinda creepy, don't you think?", "...it would be so cold and dark without me...", "...it's so boring without you...", "...i was getting cold here...", "...you look pretty cold.", "...are you asking to die...?", "...give it a break...", "...it's gonna end up pretty bad", "...do not come any closer.", "I'LL MEET YOU IN YOUR DREAMS."],
	["Who are you? What brings you here?", "What are you looking for over here?", "Why did you come again?", "What merit do you seek with me?", "What is your devillish grin for?", "Why did you do this?", "What did you think when you did this?", "Why do you think you're above consequences?", "Why do you hold on to your killing streak?", "WHY SHOULD I KEEP YOU ALIVE? :)"],
	["LOOK IN MY EYES, DO YOU SEE ANY MERCY IN THEM?!", "I WILL TURN YOUR FACE INTO A STICKER", "AWWW YOU DIDN'T HAVE TO", "YOU'RE SO CUTE MAN", "I WILL DEFEAT YOU NO MATTER HOW MAD YOU APPEAR", "CRUSHCRUSHCRUSH", "I'VE GOT NO TIME TO TALK WITH YOU.", "I FEEL SORRY FOR WHAT WILL HAPPEN TO YOU", "JUST WATCH AS I GO.", "DIRTY SHAYMIN KILLER."],
	["KYAAAAAAAAAAAAAAAAAAA", "KYAAAAAAAAHHHHHHHHHHH", "KYAAAAA- oh, it's you!", "KYAAAA- wait, did you buy some cotton candy for us?", "(it's this guy, right? okay.) KYAAAAAAAAA!", "aaaaAAAAHHHHKYAAAAAA", "K Y AAAAAAAAAAA", "kyAAAAAAAAA", "kyAAAAAAAAAHHHH", "excuse me, please die."],
	["Did you know that Zygardes don't snore with Zzzs?", "I went on a trip to Zzzambia once...", "Being with you is like total crazzzy awesome", "Zzzztunning to see you again today!", "I've heard storiezzz of you.", "I'm getting chilzzz", "Zzzhould I fear you?", "Someone should zzztop you...", "I'll zzzhut you down!", "FAZZZCINATING."],
	["ADMIRE ME LIKE EVERYONE DOES!", "DON'T I LOOK FABULOUS TODAY AGAIN?", "OH, MY FAN NUMBER ONE IS BACK!", "OOOHHH, EVEN CUTTING YOUR HAIR DOESN'T PUT YOU ON MY LEVEL!", "NO WAY IN HELL I'LL BE SCARED IN FRONT OF FANS", "I'M BETTER THAN THE PREVIOUS ONE", "CALL ME UNDEFEATABLE", "I'LL AVENGE THE OTHERS", "PSYCHOKINETIC POWERS!", "ON YOUR GUARD."],
	["ugh my back hurts so damn much", "how do i actually stand up without hurting back", "oh, please, help me to stand straight pal!", "ghghghghgh no dice, you've gotta help me", "(ignores you)", "just seeing you makes me hurt", "can i call for cops or something?", "you don't deserve my time.", "you're not even pseudolegendary!", "OH BOY."],
	["I'M IN MY TOP PERCENTAGE TODAY", "JOEY'S SPECIAL AID TO THE RESCUE", "COME JOIN JOEY, HE LOVES POKEMON LIKE YOU!", "I'M ACTUALLY LEVEL 257. WHAT. YOU DON'T BELIEVE ME?", "JOEY'S SPECIAL TACTIC ANNIHILATION FORCEEEE", "DON'T WORRY HE HAS A LOT OF RATTATAS", "HE WAS JUST A GEAR IN THE MACHINE", "I AM DETERMINED", "I KNOW I CAN DO IT", "PRAY FOR MERCY."],
	["This is the end.", "You can't beat me. Nobody can.", "Don't go thinking you're a god now.", "I have created you. And you have outbested me.", "Too bad this is where your killing spree ends.", "...alright", "...I won't let you do it again.", "...i shouldn't have created you", "all you bring is destruction", "..."],
	["What you have done... was impossible.", "Look at how far you've gone through.", "Do not hesitate.", "Who am I to hold you back again?", "I will protect Him until the end.", "Go slay the Final One.", "He's waiting for you.", "I know I'll lose", "I will reincarnate over and over again", "GO."],
	["HEH. HEH. HEH. HEH.", "I AM YOU. YOU CAN'T BEAT YOURSELF.", ":)", ":3", "YOU'RE JUST LIKE ME. A KILLER, NOTHING MORE.", "DO YOU LIKE SEEING MY FACE?", "YOUR SOUL LOOKS FAR WORSE THAN THIS", "I'LL ANNIHILATE YOU NOW.", "TRY TO HIT ME.", "A SATAN'S CHILD..."],
];

var inBattleTexts = [
	["Oh hey it hurts dude!", "Yeaaaah, let's keep training!", "NO KILL PLZ"],
	["OUCH, THAT'S ROUGH FOR AN ANSWER", "No no no, you won't get pizza before me!", "I HAVE TO WATCH TONIGHT'S EPISODE"],
	[":CCCCCCCCCC", ":))))))))", ":<<<<<<<<<<"],
	["Let's get to business then! :3", "Wanna test my strength again? :3", "SPECIAL MUDKIP POWERS OWNWARDS!"],
	["0h l0l th1s b1d00f hurts m3 o_o", "th1s pl4y 1s k1nd4 funny o_o", "b1g stunf1sk n0 cry o_o"],
	["Why so fast? I wanted to celebrate...", "You'll give me a bite, won't you?", "OMNOMNOMNOMNOMNOMNOM"],
	["REMEMBER NOT TO BREAK VASES :)", "HAVE AS MUCH FUN AS YOU WANT :)", "YOU'RE WORSE THAN THIS ZELDA GUY :)"],
	["UN DOS TRES QUATTRO", "ARRIBAAAA ARRIBAAAAA", "THE MUSIC IS STILL PLAYING!"],
	["(trembling with cold)", "(trembling with tackles)", "(trembling with fear)"],
	["I'll let you know that I'm a fine warrior!", "I'll give you permission just this once.", "I SWEAR WHEN I EVOLVE-..."],
	["and you give me another reason to cry. damn.", "i appreciate you trying to cheer me up.", "LEAVE ME ALONE ALREADY"],
	["NO KILLS COME HUG PLZ", "AWWWW YOU'RE MAKING ME BLUSH", "...I told you to stop."],
	["wait what's this funny feeling", "awww scratch my stomach please...", "You're going out of here right now."],
	["just waaaait for meeee...", "that's a nice rhythm you make...", "SNORLAX BLASTERS GO"],
	["And I'm gonna zap you!", "Want to get the details?", "Do your teeth conduct electricity well?"],
	["IMSUFFOKETING", "EVERYFINGFOHUPAL", "(licks faster than the lightspeed)"],
	["You do NOTHING to me!", "These attacks aren't even close to mine.", "Sucker."],
	["Hey, you're making my job harder!", "Come on, you know I'm a busy man.", "ARE YOU DISOBEYING MY ORDERS?!"],
	["...how do you even hurt me?", "...hang out with me...", "...hahahahAHAHAHAH!"],
	["Why do you hurt me?", "Why do you do this again?", "Why do you think you have any chance with me?"],
	["RAAAASENGAN or what was it", "THAT FEELS SO AWESOME", "I CAN BE TOUGH WHEN I WANT"],
	["AAAAAAAAAA*coughcough*", "i saw some candies yesterday", "AAAAAAAAAAAAAAAAAAAA"],
	["You zzzpin my head round", "Wanted to borrow zzzome sugar?", "Zzzhots fired."],
	["MY FANS! LOOK AT ME!", "LET'S SEE HOW FABULOUS YOU ARE TODAY", "TOPPLETOPPLETOPPLETOPPLE"],
	["i can strike you with my head lol", "nice try, but my back is the other way", "I'll pretend I ignore you."],
	["RATATATATTATATATTATA", "JOEY HAS A LOT OF RARE CANDIES", "FOR JOEEEEEEY!"],
	["You can't do this.", "This time I won't go easy on you.", "Godslayer..."],
	["I know it's impossible to stop you.", "Your determination is incredible", "Don't waste time on me."],
	["YOU FOUGHT WELL.", ":)", "WHAT MAKES YOU BETTER THAN ME?!"]
];

var bidoofDamage = level * level * 0.03;
var bidoofSprite = new Image();
var spriteOnFlag = 0;
bidoofSprite.src = 'battleSprites/bidoof.png';
var enemySprite = new Image();
var spriteWidth, spriteHeight;
spriteWidth = spriteHeight = 64;
var canvasPosY = 40;
var inBattleTextID, hostileFlag, welcomeTextID, battleID, currentName, enemyMaxHP, enemyCurrentHP, enemyAttackFramesValTimer, enemyAttackName, enemyAttackFramesValCurrent, enemyAttackVal, bidoofCurrentHP, canvasContext, canvas, spriteAttack, textOn, textAlpha, textX, textY, enemyAttackSpriteVariation, bidoofAttackSpriteVariation, bidoofMaxHP, defeatedFlag, fallVal, textAdvancement, currentDisplayedString, greetingFlag, currentStringID, resultFlag;

function drawCanvas(imageIndex) {
	if (eggs >= battlePrices[imageIndex]) {
		eggs -= battlePrices[imageIndex];
		canvas = document.getElementById('canvascanvas');
		canvasContext = canvas.getContext('2d');
		document.getElementById("battleMenu").style.display = 'none';
		document.getElementById("battleCanvas").style.display = 'inline-block';
		battleID = imageIndex;
		return drawPlayerActors(imageIndex);
	}
}

function drawPlayerActors(imageIndex) {
	bidoofDamage = level * 0.01;
	bidoofMaxHP = (level * 6.18) + 8;
	canvasContext.font = "10px battleFont";
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.mozImageSmoothingEnabled = false;
	canvasContext.webkitImageSmoothingEnabled = false;
	enemySprite.src = 'battleSprites/' + imageIndex + '.png';
	enemyCurrentHP = enemiesMaxHP[imageIndex];
	bidoofCurrentHP = bidoofMaxHP;
	enemyMaxHP = enemiesMaxHP[imageIndex];
	enemyAttackFramesValTimer = enemiesAttackFramesVal[imageIndex] * 1.5;
	enemyAttackVal = enemiesAttackVal[imageIndex];
	enemyAttackFramesValCurrent = Math.random() * enemyAttackFramesValTimer * 0.5;
	enemyAttackName = enemiesAttackNames[imageIndex];
	currentName = enemiesNames[imageIndex];
	spriteAttack = 0;
	textOn = 0;
	textAlpha = [
		[],
		[]
	];
	textX = [
		[],
		[]
	];
	textY = [
		[],
		[]
	];
	bidoofAttackSpriteVariation = 0;
	enemyAttackSpriteVariation = 0;
	defeatedFlag = 0;
	fallVal = [0, 0];
	textAdvancement = 0;
	currentDisplayedString = 0;
	greetingFlag = 1;
	currentStringID = 0;
	resultFlag = 0;
	spriteOnFlag = 1;
	hostileFlag = 0;
	inBattleTextID = 0;
	for (i = 0; i < imageIndex; i++) {
		if (imageIndex > 3 && i == 0) {
			i = imageIndex - 3;
		}
		if (killTracker[i] >= 3) {
			hostileFlag = 1;
		}
	}
	if (spareFlag[battleID] == 0 && killTracker[battleID] == 0 && hostileFlag == 0) {
		welcomeTextID = Math.round(Math.random());
	} else if (spareFlag[battleID] == 1 && killTracker[battleID] < 2) {
		welcomeTextID = Math.round(Math.random() + 2);
	} else if (killTracker[battleID] > 1 && killTracker[battleID] < 3) {
		welcomeTextID = Math.round(Math.random() + 7);
		enemyAttackVal = enemyAttackVal * 2;
	} else if (killTracker[battleID] >= 3) {
		welcomeTextID = 9;
		enemyAttackVal = enemyAttackVal * 3;
	} else if (killTracker[battleID] == 1) {
		welcomeTextID = Math.round(Math.random() + 5);
	} else if (hostileFlag == 1) {
		welcomeTextID = 4;
	}
	if (spareFlag[battleID] == 1 && killTracker[battleID] < 2) {
		inBattleTextID = 1;
	} else if (killTracker[battleID] >= 2) {
		inBattleTextID = 2;
	}
	document.getElementById('sfx').load();
	drawBidoof();
	document.getElementById('battleCry').src = "sfx/" + imageIndex + ".wav";
	document.getElementById('battleCry').play();
}

function drawBidoof() {
	if (spriteOnFlag == 1) {

		canvasContext.fillStyle = "white";
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		if (battleID == 28) {
			canvasContext.fillStyle = "rgba(190, 0, 0," + ((1 - (enemyCurrentHP / enemiesMaxHP[28])) * 0.5 + 0.5) + ")";
			canvasContext.fillRect(0, 0, 490, 240);
		} else if (battleID == 26) {
			canvasContext.fillStyle = "rgba(150, 150, 255, 0.4)";
			canvasContext.fillRect(0, 0, 490, 240);
		} else if (battleID == 27) {
			canvasContext.fillStyle = "rgba(120, 120, 255," + ((1 - (enemyCurrentHP / enemiesMaxHP[27])) * 0.5 + 0.3) + ")";
			canvasContext.fillRect(0, 0, 490, 240);
		}
		textAdvancement++;
		if (textOn == 0) {
			printTopBar("Mash any button ASAP!");
			if (welcomeTextID >= 7) {
				canvasContext.fillStyle = "red";
			}
			printBotBar(welcomeTexts[battleID][welcomeTextID]);
		} else if (enemyCurrentHP > 0 && bidoofCurrentHP > 0 /*&& haltFlag == 0*/ ) {
			printTopBar("TAKATAKATAKATAKATAKATAKATAKATAKATAKATAKATAKATAK");
		} else if (bidoofCurrentHP > 0 && enemyCurrentHP <= 0 && resultFlag == 0) {
			printTopBar("Victory!");
			defeatedFlag = 1;
		} else if (enemyCurrentHP > 0 && bidoofCurrentHP <= 0 && resultFlag == 0) {
			printTopBar("Defeated... Returning in " + Math.round(returnTimer / 10) + "...");
			defeatedFlag = 2;
			printBotBar("g3t r3kt m8 n00b l0l");
		} else if (resultFlag == 1) {
			printTopBar("You spared him! Returning in " + Math.round(returnTimer / 10) + "...");
			canvas.removeEventListener('mousedown', getMousePos, false);
			//printBotBar("Hey... pretty thanks dude!");
		} else if (resultFlag == 2) {
			canvasContext.fillStyle = "red";
			canvasContext.font = "23px battleFont";
			canvasContext.fillText("Y O U  M O N S T E R", 90, 35);
			canvasContext.font = "13px battleFont";
			canvas.removeEventListener('mousedown', getMousePos, false);
			printBotBar("Returning in " + Math.round(returnTimer / 10) + "...");
			canvasContext.fillStyle = "white";
		}
		if (textOn == 1) {
			enemyAttackFramesValCurrent += delay;
			if (greetingFlag == 1) {
				textAdvancement = 0;
				greetingFlag = 0;
			}
			if (defeatedFlag == 0) {
				/*if (textAdvancement * 2 > currentDisplayedString.length + 20 && currentStringID == 0) {
					loadAnotherString();
				}*/
				if (enemyAttackFramesValCurrent >= enemyAttackFramesValTimer) {
					enemyAttack();
				}
				if (inBattleTextID == 2) {
					canvasContext.fillStyle = "red";
				}
				canvasContext.fillText(currentDisplayedString.substring(0, textAdvancement * 2), 10, 225);
			}
		}
		if (spriteAttack == 0) {
			enemySpriteDraw();
			bidoofSpriteDraw();
		} else if (spriteAttack == 1) {
			bidoofAttackSpriteVariation = 200;
			enemyAttackSpriteVariation = 0;
			enemySpriteDraw();
			bidoofSpriteDraw();
		} else if (spriteAttack == 2) {
			bidoofAttackSpriteVariation = 0;
			enemyAttackSpriteVariation = 200;
			bidoofSpriteDraw();
			enemySpriteDraw();
		}
		drawHPBars(battleID);
		if (defeatedFlag == 1 && resultFlag == 0) {
			canvasContext.fillStyle = "white";
			canvasContext.strokeStyle = "black";
			canvasContext.fillRect(0, 190, 245, 50);
			canvasContext.fillRect(245, 190, 245, 50);
			canvasContext.strokeRect(0, 190, 245, 50);
			canvasContext.strokeRect(245, 190, 245, 50);
			canvasContext.font = "20px battleFont";
			canvasContext.fillStyle = "black";
			canvasContext.fillText("HAVE MERCY", 45, 225);
			canvasContext.fillStyle = "red";
			canvasContext.fillText("KILL", 340, 225);
			canvas.addEventListener('mousedown', getMousePos, false);
		}
		if (returnTimer == 1) {
			if (resultFlag == 1 && upgradeIsBought[battleID] == 0) {
				spareFlag[battleID] = 1;
				printPopup("Thanks to sparing " + currentName + ", " + upgradeDesc[battleID]);
				upgradeTypeThings(battleID);
				upgradeIsBought[battleID] = 1;

				/*document.getElementById(upgradeCostNames[0]).innerHTML = "DONE";
				 document.getElementById(upgradeNames[0]).disabled = true;*/
			} else if (resultFlag == 2) {
				printPopup("You get " + Math.round((baseEXP[battleID] / (level - 1)) * 10) / 10 + " Exp Points for killing " + currentName + "!");
				killTracker[battleID]++;
				expPoints += (baseEXP[battleID] / (level - 1));
			}
			toggleBattles();
			returnTimer = 30;

			spriteOnFlag = 0;
		}
	}

}

function drawHPBars() {
	canvasContext.fillStyle = "red";
	canvasContext.fillRect(70, 160, 100, 10);
	if (battleID == 26 || battleID == 28) {
		canvasContext.fillRect(canvas.width - 100 - 100, 160, 160, 10);
	} else {
		canvasContext.fillRect(canvas.width - 70 - 100, 160, 100, 10);
	}
	canvasContext.fillStyle = "green";
	if (bidoofCurrentHP > 0) {
		canvasContext.fillRect(70, 160, 100 * (bidoofCurrentHP / bidoofMaxHP), 10);
	}
	if (enemyCurrentHP > 0) {
		if (battleID == 26 || battleID == 28) {
			canvasContext.fillRect(canvas.width - 100 - 100, 160, 160 * (enemyCurrentHP / enemyMaxHP), 10);
		} else {
			canvasContext.fillRect(canvas.width - 70 - 100, 160, 100 * (enemyCurrentHP / enemyMaxHP), 10);
		}
	}
}

function printTopBar(hi) {
	canvasContext.font = "13px battleFont";
	canvasContext.fillStyle = "white";
	canvasContext.fillText(hi, 10, 25);
}

function printBotBar(hi) {
	canvasContext.font = "13px battleFont";
	canvasContext.fillText(hi.substring(0, textAdvancement * 2), 10, 225);
}

function bidoofSpriteDraw() {
	canvasContext.drawImage(bidoofSprite,
		160 - bidoofSprite.width * 2 + bidoofAttackSpriteVariation,
		canvasPosY + 105 - bidoofSprite.height * 2 + fallVal[1],
		bidoofSprite.width * 2,
		bidoofSprite.height * 2
	);
	bidoofAttackSpriteVariation = 0;
	spriteAttack = 0;
}

function enemySpriteDraw() {
	if (battleID == 28) {
		canvasContext.drawImage(enemySprite,
			canvas.width - enemySprite.width * 4 - (64 - enemySprite.width) - 50 - enemyAttackSpriteVariation,
			canvasPosY + 105 - enemySprite.height * 4 + fallVal[0],
			enemySprite.width * 5,
			enemySprite.height * 5
		);

	} else if (battleID == 27) {
		canvasContext.drawImage(enemySprite,
			canvas.width - enemySprite.width * 2.5 - (64 - enemySprite.width) - 50 - enemyAttackSpriteVariation,
			canvasPosY + 105 - enemySprite.height * 3 + fallVal[0],
			enemySprite.width * 3,
			enemySprite.height * 3
		);
	} else if (battleID == 9) {
		if (enemyCurrentHP / enemiesMaxHP[9] < 0.3) {
			enemySprite.src = 'battleSprites/29.png';
			enemyAttackVal = 70;
			enemyAttackName = "DRAGON RAGE";
		}
		canvasContext.drawImage(enemySprite,
			canvas.width - enemySprite.width * 2 - (64 - enemySprite.width) - 50 - enemyAttackSpriteVariation,
			canvasPosY + 105 - enemySprite.height * 2 + fallVal[0],
			enemySprite.width * 2,
			enemySprite.height * 2
		);
	} else {
		canvasContext.drawImage(enemySprite,
			canvas.width - enemySprite.width * 2 - (64 - enemySprite.width) - 50 - enemyAttackSpriteVariation,
			canvasPosY + 105 - enemySprite.height * 2 + fallVal[0],
			enemySprite.width * 2,
			enemySprite.height * 2
		);
	}
	enemyAttackSpriteVariation = 0;
}

function getMousePos(event) {
	var coordsx, coordsy;
	if (event.x != undefined && event.y != undefined) {
		coordsx = event.offsetX;
		coordsy = event.offsetY;
	} else {
		coordsx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		coordsy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		coordsx -= canvas.offsetLeft;
		coordsy -= canvas.offsetTop;
	}

	console.log(coordsx + "." + coordsy);
	if (coordsx > 6 && coordsx < 251 && coordsy > 195 && coordsy < 246) {
		resultFlag = 1;
	} else if (coordsx > 251 && coordsx < 500 && coordsy > 195 && coordsy < 246) {
		resultFlag = 2;
	}
}

//Oh fuck I wrote so much code already lol @_@

function enemyAttack() {
	bidoofCurrentHP -= enemyAttackVal;
	enemyAttackFramesValCurrent = Math.random() * enemyAttackFramesValTimer * 0.5;
	textX[1].push(Math.random() * 490);
	textY[1].push(50 + Math.random() * 140);
	textAlpha[1].push(0.5);
	spriteAttack = 2;
}

function attackText() {
	for (j = 0; j < 2; j++) {
		for (i = 0; i < textAlpha[j].length; i++) {
			if (j == 0) {
				canvasContext.font = "10px battleFont";
				canvasContext.fillStyle = "rgba(255, 255, 255," + textAlpha[j][i] + ")";
				if (enemyCurrentHP > 0) {
					canvasContext.fillText("TACKLE", textX[j][i], textY[j][i]);
				} else {
					canvasContext.fillText("DEFEATED", textX[j][i], textY[j][i]);
					bidoofAttackSpriteVariation = 0;
				}
			} else if (j == 1) {
				canvasContext.font = "25px battleFont";
				canvasContext.fillStyle = "rgba(255, 0, 0," + textAlpha[j][i] + ")";
				canvasContext.fillText(enemyAttackName, textX[1][i], textY[1][i]);
			}
			textAlpha[j][i] -= 0.05;
			if (textAlpha[j][i] <= 0) {
				textAlpha[j].shift();
				textX[j].shift();
				textY[j].shift();
				i--;
			}
		}
	}
}


/*function loadAnotherString() {
	currentStringID=1;
	currentDisplayedString = "you little bitch?"
	textAdvancement = 0;
}*/


var timercount = 0;
var randomTime = Math.round((Math.random() * eventsChance * 0.8) + eventsChance * 0.2);
var displayed = 0;
var timeranotherone = 0;
var seconds = 0;
var boostTimer = 0;
var bidoofAppearsTimer = 0;
var popupTimer = 0;
var loveMessageTimer = 0;
var loveMessageRandom = 0;
var loveCooldown = 0;
var spriteAnimationFrame = 0;
var returnTimer = 30;
//refresher
var timer = setTimeout(function () {
	loveMessageRandom = Math.round(Math.random() * 100)
	loveCooldown++;
	if (loveMessageRandom == 42 && loveCooldown > 100) {
		loveMessageFlag = 1;
	}
	timer = new Date().getTime();
	delay = Math.round((timer - oldTimer) / 100);
	oldTimer = timer;
	seconds += delay;
	timer = setTimeout(arguments.callee, 100);
	eggs = Math.round((eggs + (eggsPerSecond / 10) * delay) * 100) / 100;
	expPoints = Math.round((expPoints + currentExpGain / 10) * 100) / 100;

	//console.log(randomTime + " " + timeranotherone);
	if (loaded == 1 && displayed == 0) {
		document.getElementById('isLoved').innerHTML = "Save loaded!";
		displayed = 1;
	}
	if (loveMessageFlag == 1) {
		loveMessageTimer += delay;
	}
	if (loveMessageTimer >= 50) {
		loveMessageFlag = 0;
		loveMessageTimer = 0;
		loveCooldown = 0;
	}

	if (timercount >= 50) {
		document.getElementById('isLoved').innerHTML = "";
	}

	if (timeranotherone >= randomTime && (love * eventsChance / 100) >= randomTime) {
		event();
		randomTime = Math.round(Math.random() * eventsChance);
		timeranotherone = 0;
	} else if (timeranotherone >= randomTime && ((love * eventsChance) / 100) < randomTime) {
		unluckyEvent();
		randomTime = Math.round(Math.random() * eventsChance);
		timeranotherone = 0;
	} else {
		timeranotherone += delay;
		timercount += delay;
		document.getElementById("savetiem").innerHTML = Math.round(timercount / 10).toString();
	}

	if (timercount >= 600) {
		saveGame();
	}
	if (boosteffect >= 1) {
		boostTimer += delay;
	}
	if (boostTimer >= 300) {
		boostTimer = 0;
		boosteffect = 0;
		buff = 1;
	}
	if (bidoofAppears == 1) {
		bidoofAppearsTimer++;
		var bidoofAppearsOpacity = 0.4 - (4 * bidoofAppearsTimer / 100) * delay;
		document.getElementById("clickingEggs").style.opacity = bidoofAppearsOpacity;
	}
	if (bidoofAppearsTimer >= 10) {
		bidoofAppears = 0;
		bidoofAppearsTimer = 0;
		document.getElementById("clickingEggs").style.opacity = 0;
	}
	if (pseudoFIFO.length > 0 && isPopupOn == 0) {
		document.getElementById("popupwindow").innerHTML = pseudoFIFO[0];
		document.getElementById("popupwindow").style.opacity = 1;
		isPopupOn = 1;
		popupTimer = 0;
		pseudoFIFO.shift();
	}
	if (isPopupOn == 1) {
		popupTimer += delay;
		document.getElementById("popupwindow").style.opacity = 1.0 - (0.05 * popupTimer);
	}
	if (popupTimer >= 20) {
		isPopupOn = 0;
		popupTimer = 0;
		document.getElementById("popupwindow").style.opacity = 0;
	}
	if (toggledAchives == 1) {
		refreshAchives();
	}

	totalEggs = Math.round((totalEggs + eggsPerSecond / 10 * delay) * 100) / 100;
	love = Math.round((love - loveDrop * delay) * 1000) / 1000;
	if (loaded == 1) {
		updateEggs();
	}

	if (spriteOnFlag == 1) {
		if (defeatedFlag == 0) {
			if (spriteAnimationFrame == 0) {
				canvasPosY = canvasPosY + 10;
			}
			if (spriteAnimationFrame == 4) {
				canvasPosY = canvasPosY - 10;
				spriteAnimationFrame = -1;
			}
			spriteAnimationFrame++;

		}
		drawBidoof();
		if (textOn == 1) {
			attackText();
		}
		window.onkeyup = function () {
			if (defeatedFlag == 0) {
				spriteAttack = 1;
				if (textOn == 0) {
					textOn = 1;
					currentDisplayedString = inBattleTexts[battleID][inBattleTextID];
					//"What the fuck did you just fucking say about me,";
				}
				textX[0].push(Math.random() * 490);
				textY[0].push(50 + Math.random() * 140);
				textAlpha[0].push(0.5);
				enemyCurrentHP -= bidoofDamage;
				document.getElementById('sfx').play();
			}

		}
		if (defeatedFlag == 1 && textX[0].length == 0 && resultFlag == 2) {
			fallVal[0] += 50;
		}
		if (defeatedFlag == 2 && textX[1].length == 0) {
			fallVal[1] += 50;
		}
		if (resultFlag != 0 || defeatedFlag == 2) {
			returnTimer--;
		}
	}

	//console.log(buff);
	document.title = eggs.toString();
}, 100);