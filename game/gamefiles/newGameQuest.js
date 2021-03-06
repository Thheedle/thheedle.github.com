window.addEventListener("keydown", keyPressed);

var currentMap;
//var camera = new QuestCamera(0, 0, 40, 20, 8, 4);
var camera = new QuestCamera(20, 20, 40, 20, 8, 4);
var player = new QuestPlayer(camera.x + (camera.width / 2), camera.y + (camera.height / 2));

new QuestSlime(30, 30);

var handler = new QuestZoneHandler();

/////////////////////////////////////////

handler.addTextData("worldmap", worldmapText);
handler.addWarp("worldmap", 1, "throneroom", 2, 1, 8, 9);
handler.addTextData("throneroom", throneroomText);
handler.addWarp("throneroom", 0, "worldmap", 84, 24, 28, 9);

/////////////////////////////////////////

handler.loadMap("worldmap");

var gamePanel = document.getElementById("questPanel");

function noCollisions(globalX, globalY) {
	return camera.noCollisions(globalX, globalY);
}

function setProne() {
	player.setProne();
}

function outOfBounds(x, y) {
	return camera.outOfBounds(x, y);
}

function keyPressed(e) {
	if (questActive) {
		player.handleDirection(e.keyCode);
	}
}

function updateFireballs() {
	QuestFireball.updateFireballs();
}

function drawFireballs() {
	for (var i = 0; i < QuestFireball.fireballArray.length; i++) {
		if (camera.onScreen(QuestFireball.fireballArray[i].x, QuestFireball.fireballArray[i].y)) {
			camera.writeScreen(QuestFireball.fireballArray[i].x, QuestFireball.fireballArray[i].y, '<span style="background-color: red"> </span>');
		}
	}
}

function drawSlimes() {
	for (var i = 0; i < QuestSlime.slimeArray.length; i++) {
		if (camera.onScreen(QuestSlime.slimeArray[i].x, QuestSlime.slimeArray[i].y)) {
			camera.writeScreen(QuestSlime.slimeArray[i].x, QuestSlime.slimeArray[i].y, QuestSlime.slimeArray[i].currentSprite);
		}
	}
}

function updateNecessary() {
	return QuestFireball.updateNecessary();
}

function updateCamera() {
	updateMapData();
	drawEntities();
	if (player.onScreen) {
		camera.writeScreen(player.x, player.y, player.getSprite());
	}
	gamePanel.innerHTML = camera.getView();
}

function moveCamera(xDelta, yDelta) {
	camera.move(xDelta, yDelta);
}

function updateMapData() {
	currentMap.populateCamera(camera.charScreen, camera.colorScreen, camera.width, camera.height, camera.x, camera.y);
}

function drawEntities() {
	drawFireballs();
	drawSlimes();
}

updateCamera();

setInterval(function() {
	if (questActive) {
		player.toggleBold();
		updateCamera();
		QuestSlime.moveSlimes();
	}
}, 500);

setInterval(function() {
	if (updateNecessary() && questActive) {
		updateFireballs();
		updateCamera();
		QuestFireball.overlap(QuestSlime.slimeArray);
	}
}, 50);