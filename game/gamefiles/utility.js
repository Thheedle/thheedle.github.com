function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function contains(array, elm) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == elm) {
			return true;
		}
	}
	return false;
}

function getRandomIntRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getStoneColor() {
	var rand = getRandomIntRange(0, 128);
	rand = rand.toString(16);
	if (rand.length == 1) {
		rand = "0" + rand;
	}
	return (("#" + rand) + rand) + rand;
}

function taxi(x1, y1, x2, y2) {
	return (Math.abs(x1-x2)+Math.abs(y1-y2));
}