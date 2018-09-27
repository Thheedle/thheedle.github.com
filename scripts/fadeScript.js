let fadeElements = document.getElementsByClassName("fadeElement");

function fadeIn(elm) {
	let op = 0;

	let timer = setInterval(function () {
		if (op >= 1) {
			elm.style.opacity = 1;
			clearInterval(timer);
		}
		elm.style.opacity = op;
		op = op + .05;
	}, 60);
}

function fadeInArray(arr) {
 	let le = arr.length;
 	for (let i = 0; i < le; i++) {
 		let elm = arr[i];
 		console.log(elm.getAttribute("data-fadeTime"));
 		setTimeout(function() {fadeIn(elm)}, elm.getAttribute("data-fadeTime")*1000);
 	}
}

function fadeInLate(arr) {
 	setTimeout(function() { fadeInArray(arr)}, 1500);
}

fadeInArray(fadeElements);
