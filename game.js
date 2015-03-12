var eggs = 0;
var breedsClicks = 0;
var eggsPerSecond = 0;
var clicks = 1;
var tiem = 1;
var totalEggs = 0;
var love = 100;
var lovedrop = 0.01;
var upgradeCount = 0;
var faithfulEncounter = 0;
var savestring = "null";
var loaded = 0;
var eventCount = 0;
var eventsChance = 5000;
var totalBuildings = 8;
var totalUpgrades = 6;
var epsmodifier = 1;
var clickBoost = 0;
var baseClicks = 1;
var isPopupOn = 0;
var achievementsUnlocked = 0;
var popup = document.getElementById("popupwindow");
var timer = new Date().getTime();
var oldTimer = new Date().getTime();
var delay;
//BigClick
function updateEPS() {
	eggsPerSecond=0;	
	for (i=0; i < totalBuildings; i++) {
		eggsPerSecond = Math.round(((eggsPerSecond+(buildingsAmount[i]*buildingsGain[i])))*100)/100;
		document.getElementById(buildingsNames[i]).innerHTML = buildingsAmount[i];
		document.getElementById(buildingsCostNames[i]).innerHTML = buildingsPrice[i];
	}
	eggsPerSecond*=epsmodifier * buff;
	document.getElementById('eggsPerSecond').innerHTML = parseFloat(Math.round(eggsPerSecond*100)/100).toFixed(2);
	achievementsAmount();
	clicks = baseClicks + eggsPerSecond*clickBoost;
	document.getElementById("clicksAmountes").innerHTML = parseFloat(Math.round(clicks*100)/100).toFixed(2);
	document.getElementById("upgradeCount").innerHTML = upgradeCount;
}

function updateEggs(){
	document.getElementById('bidoofs').innerHTML = parseFloat(Math.round(eggs*10)/10).toFixed(1);
	love = Math.round(love*1000)/1000;

	checkLove();
	sumBuildings();
	niceTexts();
	achievementChecker();
	
	document.getElementById("love").innerHTML = parseFloat(Math.round(love*100)/100).toFixed(1);
	document.getElementById("totaleggs").innerHTML = parseFloat(Math.round(totalEggs*10)/10).toFixed(1);
   	document.getElementById("gametime").innerHTML = parseFloat(Math.round(seconds/10)).toFixed(0);
	document.getElementById("totalBuildings").innerHTML = buildingsTotal;
	document.getElementById("eventCount").innerHTML = eventCount;
	document.getElementById("achives").innerHTML = achievementsUnlocked;

}

function niceTexts() {
	if (totalEggs<6) {document.getElementById("thingsThatHappen").innerHTML = "Bidoofs are staring at you with dumb look on their faces...";}
	if (totalEggs>=6) {document.getElementById("thingsThatHappen").innerHTML = "Bidoofs have overtaken your whole party...";}
	if (totalEggs>=30) {document.getElementById("thingsThatHappen").innerHTML = "Bill called you, there's not enough space to store Bidoofs...";}
	if (totalEggs>=1000) {document.getElementById("thingsThatHappen").innerHTML = "You get the feeling that too many eyes are staring at you...";}
	if (totalEggs>=10000) {document.getElementById("thingsThatHappen").innerHTML = "You got 10000 emails with the same Bidoof photo attached...";}
	if (totalEggs>=100000) {document.getElementById("thingsThatHappen").innerHTML = "One of the Bidoofs won the national election...";}
	if (totalEggs>=1000000) {document.getElementById("thingsThatHappen").innerHTML = "Grandma Bidoof just started her own cereal brand...";}
	if (totalEggs>=10000000) {document.getElementById("thingsThatHappen").innerHTML = "Bidoof political party split, riots start in capital...";}
	if (boosteffect==1) {document.getElementById("thingsThatHappen").innerHTML = "AAAA BIDOOFBOOST AAA EGGS";}
	//console.log(totalEggs);
}

function saveGame(){
	savestring = eggs.toString() + "|"
	+ love + "|" 
	+ seconds + "|" 
	+ breedsClicks + "|" 
	+ totalEggs + "|"  
	+ eventCount + "|"
	+ buff + "|"
	+ boosteffect + "|"
	+ boostTimer + "|";
	for (i=0; i<totalBuildings; i++) {
		savestring+=buildingsPrice[i] + "|" + buildingsAmount[i] + "|";
	}
	for (j=0; j<totalUpgrades; j++) {
		savestring += upgradeIsBought[j] + "|";
	}
	for (k=0; k<totalAchievements; k++) {
		savestring += eggchivmentsUnlocked[k] + "|";
	}
	console.log(savestring);
	addCookie("savefile", savestring, 365);
	document.getElementById('isLoved').innerHTML = "Game Saved!";
	timercount=0;
}

function addCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires;
}
	
function getCookie() {
	var loadedsave = document.cookie;
	var s=loadedsave.length;
	toggleEggs();
	console.log(loadedsave);
	if (s!=0) {
		loadedsave=loadedsave.substring(9,s);
		console.log(loadedsave);
		document.getElementById('isLoved').innerHTML = "Save loaded!";
		
		var arrayofvalues = loadedsave.split("|");
		//document.getElementById('thingsThatHappen').innerHTML = arrayofvalues;

		eggs=parseInt(arrayofvalues[0]);
		love=arrayofvalues[1];
		seconds=arrayofvalues[2];
		breedsClicks=arrayofvalues[3];
		totalEggs=parseInt(arrayofvalues[4]);
		eventCount=arrayofvalues[5];
		buff=arrayofvalues[6];
		boosteffect=arrayofvalues[7];
		boostTimer=arrayofvalues[8];

		for (i=0; i<totalBuildings; i++) {
			buildingsPrice[i] = parseInt(arrayofvalues[9+i*2]);
			buildingsAmount[i] = parseInt(arrayofvalues[10+i*2]);
		}

		for (var j=0; j<totalUpgrades; j++) {
			var yourloadedupgradenumber=9+(totalBuildings*2)+j;
			upgradeIsBought[j] = parseInt(arrayofvalues[yourloadedupgradenumber]);
		}

		for (var k=0; k<totalUpgrades; k++) {
			if (upgradeIsBought[k]==1) {
				upgradeTypeThings(k);
			}
		}
		for (var l=0; l<totalAchievements; l++) {
			eggchivmentsUnlocked[l]=arrayofvalues[9+totalBuildings*2+totalUpgrades+l];
		}
	}
	printPopup("Welcome to Bidoof Clicker, 2013-2015 Szymbar15");
	loaded=1;
	updateEggs();
	updateEPS();
}
window.onload = getCookie;

function checkLove() {
	if (love>100) {
        	love=100;
    	} else if (love < 0) {
        	love=0;
    	}
}

//Clicking
var bidoofAppears=0;
function bidoofClick(e){
    	eggs += clicks;
    	updateEggs();
    	breedsClicks++;
    	totalEggs = Math.round((totalEggs + clicks)*10)/10;
	document.getElementById("clicks").innerHTML = breedsClicks;
    	document.getElementById("totaleggs").innerHTML = totalEggs;
	checkLove();
    	love=Math.round((love + 0.1)*100)/100;
    	updateEggs();
	
	var xcoord=0;
	var ycoord=0;
	if (!e) var e=window.event;
	if (e.pageX || e.pageY)
	{
		xcoord = e.pageX;
		ycoord = e.pageY;
	}
	else if (e.clientX || e.clientY) 
	{
		xcoord = e.clientX;
		ycoord = e.clientY;
	}
	console.log(xcoord + " " + ycoord);
	bidoofAppears=1;
	bidoofAppearsTimer=0;
	document.getElementById("clickingEggs").style.top=ycoord+15+"px";
	document.getElementById("clickingEggs").style.left=xcoord+5+"px";
	document.getElementById("clickingEggs").visibility = "visible";
	document.getElementById("clickingEggs").style.opacity = "0.4";
}


//Menu
function toggleEggs() {
    	document.getElementById("powerup").style.display = 'none';
    	document.getElementById("statistics").style.display = 'none';
    	document.getElementById("achievements").style.display = 'none';
	var loadAllEggFactories="";
	for (i=0; i<totalBuildings; i++) {
		//loadAllEggFactories+='<button name="upgrade" class="abc" id="upgrade" type="reset" onclick="buy('+i+')">'+buildingsHTML[i]+'<br />'+buildingsDesc[i]+'<br />Mamas: <span id="'+ buildingsNames[i]+ '">0</span><br />Cost: <span id="'+ buildingsCostNames[i] + '">15</span></button><br />';
		loadAllEggFactories+='<button name="upgrade" class="abc" id="upgrade" type="reset" onclick="buy(' + i + ')"><div id="' + buildingsNames[i] + '" class="buildingamount">0</div><div id="buildingdetails"><span id="subthings">'+ buildingsHTML[i] + '</span><br />' + buildingsDesc[i] + '<br/>Cost: <span id="' + buildingsCostNames[i] + '">' + buildingsPrice[i] + '</span></div></button><br />';
	}
	console.log(loadAllEggFactories);
	document.getElementById("upgrade").innerHTML = loadAllEggFactories;
	document.getElementById("upgrade").style.display = 'inline';
	updateEggs();
	updateEPS();
}

