class QuestMap {
	constructor(giantString) {
		var that = this;

	    this.map = giantString.split("\n");
	    	
	    this.mapHeight = this.map.length;
	   	this.mapWidth = this.map[1].length;

	   	console.log(this.mapWidth + " x " + this.mapHeight);

	    for (var i = 0; i < this.mapHeight; i++) {
	    	this.map[i] = this.map[i].split("");
	    }
	}

	populateCamera(cameraArray, width, height, cameraX, cameraY) {
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				cameraArray[i][j] = this.map[i+cameraY][j+cameraX];
				if (cameraArray[i][j] == undefined) { 
					cameraArray[i][j] = "#";
				}
			}
		}
	}

	getTile(globalX, globalY) {
		return this.map[globalY][globalX];
	}
}