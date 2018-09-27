var hlinks = document.getElementsByClassName("hlink");

for (var i = 0; i < hlinks.length; i++) {
	hlinks[i].addEventListener("mouseover", overButton);
	hlinks[i].addEventListener("mouseout", offButton);
	if( hlinks[i].classList.contains("activeHlink")) {
		hlinks[i].style.textShadow = "0 0 10px #888888, 0 0 10px #AAAAAA";
	}
}

function overButton() {
	if( this.classList.contains("activeHlink")) {
		this.style.textShadow = "0 0 2px #AAAAAA";

	} else {
		this.style.textShadow = "0 0 10px #888888, 0 0 10px #AAAAAA";
	}
}

function offButton() {
	if( this.classList.contains("activeHlink")) {
		this.style.textShadow = "0 0 10px #888888, 0 0 10px #AAAAAA";
	} else {
		this.style.textShadow = "0 0 2px #AAAAAA";
	}
	
	
}