function toggleUpgrades () {
    	document.getElementById("upgrade").style.display = 'none';
    	document.getElementById("statistics").style.display = 'none';
    	document.getElementById("achievements").style.display = 'none';
    	document.getElementById("powerup").style.display = 'inline';
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
}
function toggleStats () {
    	document.getElementById("powerup").style.display = 'none';
    	document.getElementById("upgrade").style.display = 'none';
    	document.getElementById("achievements").style.display = 'none';
    	document.getElementById("statistics").style.display = "inline";
    	document.getElementById("clicks").innerHTML = breedsClicks;
    	document.getElementById("upgradeCount").innerHTML = upgradeCount;
}
function toggleAchives () {
    	document.getElementById("powerup").style.display = 'none';
    	document.getElementById("statistics").style.display = 'none';
    	document.getElementById("upgrade").style.display = 'none';
    	document.getElementById("achievements").style.display = 'inline';
	refreshAchives();
}
function refreshAchives () {
	var loadAllAchievements="";
	for (i=0; i<totalAchievements; i++) {
		if (eggchivmentsUnlocked[i]==0) {
			loadAllAchievements+='<button name="achievement" class="abc" id="achievement" type="reset" disabled><div class="achievementdetails"><span id="subthings">' + eggchivmentsNames[i] + '</span><br/>' + eggchivmentsSubNames[i] + '</div><div id="achievementamount"><img style="width:80px; height:80px"class="achievementamount" id="achievement' + i +'" src="Bidoof100pxblack.png" align="right"></div></button></br>'
		} else {
			loadAllAchievements+='<button name="achievement" class="abc" id="achievement" type="reset" disabled><div class="achievementdetails"><span id="subthings">' + eggchivmentsNames[i] + '</span><br/>' + eggchivmentsTitles[i] + '</div><div id="achievementamount"><img style="width:80px; height:80px"class="achievementamount" id="achievement' + i +'" src="Bidoof100px.png" align="right"></div></button></br>'
		}
	}
	document.getElementById("achievements").innerHTML = loadAllAchievements;
}

//Events
var boosteffect = 0;
var buff = 1;
function event() {
	var whateventwillitbe = Math.round(Math.random()*3);

	if (whateventwillitbe==0) {printPopup("Lucky! Your Bidoofs hatched some bonus eggs!");eggs += eggsPerSecond*200;}
	else if (whateventwillitbe==1) {printPopup("Hot Skitty on Wailord action boosts your love!");love += (100-love)*0.2;}
	else if (whateventwillitbe==2) {printPopup("You got a free random Mama Bidoof from loving Bidoofs!");buildingsAmount[0] += 1;buildingsPrice[0] = Math.floor(buildingsPrice[0] * 1.30);document.getElementById(buildingsNames[0]).innerHTML = buildingsAmount[0];document.getElementById(buildingsCostNames[0]).innerHTML = buildingsPrice[0];}
	else if (whateventwillitbe==3) {printPopup("Your eggs per second get boosted for 30 seconds!");boosteffect=1;buff=7;}
	console.log("Lucky " + whateventwillitbe + " " + love*eventsChance/100 + " " + randomTime);

	updateEPS();
	updateEggs();
	eventCount++;
	
}
function unluckyEvent() {
	var whateventwillitbe = Math.round(Math.random());

	if (whateventwillitbe==0) {printPopup("You don't love your Bidoofs enough, so you lost some Eggs...");eggs -= eggs*0.2;}
	else if (whateventwillitbe==1) {printPopup("You've lost even more love!");love -= love*0.2;}
	console.log("Unlucky "+ whateventwillitbe + " " + love*eventsChance/100 + " " + randomTime);

	updateEggs();
	updateEPS();
	eventCount++;
}

