var logo = document.getElementById("logoimg");
var bars = document.getElementsByClassName("bar");
var nav = document.getElementById("nav");

var rev = document.getElementsByClassName("revolution")[0];

var hlinks = document.getElementsByClassName("hlink");

for (var i = 0; i < hlinks.length; i++) {
	hlinks[i].addEventListener("mouseover", overButton);
	hlinks[i].addEventListener("mouseout", offButton);
}

function overButton() {
	this.style.textShadow = "0 0 10px #888888, 0 0 10px #AAAAAA";
}

function offButton() {
	this.style.textShadow = "0 0 2px #AAAAAA";
}

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

function fadeInLate(elm) {
 	setTimeout(function() { fadeIn(elm)}, 1500);
}

fadeIn(logo);
fadeIn(nav);
fadeInArray(bars);

fadeInLate(rev);