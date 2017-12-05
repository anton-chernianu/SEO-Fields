function hlight() {
  var h1 = document.querySelectorAll('h1');

  for (var i=0; i < h1.length; i++) {
    h1[i].setAttribute("style", "color:#fff; background-color:#173e43");
  }
}

chrome.browserAction.onClicked.addListener(function(tab) {
	var h1 = document.querySelectorAll('h1');

	for (var i=0; i < h1.length; i++) {
		h1[i].setAttribute("style", "color:#fff; background-color:#173e43");
	}
	alert('1');
	hlight();
});
