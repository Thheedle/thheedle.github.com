class PopcornCounter {
	constructor(displayElements) {
		this.displayElements = displayElements;

		this.hasShownNumEaten = false;

		this.numOwned = 0;
		this.totalEarned = 0;
		this.totalEaten = 0;

		this.updateOwned();
		this.updateEaten();
	}

	add(quantity = 1) {
		this.numOwned += quantity;
		this.updateOwned();
	}

	eat() {
		if (this.numOwned > 0) {
			if (this.numOwned == 1) {
				recentMessagesPanel.addMessage("You eat 1 popcorn.");
			} else {
				recentMessagesPanel.addMessage("You eat " + this.numOwned + " popcorns.");
			}

			if (!this.hasShownNumEaten) {
				this.showNumEaten();
			}

			this.totalEaten += this.numOwned;
			this.numOwned = 0;
			this.updateOwned();
			this.updateEaten();
		}
	}

	updateOwned() {
		for (var i = 0; i < this.displayElements.length; i++) {
			this.displayElements[i].innerHTML = this.numOwned;
		}
	}

	updateEaten() {
		var spans = document.getElementsByClassName("eatenCounter");
		for (var i = 0; i < spans.length; i++) {
			spans[i].innerHTML = this.totalEaten;
		}
	}

	showNumEaten() {
		var hidden = document.getElementById("popcornsEaten");
		hidden.style.visibility = "visible";
		hidden.style.height = "auto";
		hidden.classList.remove("secret");
	}
}