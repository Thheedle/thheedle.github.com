var debug = true;

loadMap();

if (debug) {
	document.getElementById("debug").style.visibility = "visible";
}

var gameScreen = new Array(12);
for (var i = 0; i < 12; i++) {
	gameScreen[i] = new Array(20);
}

var worldMap = new Array(64);
for (var i = 0; i < 12; i++) {
	worldMap[i] = new Array(128);
}

var gamePanel = document.getElementById("gamepanel");

var currentKey = 0;

var playerX = 3;
var playerY = 3;

var nextPlayerX;
var nextPlayerY;

var playerOnScreen = true;

window.addEventListener("keydown", keyPressed);

var collisionCharacters = ["#", "|", "+"];

function noCollisions(x, y) {
	if (elementOf(gameScreen[y][x], collisionCharacters)) {
		return false;
	}
	return true;
}

function elementOf(element, container) {
	for (var i = 0; i < container.length; i++) {
		if (element == container[i]) {
			return true;
		}
	}
	return false;
}

function keyPressed(e) {
	currentKey = e.keyCode;
	if (currentKey <= 40 && currentKey >= 37) {
		if (currentKey % 2 == 0) {
			nextPlayerX = playerX;
			nextPlayerY = playerY + currentKey - 39;
		} else {
			nextPlayerY = playerY;
			nextPlayerX = playerX + currentKey - 38;
		}

		if (noCollisions(nextPlayerX, nextPlayerY)) {
			playerX = nextPlayerX;
			playerY = nextPlayerY;
		}

		updateGame();
	}
	console.log(currentKey);
}

function loadMap() {
	var req = new XMLHttpRequest();
	req.onload = function(){
    	console.log(this.responseText);
	};
	req.open("GET", "/data/worldmap.txt");
	req.send();
}

function updateGame() {
	blankCanvas();
	if (playerOnScreen) {
		gameScreen[playerY][playerX] = "@";
		document.getElementById("playerX").innerHTML = "playerX: " + playerX;
		document.getElementById("playerY").innerHTML = "playerY: " + playerY;
	}

	gameScreen[5][10] = "#";

	var data = "";
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 20; j++) {
			data = data + gameScreen[i][j];
		}
	}

	gamePanel.innerHTML = data;
}

function blankCanvas() {
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 20; j++) {
			gameScreen[i][j] = ".";
		}
	}
}

updateGame();

setInterval(function() {
	//playerY++;
	updateGame();
}, 1000);

alert();