class QuestCamera {
	constructor(startX, startY, width, height, xMargin, yMargin) {
		this.x = startX;
		this.y = startY;
		this.width = width;
		this.height = height;
		this.xMargin = xMargin;
		this.yMargin = yMargin;

		this.charScreen = new Array(height);
		this.colorScreen = new Array(height);

		for (var i = 0; i < this.height; i++) {
			this.charScreen[i] = new Array(width);
			this.colorScreen[i] = new Array(width);
			for (var j = 0; j < this.width; j++) {
				this.charScreen[i][j] = "#";
			}
		}
	}

	outOfBounds(globalX, globalY) {
		var localX = globalX - this.x;
		var localY = globalY - this.y;
		if (this.height - localY - 1 <= this.yMargin || localY <= this.yMargin || this.width - localX - 1 <= this.xMargin || localX <= this.xMargin) {
			return true;
		}
		return false;
	}

	move(xDelta, yDelta) {
		this.x += xDelta;
		this.y += yDelta;
	}

	getView() {
		var out = "";
		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) {
				out = out + this.getRichTile(j, i);
			}
			out = out + "\n";
		}
		return out;
	}

	getRichTile(x, y) {
		var tile = this.charScreen[y][x];
		var color = this.colorScreen[y][x];
		if (color == undefined) {
			return tile;
		} else {
			return '<span style="color: ' + color + '">' + tile + '</span>';
		}
	}

	writeScreen(globalX, globalY, text) {
		this.charScreen[globalY - this.y][globalX - this.x] = text;
	}

	onScreen(globalX, globalY) {
		var localX = globalX - this.x;
		var localY = globalY - this.y;
		if (this.height - localY - 1 <= -1 || localY <= -1 || this.width - localX - 1 <= -1 || localX <= -1) {
			return false;
		}
		return true;
	}

	noCollisions(globalX, globalY) {
		if (!contains(QuestCamera.collisionCharacters, currentMap.getTile(globalX, globalY))) {
			return true;
		}
		return false;
	}
}

QuestCamera.collisionCharacters = ["#", "|", "+"];