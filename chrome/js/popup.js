 function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
   });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("clickbtn").addEventListener("click", popup);
});

function onWindowLoad() {
    // execute script on page
    chrome.tabs.executeScript(null, { file: "PageReader.js" });

}

function onWindowClick() {
    window.close();
}

chrome.extension.onMessage.addListener(function (request, sender) {
    if (request.action == 'result') {
        document.getElementById('title').innerHTML = request.title;
    }    
});

// window events
window.onload = onWindowLoad;
// window.ondblclick = onWindowClick;

