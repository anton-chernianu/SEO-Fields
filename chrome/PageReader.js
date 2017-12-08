// Page Title
function GetTitle() {
    var title = document.title;
    return title;
}
// Page Description
function GetDescription() {
    var description = document.querySelector('meta[name="description"]');
    if (description) {
        var description = document.querySelector('meta[name="description"]').getAttribute('content');
        return description;
    } else {
        return 'No Description';
    }
}
// H1, H2 - Background Change
function Hbackground_color() {
    var h1 = document.querySelectorAll('h1, h1 span, h1 a'),
        h2 = document.querySelectorAll('h2, h2 span, h2 a'),
        h3 = document.querySelectorAll('h3, h3 span, h3 a'),
        h4 = document.querySelectorAll('h4, h4 span, h4 a'),
        h5 = document.querySelectorAll('h5, h5 span, h5 a'),
        h6 = document.querySelectorAll('h6, h6 span, h6 a');

    for (var i=0; i < h1.length; i++) {
        var h_title = h1[i].innerHTML;
        h_title = 'H1 = ' + h_title;
        h1[i].innerHTML = h_title;
        h1[i].setAttribute("style", "color:#fff; background-color:#231f20");
    }
    for (var i=0; i < h2.length; i++) {
        var h_title = h2[i].innerHTML;
        h_title = 'H2 = ' + h_title;
        h2[i].innerHTML = h_title;
        h2[i].setAttribute("style", "color:#fff; background-color:#bb4430");
    }
    for (var i=0; i < h3.length; i++) {
        var h_title = h3[i].innerHTML;
        h_title = 'H3 = ' + h_title;
        h3[i].innerHTML = h_title;
        h3[i].setAttribute("style", "color:#000; background-color:#f3dfa2");
    }
    for (var i=0; i < h4.length; i++) {
        var h_title = h4[i].innerHTML;
        h_title = 'H4 = ' + h_title;
        h4[i].innerHTML = h_title;
        h4[i].setAttribute("style", "color:#fff; background-color:#fff7d1");
    }
    for (var i=0; i < h5.length; i++) {
        var h_title = h5[i].innerHTML;
        h_title = 'H5 = ' + h_title;
        h5[i].innerHTML = h_title;
        h5[i].setAttribute("style", "color:#fff; background-color:#7ebdc2");
    }
    for (var i=0; i < h6.length; i++) {
        var h_title = h6[i].innerHTML;
        h_title = 'H6 = ' + h_title;
        h6[i].innerHTML = h_title;
        h6[i].setAttribute("style", "color:#fff; background-color:#7ebdc2");
    }
}

// Send Message to DOM 
chrome.extension.sendMessage({
    action: "result",
    title: GetTitle(), // Title
    description: GetDescription() // Description
});

// Change H background after click button
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            Hbackground_color();
        }
    }
);

