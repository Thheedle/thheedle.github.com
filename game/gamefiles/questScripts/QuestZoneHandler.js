class QuestZoneHandler {
	constructor() {
		this.warpPoints = {};
		this.textData = {};

		this.currentLocation = "";
	}

	addWarp(source, index, destination, cx, cy, px, py) {
		if (this.warpPoints[source] == undefined) {
			this.warpPoints[source] = {};
		}
		this.warpPoints[source][index] = destination;

		this.warpPoints[source]["cx"] = cx;
		this.warpPoints[source]["cy"] = cy;
		this.warpPoints[source]["px"] = px + cx;
		this.warpPoints[source]["py"] = py + cy;
	}

	addTextData(location, rawText) {
		this.textData[location] = rawText;
	}
	
	getTextData(location) {
		return this.textData[location];
	}

	test() {
		console.log("this is a test");
	}

	loadMap(location) {
		currentMap = new QuestMap(this.textData[location]);
		this.currentLocation = location;
	}

	loadWarp(index) {
		var warpData = this.warpPoints[this.currentLocation];
		var destination = warpData[index];
		player.x = warpData["px"];
		player.y = warpData["py"];
		camera = new QuestCamera(warpData["cx"], warpData["cy"], 40, 20, 8, 4);
		this.loadMap(destination);
	}
}