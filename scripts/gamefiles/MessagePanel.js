class MessagePanel {
	constructor(panelDivs) {
		this.randomMessages = ['Ello Yewchewb', 'Havagu Day', 'You find a Sami. She is bald.', 'Thotticus approaches you...', 'Bald Sami is Bald', 'Chandram Bramba Chandram Bramba Bendram'];

		this.numDivs = panelDivs.length;
		this.mostRecentMessages = [];
		for (var i = 0; i < this.numDivs; i++) {
			this.mostRecentMessages.push(" ");
		}
		this.mostRecentDivs = panelDivs;
		this.messageQueue = [];
		this.isMoving = false;
		
		this.spacing = 1.3;
		this.defaultSpeed = 10;
		this.queueSpeed = 40;

		for (var i = 0; i < this.numDivs; i++) {
			this.mostRecentDivs[i].style.top = i * this.spacing + "em";
			this.mostRecentMessages[i] = " ";
		}
	}

	addMessage(text, speed = this.defaultSpeed) {
		this.messageQueue.push(text);
		if (!this.isMoving) {
			this.pushMessageFromQueue(false, speed);
		}
	}

	addRandomMessage(speed = this.defaultSpeed) {
		var yeet = getRandomInt(6);
		this.addMessage(this.randomMessages[yeet]);
	}

	pushMessageFromQueue(calledRecursively, speed = this.defaultSpeed) {
		this.isMoving = true;
		if (calledRecursively) {
			this.updateRecentMessages(speed);
		} else {
			this.updateRecentMessages(speed);
		}
		for (var i = this.numDivs - 1; i > 0; i--) {
			this.mostRecentMessages[i] = this.mostRecentMessages[i-1];
		}
		this.mostRecentMessages[0] = this.messageQueue.shift();
	}

	updateRecentMessages(speed) {
		var that = this;

		for (var i = 0; i < this.numDivs; i++) {
			(function(index) {
				let originalPos = parseFloat(that.mostRecentDivs[index].style.top);
				let pos = 0;
				let timer = setInterval(function() {
					if (pos >= that.spacing) {
						clearInterval(timer);
						if (index == 0) {
							that.mostRecentDivs[index].style.opacity = 0;
							fadeIn(that.mostRecentDivs[index]);
							that.mostRecentDivs[index].style.top = originalPos + "em";
						}
						if (index == that.numDivs - 1) {
							that.mostRecentDivs[index].style.opacity = 1;
							fadeOut(that.mostRecentDivs[index]);
							that.isMoving = false;
							that.mostRecentDivs[index].style.top = originalPos + "em";
							that.mostRecentDivs[index].innerHTML = that.mostRecentMessages[index];
							if (that.messageQueue.length > 0) {
								that.pushMessageFromQueue(true, that.queueSpeed);
							}
						} else {
							that.mostRecentDivs[index].style.top = originalPos + "em";
							that.mostRecentDivs[index].innerHTML = that.mostRecentMessages[index];
						}
					} else {
						that.mostRecentDivs[index].style.top = originalPos + pos + "em";
						pos = pos + .1 * that.spacing;
					}
				}, speed);
			})(i);
		}
	}
}