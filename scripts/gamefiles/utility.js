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