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
}

/*
class QuestMap {
	constructor(giantString) {
		var that = this;

		var req = new XMLHttpRequest();

		req.onload = function() {
	    	var mapRaw = this.responseText;
	    	mapRaw = mapRaw.split("\n");
	    	that.mapHeight = mapRaw.length - 1;
	    	that.mapWidth = mapRaw[0].length - 1;

	    	that.map = new Array(that.mapHeight);
	    	for (var i = 0; i < that.mapHeight; i++) {
	    		that.map[i] = new Array(that.mapWidth);
	    		mapRaw[i] = mapRaw[i].split("");
	    		for (var j = 0; j < that.mapWidth; j++) {
	    			that.map[i][j] = mapRaw[i][j];
	    		}
	    	}
	    	console.log(that.map[20][20]);
		};
		req.open("GET", filePath);
		req.send();
	}
}*/