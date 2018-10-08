console.log("1");
if (screen.width <= 699) {
	let url = window.location.pathname;
	console.log(url);
	window.location.href = ("m." + url);
	
}


function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

loadScript("scripts/js/fadeScript.js");
loadScript("scripts/js/cssHelperScript.js");
loadScript("scripts/js/hlinkScript.js");