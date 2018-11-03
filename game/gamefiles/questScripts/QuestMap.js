class QuestMap {
	constructor(giantString) {
		var that = this;

	    this.map = giantString.split("\n");

	    this.mapHeight = this.map.length;
	   	this.mapWidth = this.map[1].length;

	   	this.mapColors = new Array(this.mapHeight);

	   	console.log(this.mapWidth + " x " + this.mapHeight);

	    for (var i = 0; i < this.mapHeight; i++) {
	    	this.map[i] = this.map[i].split("");
	    	this.mapColors[i] = new Array(this.mapWidth);
	    }
	}

	populateCamera(charArray, colorArray, width, height, cameraX, cameraY) {
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				charArray[i][j] = this.getTile(cameraX + j, cameraY + i);
				colorArray[i][j] = this.getColor(cameraX + j, cameraY + i);
			}
		}
	}

	getTile(globalX, globalY) {
		var tile;
		if (this.map[globalY] == undefined) {
			return "#";
		}
		tile = this.map[globalY][globalX];
		if (tile == undefined) {
			return "#";
		} else {
			return tile;
		}
	}

	getColor(globalX, globalY) {
		if (this.map[globalY] == undefined) {
			return undefined;
		}
		var tile = this.getTile(globalX, globalY);
		var bg = this.mapColors[globalY][globalX];
		if (bg == undefined) {
			if (tile != "#") {
				return bg;
			} else {
				var color = getStoneColor();
				this.mapColors[globalY][globalX] = color;
				return color;
			}
		}
		return this.mapColors[globalY][globalX];
	}
}