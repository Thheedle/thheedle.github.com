var colors = ["red", "blue", "green", "pink", "cyan", "orange", "purple", "limegreen"];

function cssHelper() {
	var body = document.getElementsByTagName("BODY")[0];
	body.style.background = "red";
	for (var i = 0; i < body.children.length; i++) {
		cssHelperFunction(body.children[i], 1);
	}
}

function cssHelperFunction(elm, num) {
	elm.style.background = colors[num % 8];
	if (elm.children.length > 0) {
		for (var i = 0; i < elm.children.length; i++) {
			cssHelperFunction(elm.children[i], num + 1);
		}
	}
}