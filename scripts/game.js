var debug = true;

const GAMEWIDTH  = 40;
const GAMEHEIGHT = 20;
const HMARGIN = 8;
const VMARGIN = 4;

if (debug) {
	document.getElementById("debug").style.visibility = "visible";
}

var gameScreen = new Array(GAMEHEIGHT);
for (var i = 0; i < GAMEHEIGHT; i++) {
	gameScreen[i] = new Array(GAMEWIDTH);
}

var worldMap = new Array(64);
for (var i = 0; i < 64; i++) {
	worldMap[i] = new Array(128);
	for (var j = 0; j < 128; j++) {
		worldMap[i][j] = " ";
	}
}

var mapRaw;
loadMap();


var gamePanel = document.getElementById("gamepanel");

var currentKey = 0;

var cameraX = 42;
var cameraY = 26;

var playerX = GAMEWIDTH / 2;
var playerY = GAMEHEIGHT / 2;

var nextPlayerX;
var nextPlayerY;

var playerOnScreen = true;

window.addEventListener("keydown", keyPressed);

var collisionCharacters = ["#", "|", "+"];

function noCollisions(x, y) {
	if (elementOf(gameScreen[y][x], collisionCharacters)) {
		console.log("collision!");
		return false;
	}
	return true;
}

function outOfBounds(x, y) {
	if (GAMEHEIGHT - y - 1 <= VMARGIN || y <= VMARGIN || GAMEWIDTH - x - 1 <= HMARGIN || x <= HMARGIN) {
		console.log(x);
		console.log(y);

		return true;

	}
	console.log("not out of bounds");
	return false;
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

		var noColls = noCollisions(nextPlayerX, nextPlayerY);
		var outOfB = outOfBounds(nextPlayerX, nextPlayerY);

		if (noColls && !outOfB) {
			playerX = nextPlayerX;
			playerY = nextPlayerY;
		}

		if (noColls && outOfB) {
			console.log("changing camera " + outOfB);
			cameraX += nextPlayerX - playerX;
			cameraY += nextPlayerY - playerY;
		}

		updateGame();
	}
	console.log(currentKey);
}

function loadMap() {
	var req = new XMLHttpRequest();
	req.onload = function(){
    	mapRaw = this.responseText;
    	mapRaw = mapRaw.split("\n");
    	for (var i = 0; i < 64; i++) {
    		mapRaw[i] = mapRaw[i].split("");
    		mapRaw[i][128] = undefined;
    		for (var j = 0; j < 128; j++) {
    			worldMap[i][j] = mapRaw[i][j];
    		}
    	}
    	updateGame();
	};
	req.open("GET", "./data/worldmap.txt");
	req.send();
}

function updateGame() {
	updateMapData();
	//blankCanvas();

	if (playerOnScreen) {
		gameScreen[playerY][playerX] = "@";
		document.getElementById("playerX").innerHTML = "playerX: " + playerX;
		document.getElementById("playerY").innerHTML = "playerY: " + playerY;
	}

	let data = "";
	for (var i = 0; i < GAMEHEIGHT; i++) {
		for (var j = 0; j < GAMEWIDTH; j++) {
			data = data + gameScreen[i][j];
		}
		data = data + "\n";
	}
	gamePanel.innerHTML = data;
}

function updateMapData() {
	for (var i = 0; i < GAMEHEIGHT; i++) {
		for (var j = 0; j < GAMEWIDTH; j++) {
			//console.log("character added: " +  worldMap[i+cameraY][j+cameraX]);
			gameScreen[i][j] = worldMap[i+cameraY][j+cameraX];
		}
	}
}

function blankCanvas() {
	for (var i = 0; i < GAMEHEIGHT; i++) {
		for (var j = 0; j < GAMEWIDTH; j++) {
			gameScreen[i][j] = " ";
		}
	}
}

updateGame();

setInterval(function() {
	//playerY++;
	updateGame();
}, 1000);