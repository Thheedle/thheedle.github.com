class PopcornArea {
	constructor(mainDiv) {
		this.mainDiv = mainDiv;
		this.textArray = new Array(7);
		this.randomMarginPercent = 40;

		for (var i = 0; i < 7; i++) {
			this.textArray[i] = new Array(7);
			for (var j = 0; j < 7; j ++) {
				var container = document.createElement("DIV");
				container.classList.add("popcornNodeContainer");
				this.mainDiv.appendChild(container);

				var node = document.createElement("DIV");
				node.innerHTML = " ";
				node.classList.add("popcornNode")
				node.classList.add("monospace");
				var randX = this.randomMarginPercent*Math.random();
				var randY = this.randomMarginPercent*Math.random();
				node.style.margin = randY + "% " + randX + "% " + (this.randomMarginPercent - randY) + "% " + (this.randomMarginPercent - randX) + "%";
				node["data-x"] = j;
				node["data-y"] = i; 

				node.addEventListener("click", function(e){handlePopcornClick(e.target["data-x"], e.target["data-y"])});
				this.textArray[i][j] = node;
				container.appendChild(node);
			}
		}

		var that = this;

		setInterval(function() {
			that.add();
		}, 1000);
	}

	add() {
		var toBeAdded = getRandomInt(2);
		for (var i = 0; i < toBeAdded; i++) {
			var xindex = getRandomInt(7);
			var yindex = getRandomInt(7);

			var node = this.textArray[yindex][xindex];
			node.innerHTML = '*';
			node.style.cursor = "pointer";
		}
	}

	handleClick(x, y) {
		var node = this.textArray[y][x];
		node.innerHTML = " ";
		node.style.cursor = "default";

		addPopcornsOwned();
	}
}