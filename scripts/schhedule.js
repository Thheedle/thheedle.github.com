function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

loadScript("scripts/fadeScript.js");
loadScript("scripts/hlinkScript.js");

/*
This is where page-specific JAVASCRIPT will go

Copy and rename this file to match the html and js files

For example:

example.html
example.css
example.js       <--- this one
*/