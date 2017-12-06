function GetTitle() {
    var title = document.title;
    return title;
}


function h1highlight() {
    var h1 = document.querySelectorAll('h1, h1 span'),
        h2 = document.querySelectorAll('h2, h2 span');

    for (var i=0; i < h1.length; i++) {
        h1[i].setAttribute("style", "color:#fff; background-color:#173e43");
    }
    for (var i=0; i < h2.length; i++) {
        h2[i].setAttribute("style", "color:#fff; background-color:#3fb0ac");
    }

}

chrome.extension.sendMessage({
    action: "result",
    title: GetTitle()
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            h1highlight();
        }
    }
);

