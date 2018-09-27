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