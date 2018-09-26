var gameScreen = new Array(20);
var gamePanel = document.getElementById("gamepanel");

var currentKey = 0;

window.addEventListener("keydown", keyPressed);

function keyPressed(e) {
	currentKey = e.keyCode;
	if (currentKey <= 40 && currentKey >= 37) {
		if (currentKey % 2 == 0) {
			playerY += currentKey - 39;
		} else {
			playerX += currentKey - 38;
		}
		updateGame();
	}
	console.log(currentKey);
}

var playerX = 3;
var playerY = 3;

var playerOnScreen = true;

for (var i = 0; i < 20; i++) {
	gameScreen[i] = new Array(20);
	for (var j = 0; j < 12; j++) {
		gameScreen[i][j] = ".";
	}
}

function updateGame() {
	blankCanvas();
	if (playerOnScreen) {
		gameScreen[playerX][playerY] = "@";
	}


	var data = "";
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 20; j++) {
			data = data + gameScreen[j][i];
		}
	}

	gamePanel.innerHTML = data;
}

function blankCanvas() {
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 20; j++) {
			gameScreen[j][i] = ".";
		}
	}
}

updateGame();

setInterval(function() {
	//playerY++;
	updateGame();
}, 1000);