function fadeIn(elm) {
	let op = 0;

	let timer = setInterval(function () {
		if (op >= 1) {
			elm.style.opacity = 1;
			clearInterval(timer);
		}
		elm.style.opacity = op;
		op = op + .05;
	}, 7);
}

function fadeOut(elm) {
	let op = 1;

	let timer = setInterval(function () {
		if (op <= 0) {
			elm.style.opacity = 0;
			clearInterval(timer);
		}
		elm.style.opacity = op;
		op = op - .05;
	}, 10);
}