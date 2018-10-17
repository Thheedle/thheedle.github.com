	if (screen.width <= 699) {
		let loc = window.location;
		let newURL = loc.protocol + "//m." + loc.host + loc.pathname;
		window.location.href = newURL
		console.log(window.location);
	}
