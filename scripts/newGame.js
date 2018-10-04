var gameText = document.getElementById("gameText");
var popcornArea = document.getElementById("interactiveArea");
var gameTextArray = new Array(10);

var recentMessages = new Array(5);
var recentMessagesPanel = document.getElementById("recentMessages").children;
var messageBackup = new Array(50);

var recentMessagesSpacing = 1.5;

for (var i = 0; i < 5; i++) {
	recentMessagesPanel[i].style.top = i*recentMessagesSpacing + "em";
	recentMessages[i] = " ";
}

//updateRecentMessages();

var randomMarginPercent = 40;

for (var i = 0; i < 10; i++) {
	gameTextArray[i] = new Array(10);
	for (var j = 0; j < 10; j++) {
		var container = document.createElement("DIV");
		container.classList.add("popcornNodeContainer");
		popcornArea.appendChild(container);

		var node = document.createElement("DIV");
		node.innerHTML = " ";
		node.classList.add("popcornNode")
		node.classList.add("monospace");

		var randX = randomMarginPercent*Math.random();
		var randY = randomMarginPercent*Math.random();
		node.style.margin = randY + "% " + randX + "% " + (randomMarginPercent - randY) + "% " + (randomMarginPercent - randX) + "%";

		node["data-x"] = j;
		node["data-y"] = i;

		node.addEventListener("click", function(e){handlePopcornClick(e.target["data-x"], e.target["data-y"])});
		gameTextArray[i][j] = node;
		container.appendChild(node);
	}
}

var whitespaceChar = " ";

let text = "blank";

var popcorns = {
	numOwned: 0,
	totalEarned: 0,
	totalEaten: 0,
}

var menuButtons = document.getElementsByClassName("menuButton");

function doThings() {
	gameText.innerHTML = text;
}

function giveFocus(e) {
	for (var i = 0; i < menuButtons.length; i++) {
		menuButtons[i].style["background-color"] = "white";
	}
	e.target.style["background-color"] = "#f4e242";
}

function addPopcorns() {
	var toBeAdded = getRandomInt(2);
	for (var i = 0; i < toBeAdded; i++) {
		var xindex = getRandomInt(10);
		var yindex = getRandomInt(10);

		var node = gameTextArray[yindex][xindex];
		node.innerHTML = '*';
		node.style.cursor = "pointer";
	}
}

function clickedCharacter(index) {
	gameTextArray[index] = whitespaceChar;
	popcorns.numOwned++;
	updateGame();
	updatePopcornArea();
}

function updateGame() {
	gameText.innerHTML = "You have " + popcorns.numOwned + " popcorns.";
}

function getPopcornAreaString() {
	var out = "";
	for (var i = 0; i < 100; i++) {
		out += gameTextArray[i];
	}

	return out;
}

function handlePopcornClick(x, y) {
	var node = gameTextArray[y][x];
	node.innerHTML = " ";
	node.style.cursor = "default";

	popcorns.numOwned += 1;
	updateGame();
}

function eatPopcorns() {
	if (popcorns.numOwned > 0) {
		if (popcorns.numOwned == 1) {
			addMessage("You eat 1 popcorn.");
		} else {
			addMessage("You eat " + popcorns.numOwned + " popcorns.");
		}
		document.getElementById("popcornsEaten").style.visibility = "visible";
		document.getElementById("popcornsEaten").style.height = "auto";
		popcorns.totalEaten += popcorns.numOwned;
		popcorns.numOwned = 0;
		document.getElementById("popcornsEaten").innerHTML = "You have eaten " + popcorns.totalEaten + " popcorns.";
		updateGame();
	}
}

updateGame();

setInterval(function() {
	//popcorns.numOwned++;
	updateGame();
}, 1000);

setInterval(function() {
	addPopcorns();
}, 1000);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addMessage(text) {
	updateRecentMessages();
	for (var i = 4; i > 0; i--) {
		recentMessages[i] = recentMessages[i-1];
	}
	recentMessages[0] = text;
}

function addRandomMessage() {
	var yeet = getRandomInt(6);
	var messages = ['Ello Yewchewb', 'Havagu Day', 'You find a Sami. She is bald.', 'Thotticus approaches you...', 'Bald Sami is Bald', 'Chandram Bramba Chandram Bramba Bendram'];
	addMessage(messages[yeet]);
}

function updateRecentMessages() {
	for (var i = 0; i < 5; i++) {
		//console.log(recentMessages[i]);
		(function(index) {
			let originalPos = parseFloat(recentMessagesPanel[index].style.top);
			let pos = 0;
			let timer = setInterval(function() {
				if (pos >= recentMessagesSpacing) {
					clearInterval(timer);
					if (index == 0) {
						recentMessagesPanel[index].style.opacity = 0;
						fadeIn(recentMessagesPanel[index]);
					}
					if (index == 4) {
						recentMessagesPanel[index].style.opacity = 1;
						fadeOut(recentMessagesPanel[index]);
					}
					recentMessagesPanel[index].style.top = originalPos + "em";
					recentMessagesPanel[index].innerHTML = recentMessages[index];
				} else {
					recentMessagesPanel[index].style.top = originalPos + pos + "em";
					pos = pos + .1 * recentMessagesSpacing;
				}
			}, 30);
		})(i);
	}
}

function fadeIn(elm) {
	let op = 0;

	let timer = setInterval(function () {
		if (op >= 1) {
			elm.style.opacity = 1;
			clearInterval(timer);
		}
		elm.style.opacity = op;
		op = op + .05;
	}, 20);
}

function fadeOut(elm) {
	let op = 1;

	let timer = setInterval(function () {
		if (op <= 0) {
			elm.style.opacity = 0;
			clearInterval(timer);
		}
		elm.style.opacity = op;
		op = op - .05;
	}, 20);
}