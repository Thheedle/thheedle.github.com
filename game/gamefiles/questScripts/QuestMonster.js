class QuestMonster {
	constructor(startX, startY) {
		this.x = startX;
		this.y = startY;

		this.currentSprite = "&";

		this.health = 9999;
		this.maxHealth = 9999;

		this.mana = 0;
		this.maxMana = 0;

		this.damageTimer = undefined;

		this.canMove = true;
		this.moveTimer = undefined;
	}

	dealDamage(damage = 1) {
		this.health -= damage;
		if (this.health <= 0) {
			this.remove();
			updateCamera();
		}
	}
}