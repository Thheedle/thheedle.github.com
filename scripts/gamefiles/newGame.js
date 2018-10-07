/* GLOBAL VARIABLES.
   Here we declare variables used throughout the whole game,
   such as panels which display information for the player or
   the number of popcorns owned by the player. 				*/

var popcornArea = new PopcornArea(document.getElementById("interactiveArea"));

var menu = new MenuBar(document.getElementsByClassName("menuButton"), [
	document.getElementsByClassName("collectionElement"),
	document.getElementsByClassName("itemsElement"),
	document.getElementsByClassName("questsElement")]);

var recentMessagesPanel = new MessagePanel(document.getElementById("recentMessages").children);

var popcorns = new PopcornCounter(document.getElementsByClassName("ownedCounter"));

/* WRAPPER FUNCTIONS
   This program, newGame.js, serves as the initial destination
   to handle button presses or other user input. In order to
   prevent hard coding inside of classes, we distribute
   commands through the use of wrapper functions, as shown
   below.													*/

function giveFocus(e) {
	menu.giveFocus(e);
}

function addPopcorns() {
	popcornArea.add();
}

function addPopcornsOwned(n = 1) {
	popcorns.add(n);
}

function clickedEat() {
	popcorns.eat();
}

function handlePopcornClick(x, y) {
	popcornArea.handleClick(x, y);
}

function addRandomMessage() {
	recentMessagesPanel.addRandomMessage();
}

