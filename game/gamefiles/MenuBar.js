class MenuBar {
	constructor(menuButtons, menuElements) {
		this.menuButtons = menuButtons;
		this.menuElements = menuElements;
	}

	giveFocus(event) {
		if (event.target.dataset.activate == 2) {
			questActive = true;
		} else {
			questActive = false;
		}

		for (var i = 0; i < this.menuButtons.length; i++) {
			this.menuButtons[i].style["background-color"] = "white";
		}
		event.target.style["background-color"] = "#f4e242";

		for (var i = 0; i < 3; i++) {
			if (i == event.target.dataset.activate) {
				for (var j = 0; j < this.menuElements[i].length; j++) {
					if (!contains(this.menuElements[i][j].classList, "secret")) {
						this.menuElements[i][j].classList.remove("hidden");
						this.menuElements[i][j].classList.add("shown");
					}
				}
			} else {
				for (var j = 0; j < this.menuElements[i].length; j++) {
					this.menuElements[i][j].classList.remove("shown");
					this.menuElements[i][j].classList.add("hidden");
				}
			}
		}
	}
}