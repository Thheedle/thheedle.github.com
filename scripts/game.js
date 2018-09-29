var debugEnabled = false;

const GAMEWIDTH  = 40;
const GAMEHEIGHT = 20;
const HMARGIN = 8;
const VMARGIN = 4;

if (debugEnabled) {
	debug();
}

function debug() {
	document.getElementById("debug").style.visibility = "visible";
	document.getElementById("fireballButton").setAttribute("onclick", "spellProne()");
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

var playerBold = true;
var playerProne = false;
var playerX = GAMEWIDTH / 2;
var playerY = GAMEHEIGHT / 2;

var nextPlayerX;
var nextPlayerY;

var playerOnScreen = true;
var moveChar = true;

var castSpell = false;

var fireballs = new Array(15);

console.log(fireballs[0] == undefined);

window.addEventListener("keydown", keyPressed);

var collisionCharacters = ["#", "|", "+"];

function noCollisions(x, y) {
	if (elementOf(gameScreen[y][x], collisionCharacters)) {
		return false;
	}
	return true;
}

function outOfBounds(x, y) {
	if (GAMEHEIGHT - y - 1 <= VMARGIN || y <= VMARGIN || GAMEWIDTH - x - 1 <= HMARGIN || x <= HMARGIN) {
		return true;
	}
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
		if (moveChar) {
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
				cameraX += nextPlayerX - playerX;
				cameraY += nextPlayerY - playerY;
			}
		}
		if (castSpell) {
			if (currentKey % 2 == 0) {
				createFireball(playerX, playerY + currentKey - 39, 0, currentKey - 39);
			} else {
				createFireball(playerX + currentKey - 38, playerY, currentKey - 38, 0);
			}
			castSpell = false;
			moveChar = true;
			playerProne = false;
		}
		updateGame();
	}
}

function createFireball(xStart, yStart, xDel, yDel) {
	var index = 0;
	while (fireballs[index] != null) {
		index++;
	}
	fireballs[index] = {
		xPos: xStart,
		yPos: yStart,
		xDelta: xDel,
		yDelta: yDel,
		lifetime: 5
	};
}

function updateFireballs() {
	for (var i = 0; i < fireballs.length; i++) {
		if (fireballs[i] != undefined) {
			if (fireballs[i].lifetime <= 0) {
				fireballs[i] = undefined;
			} else {
				var tempNextX = fireballs[i].xPos + fireballs[i].xDelta;
				var tempNextY = fireballs[i].yPos + fireballs[i].yDelta;
				if (noCollisions(tempNextX, tempNextY)) {
					fireballs[i].xPos = tempNextX;
					fireballs[i].yPos = tempNextY;
					fireballs[i].lifetime--;
				} else {
					fireballs[i] = undefined;
				}
			}
		}
	}
}

function drawFireballs() {
	for (var i = 0; i < fireballs.length; i++) {
		if (fireballs[i] != undefined) {
			if (fireballs[i].xPos >= 1 && fireballs[i].xPos <= GAMEWIDTH && fireballs[i].yPos >= 1 && fireballs[i].yPos <= GAMEHEIGHT) {
				gameScreen[fireballs[i].yPos][fireballs[i].xPos] = '<span style="background-color: red"> </span>';
			}
		}
	}
}

function updateNecessary() {
	for (var i = 0; i < fireballs.length; i++) {
		if (fireballs[i] != undefined) {
			return true;
		}
	}
	return false;
}

function spellProne() {
	moveChar = false;
	castSpell = true;
	playerProne = true;
	playerBold = false;
	updateGame();
	console.log("cast spell");
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

	drawFireballs();

	if (playerOnScreen) {
		if (playerProne) {
			gameScreen[playerY][playerX] = '<span style="background-color: #4454ff; color: white">@</span>';
		} else if (playerBold) {
			gameScreen[playerY][playerX] = '<span style="background-color: grey; color: white">@</span>';
		} else {
			gameScreen[playerY][playerX] = "@";
		}
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

setInterval(function() {
	//playerY++;
	if (!playerProne) {
		playerBold = !playerBold;
	}
	updateGame();
}, 500);

setInterval(function() {
	if (updateNecessary()) {
		updateFireballs();
		updateGame();
	}
}, 100);