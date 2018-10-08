checkRedirectToMobile() {
	if (screen.width <= 699) {
	let loc = window.location;
	let newURL = loc.protocol + "//m." + loc.host + loc.pathname;
	window.location.href = newURL
	console.log(window.location);
}


function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}


checkRedirectToMobile();
loadScript("scripts/js/fadeScript.js");
loadScript("scripts/js/cssHelperScript.js");
loadScript("scripts/js/hlinkScript.js");