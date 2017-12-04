function onExtensionClick(tab) {
	alert('hello');
}

chrome.browserAction.onClicked.addListener(onExtensionClick);