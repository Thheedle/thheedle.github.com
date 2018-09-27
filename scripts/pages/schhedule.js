
const startPage = document.getElementById("startPage");
const mainPage = document.getElementById("mainPage");

function startSchhedule() {
startPage.innerHTML = "";
mainPage.innerHTML = "<canvas data-processing-sources=\"./scripts/processing/tutorial.pde\"></canvas>";
}