class MenuBar {
	constructor(menuButtons, menuElements) {
		this.menuButtons = menuButtons;
		this.menuElements = menuElements;
	}

	giveFocus(event) {
		for (var i = 0; i < this.menuButtons.length; i++) {
			this.menuButtons[i].style["background-color"] = "white";
		}
		event.target.style["background-color"] = "#f4e242";

		for (var i = 0; i < 3; i++) {
			if (i == event.target.dataset.activate) {
				for (var j = 0; j < this.menuElements[i].length; j++) {
					if (!contains(this.menuElements[i][j].classList, "secret")) {
						this.menuElements[i][j].classList.remove("hidden");
					}
				}
			} else {
				for (var j = 0; j < this.menuElements[i].length; j++) {
					this.menuElements[i][j].classList.add("hidden");
				}
			}
		}
	}
}