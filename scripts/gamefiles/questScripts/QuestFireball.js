class QuestFireball {
	constructor(startX, startY, xDelta, yDelta, lifetime = 30) {
		this.x = startX;
		this.y = startY;
		this.xDelta = xDelta;
		this.yDelta = yDelta;
		this.lifetime = lifetime;

		QuestFireball.fireballArray.push(this);
	}

	update() {
		if (this.lifetime <= 0) {
			this.remove();
		} else {
			var plannedX = this.x + this.xDelta;
			var plannedY = this.y + this.yDelta;

			if (noCollisions(plannedX, plannedY)) {
				this.x = plannedX;
				this.y = plannedY;
				this.lifetime -= 1;
			} else {
				this.remove();
			}
		}
	}

	remove() {
		for (var i = 0; i < QuestFireball.fireballArray.length; i++) {
			if (QuestFireball.fireballArray[i] == this) {
				QuestFireball.fireballArray.splice(i, 1);
				break;
			}
		}
	}
}

QuestFireball.fireballArray = new Array();

QuestFireball.updateFireballs = function() {
	for (var i = 0; i < QuestFireball.fireballArray.length; i++) {
		QuestFireball.fireballArray[i].update();
	}
};

QuestFireball.updateNecessary = function() {
	if (QuestFireball.fireballArray.length > 0) {
		return true;
	}
	return false;
}