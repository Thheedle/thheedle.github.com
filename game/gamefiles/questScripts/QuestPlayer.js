class QuestPlayer {
	constructor(startX, startY) {
		this.x = startX;
		this.y = startY;

		this.bold = false;
		this.spellProne = false;
		this.canMove = true;

		this.onScreen = true;
	}

	toggleBold() {
		this.bold = !this.bold;
	}

	getSprite() {
		var out = "@";
		
		if (this.spellProne) {
			out = '<span style="background-color: #4454ff; color: white">' + out + '</span>';
		}
		if (this.bold) {
			out = '<span style="background-color: grey; color: white">' + out + '</span>';
		}
		out = '<span>' + out + '</span>';
		return out;
	}

	setProne() {
		this.spellProne = true;
		this.canMove = false;

		updateCamera();
	}

	handleDirection(keyCode) {
		console.log(currentMap.getTile(this.x, this.y));
		var xDelta;
		var yDelta;
		if (keyCode <= 40 && keyCode >= 37) {
			if (keyCode % 2 == 0) {
				xDelta = 0;
				yDelta = keyCode - 39;
			} else {
				xDelta = keyCode - 38;
				yDelta = 0;
			}
			if (this.canMove) {
				this.move(xDelta, yDelta);
				this.detectWarp();
			} else if (this.spellProne) {
				this.cast(xDelta, yDelta);
			}

			updateCamera();
		}
	}

	move(xDelta, yDelta) {
		var plannedX = this.x + xDelta;
		var plannedY = this.y + yDelta;

		if (noCollisions(plannedX, plannedY)) {
			if (outOfBounds(plannedX, plannedY)) {
				moveCamera(plannedX - this.x, plannedY - this.y);
			}
			this.x = plannedX;
			this.y = plannedY;
		}
	}

	cast(xDelta, yDelta) {
		new QuestFireball(this.x + xDelta, this.y + yDelta, xDelta, yDelta);
		this.canMove = true;
		this.spellProne = false;
	}

	lockMovement() {
		this.canMove = false;
	}

	unlockMovement() {
		this.canMove = true;
	}

	detectWarp() {
		if (currentMap.getTile(this.x, this.y) == "0") {
			handler.loadWarp(0);
		} else if (currentMap.getTile(this.x, this.y) == "1") {
			handler.loadWarp(1);
		}
	}
}