// Page Title
function GetTitle() {
    var title = document.title;
    return title;
}
// H1, H2 - Background Change
function Hbackground_color() {
    var h1 = document.querySelectorAll('h1, h1 span'),
        h2 = document.querySelectorAll('h2, h2 span');

    for (var i=0; i < h1.length; i++) {
        h1[i].setAttribute("style", "color:#fff; background-color:#173e43");
    }
    for (var i=0; i < h2.length; i++) {
        h2[i].setAttribute("style", "color:#fff; background-color:#3fb0ac");
    }

}

// Send Message to DOM 
chrome.extension.sendMessage({
    action: "result",
    title: GetTitle() // Title
});

// Change H background after click button
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            Hbackground_color();
        }
    }
);

