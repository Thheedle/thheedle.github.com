var fadeElements = document.getElementsByClassName("fadeElement");
var lateFadeElements = document.getElementsByClassName("lateFadeElement");

function fadeIn(elm) {
	var op = 0;

	var timer = setInterval(function () {
		if (op >= 1) {
			elm.style.opacity = 1;
			clearInterval(timer);
		}
		elm.style.opacity = op;
		op = op + .05;
	}, 60);
}

function fadeInArray(arr) {
 	var le = arr.length;
 	for (var i = 0; i < le; i++) {
 		fadeIn(arr[i]);
 	}
}

function fadeInLate(arr) {
 	setTimeout(function() { fadeInArray(arr)}, 1500);
}

fadeInArray(fadeElements);
fadeInLate(lateFadeElements)