//Upgrades
var upgradeIsBought = [0, 0, 0, 0, 0, 0];
var upgradeNames = ["papa", "daycare", "eventsHappen", "alphaMale", "ancientBidoof", "polishBidoof"];
var upgradeCostNames = ["papaCost", "doofCareCost", "eventsHappenCost", "alphaMaleCost", "ancientBidoofCost", "polishBidoofCost"];
var upgradeType = [0, 1, 2, 3, 4, 3];
var upgradeValue = [2, 0.5, 0.66, 1.28, 0.06, 1.29];
var upgradePrice = [50, 100, 1500, 4000, 5500, 15000];
var upgradeHTML = ["Papa Bidoof","'DoofDaycare","Bidoof Events","Alpha Male Bidoof","Ancient Bidoof","Polish Bidoof"];
var upgradeDesc = ["Clicking Bidoofs gives 2 times as much eggs",
"Thanks to *ekhm* weird chemistry, love drops 2 times slower",
"Random events happen 1/3 times more often",
"All Egg Factories make 1.28 times more eggs. Because why not.",
"Thanks to his wide knowledge, your clicks give 0.06 of EPS more.",
"Cannot into space. But can increase your EPS by 1.29 times."];



function upgradeTypeThings (number) {
	if (upgradeType[number]==0) {clicks = clicks * upgradeValue[number];baseClicks = baseClicks * upgradeValue[number];} 
	else if (upgradeType[number]==1) {lovedrop = lovedrop * upgradeValue[number];} 
	else if (upgradeType[number]==2) {eventsChance = eventsChance * upgradeValue[number];randomTime=Math.round((Math.random()*(eventsChance-(eventsChance*0.2)))+eventsChance*0.2);timeranotherone=0;} 
	else if (upgradeType[number]==3) {epsmodifier=epsmodifier * upgradeValue[number];} 
	else if (upgradeType[number]==4) {clickBoost = clickBoost + upgradeValue[number];}

	upgradeCount++;
	updateEggs();
	updateEPS();
}

function buyUpgrade (number) {
   	if(eggs >= upgradePrice[number]) {  
    		eggs = eggs - upgradePrice[number];
    		upgradeTypeThings(number);
    		upgradeIsBought[number]=1;
    	}
	document.getElementById(upgradeCostNames[number]).innerHTML = "DONE";
    	document.getElementById(upgradeNames[number]).disabled = true; 
}

function debugLove() {
    	love=42;
    	document.getElementById('love').innerHTML = love;
}

//Buildings
var buildingsPrice = [15,100,500,2200,8912,42424,111111,666666];
var buildingsGain = [0.1,0.6,3,11,45,242,1111,6666];
var buildingsAmount = [0,0,0,0,0,0,0,0];
var buildingsNames = ["mama", "shiny", "zombie", "kopatsch", "ahmed", "thinker", "brute","brodecki"];
var buildingsCostNames = ["mamaCost", "shinyCost", "zombieCost", "kopatschCost", "ahmedCost", "thinkerCost", "bruteCost","brodeckiCost"];
var buildingsTotal = 0;
var buildingsHTML = ["Mama Bidoof","Wannabe Shiny Painted Bidoof","Zombidoof","KopatschBidoof","Nuke Bidoof","The Bidoof Thinker","Russian Brute Bidoofs","BrodeckiBidoof"];
var buildingsDesc = ["Apparently only makes 0.1 eggs per second.",
"Gives ya 0.6 eggs per second. It isn't really shiny. It's painted.",
"'Converts' 3 brains into eggs per second ( ͡° ͜ʖ ͡°)",
"A group of explorers digging out 11 eggs per second.",
"30-Bidoof big terroristic organisation trapping 45 people in eggs per second.",
"Evolution line with minibrains in their teeth allowing to make 242 eggs per second.",
"Have giant muscles and play Tetris. Their secret to make 1111 EPS is vodka.",
"The one and only prawilny candidate."];
function buy(order) {
	if(eggs >= buildingsPrice[order]) {
		buildingsAmount[order] += 1;
		eggs = Math.round(eggs-buildingsPrice[order]);
		buildingsPrice[order] = Math.floor(buildingsPrice[order] *1.3);
	
		document.getElementById(buildingsNames[order]).innerHTML = buildingsAmount[order];
		document.getElementById(buildingsCostNames[order]).innerHTML = buildingsPrice[order];

		updateEggs();
		updateEPS();
		console.log(buildingsAmount);
	}
	
}
function sumBuildings() {
	buildingsTotal=0;
	for (i=0; i<totalBuildings; i++) {buildingsTotal+=buildingsAmount[i];}
}

		
function debug() {
    	eggs=eggs+100000;
    	updateEggs();
	saveGame();
}

