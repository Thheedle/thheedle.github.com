var gameText = document.getElementById("gameText");
let text = "blank";

var popcorns = {
	numOwned: 0,
	totalEarned: 0,
	totalEaten: 0,
}

var menuButtons = document.getElementsByClassName("menuButton");

console.log(menuButtons.length);

function doThings() {
	gameText.innerHTML = text;
	console.log(gameText.innerHTML);
}

function giveFocus(e) {
	for (var i = 0; i < menuButtons.length; i++) {
		menuButtons[i].style["background-color"] = "white";
	}
	e.target.style["background-color"] = "#f4e242";
}

function updateGame() {
	gameText.innerHTML = "You have " + popcorns.numOwned + " popcorns.";
}

function eatPopcorns() {
	popcorns.totalEaten += popcorns.numOwned;
	popcorns.numOwned = 0;
	updateGame();
}

updateGame();

setInterval(function() {
	popcorns.numOwned++;
	updateGame();
}, 1000)