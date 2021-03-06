class QuestPlayer {
	constructor(startX, startY) {
		this.x = startX;
		this.y = startY;

		this.currentSprite = "@";

		this.health = 10;
		this.maxHealth = 10;

		this.mana = 10;
		this.maxMana = 10;

		this.damageTimer = undefined;
		this.manaTimer = undefined;

		this.fireballCost = 3;

		this.healthBars = document.getElementById("healthBar");
		this.manaBars = document.getElementById("manaBar");

		this.bold = false;
		this.spellProne = false;

		this.isDead = false;
		this.canMove = true;

		this.onScreen = true;
	}

	toggleBold() {
		if (!this.isDead) {
			this.bold = !this.bold;
		}
	}

	getSprite() {
		var out = this.currentSprite;
		
		if (this.spellProne) {
			out = '<span style="background-color: #4454ff; color: white">' + out + '</span>';
		}
		if (this.bold) {
			out = '<span style="background-color: grey; color: white">' + out + '</span>';
		}

		if (this.isDead) {
			out = '<span style="background-color: pink; color: red">' + out + '</span>';
		}

		out = '<span>' + out + '</span>';
		return out;
	}

	setProne() {
		if (this.mana >= this.fireballCost) {
			this.spellProne = true;
			this.canMove = false;

			updateCamera();
		}
	}

	handleDirection(keyCode) {
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

		if (keyCode == 70) {
			setProne();
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
			this.detectHazard();
		}
	}

	cast(xDelta, yDelta) {
		new QuestFireball(this.x + xDelta, this.y + yDelta, xDelta, yDelta);
		this.canMove = true;
		this.spellProne = false;
		this.mana -= this.fireballCost;

		if (this.manaTimer == undefined) {
			var that = this;
			this.manaTimer = setInterval(function() {
				that.mana += 1;
				that.updateManaBars();
				if (that.mana == that.maxMana) {
					clearInterval(that.manaTimer);
					that.manaTimer = undefined;
				}
			}, 3000);
		}

		this.updateManaBars();
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

	detectHazard() {
		if (currentMap.getTile(this.x, this.y) == "^") {
			var that = this;
			that.dealDamage(1);
			this.damageTimer = setInterval(function() {
				that.dealDamage(1);
			}, 500);
		} else {
			clearInterval(this.damageTimer);
		}
	}

	dealDamage(damage = 1) {
		this.health -= damage;
		this.updateHealthBars();
	}

	updateHealthBars() {
		if (this.health <= 0) {
			this.health = 0;
			this.canMove = false;
			this.currentSprite = "%";
			this.isDead = true;
			this.bold = false;
		}
		this.healthBars.style.width = (this.health * 100 / this.maxHealth) + "%";
	}

	updateManaBars() {
		this.manaBars.style.width = (this.mana * 100 / this.maxMana) + "%";
	}
}