//Achievements
var totalAchievements = 3;
var eggchivmentsUnlocked = [0,0,0];
var eggchivmentsNames = ["Newbie Breeder", 
"Kinda Advanced Breeder", 
"I really want a shiny..."];

var eggchivmentsTitles = ["You have made 10 eggs!",
"You have made 50 eggs!",
"You've bought Shiny Wannabe Bidoof!"];

var eggchivmentsSubNames = ["Make 10 eggs.", 
"Make 50 eggs.", 
"Buy 'that' guy who isn't shiny..."];

function achievementChecker() {
	if (totalEggs>=10 && eggchivmentsUnlocked[0]==0) {unlockAchievement(0,eggchivmentsNames[0]);}
	if (totalEggs>=50 && eggchivmentsUnlocked[1]==0) {unlockAchievement(1,eggchivmentsNames[1]);}
	if (buildingsAmount[1]>0 && eggchivmentsUnlocked[2]==0) {unlockAchievement(2,eggchivmentsNames[2]);}

}

function unlockAchievement(number, text) {
	printPopup("Achievement unlocked! "+text);
	eggchivmentsUnlocked[number] = 1;
	console.log(totalEggs + " " + eggchivmentsUnlocked[0] + " " + isPopupOn);
	updateEPS();
	refreshAchives();
}

function achievementsAmount() {
	achievementsUnlocked = 0;
	for (i=0; i<totalAchievements; i++) {
		if (eggchivmentsUnlocked[i]==1) {
			achievementsUnlocked++;
		}
	}
}
	

//Call popup
function printPopup(string) {
	document.getElementById("popupwindow").innerHTML = string;
	document.getElementById("popupwindow").style.opacity = 1;
	isPopupOn=1;
	popupTimer=0;
}
	
		
//if (eggs>=30) {


var timercount = 0;
var randomTime = Math.round((Math.random()*eventsChance*0.8)+eventsChance*0.2);
var displayed = 0;
var timeranotherone = 0;
var seconds=0;
var boostTimer=0;
var bidoofAppearsTimer=0;
var popupTimer=0;
//refresher
var timer = setTimeout(function() {
	timer = new Date().getTime();
	delay = Math.round((timer - oldTimer)/100);
	oldTimer=timer;
   	seconds+=delay;
	timer = setTimeout(arguments.callee, 100);
	eggs=Math.round((eggs+(eggsPerSecond/10)*delay)*100)/100;
	
	//console.log(randomTime + " " + timeranotherone);
	if (loaded==1 && displayed==0) {
		document.getElementById('isLoved').innerHTML = "Save loaded!";
		displayed=1;
	}

	if (timercount>=50) {
		document.getElementById('isLoved').innerHTML = "";
	}

	if (timeranotherone>=randomTime && (love*eventsChance/100)>=randomTime) {
		event();
		randomTime = Math.round(Math.random()*eventsChance);
		timeranotherone=0;
	} else if (timeranotherone>=randomTime && ((love*eventsChance)/100)<randomTime) {
		unluckyEvent();
		randomTime = Math.round(Math.random()*eventsChance);
		timeranotherone=0;
	} else {
		timeranotherone+=delay;
		timercount+=delay;
		document.getElementById("savetiem").innerHTML = Math.round(timercount/10);
	}

    	if (timercount>=600) {
		saveGame();
	}
	if (boosteffect>=1) {
		boostTimer+=delay;
	}
	if (boostTimer>=300) {
		boostTimer=0;
		boosteffect=0;
		buff=1;
	}
	if (bidoofAppears==1) {
		bidoofAppearsTimer++;
		var bidoofAppearsOpacity = 0.4-(4*bidoofAppearsTimer/100)*delay;
		document.getElementById("clickingEggs").style.opacity = bidoofAppearsOpacity;
	}
	if (bidoofAppearsTimer>=10) {
		bidoofAppears=0;
		bidoofAppearsTimer=0;
		document.getElementById("clickingEggs").style.opacity = 0;
	}
	if (isPopupOn==1) {
		popupTimer+=delay;
		document.getElementById("popupwindow").style.opacity = 1.0-(0.05*popupTimer);
	}
	if (popupTimer>=20) {
		isPopupOn=0;
		popupTimer=0;
		document.getElementById("popupwindow").style.opacity = 0;
	}
	
    	totalEggs = Math.round((totalEggs+eggsPerSecond/10*delay)*100)/100;
    	love = Math.round((love-lovedrop*delay)*1000)/1000;
	if (loaded==1) {
		updateEggs();
	}
	
	//console.log(buff);
	document.title=eggs;
}, 100);
