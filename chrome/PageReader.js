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
        return '';
    }
}
// H1, H2 - Background Change
function Hbackground_color() {
    // <H[1-5]>+\s=+\s 
    // var regularH = /<H[1-5]>+\s=+\s/g;

    var h1 = document.querySelectorAll('h1, h1 span, h1 a'),
        h2 = document.querySelectorAll('h2, h2 span, h2 a'),
        h3 = document.querySelectorAll('h3, h3 span, h3 a'),
        h4 = document.querySelectorAll('h4, h4 span, h4 a'),
        h5 = document.querySelectorAll('h5, h5 span, h5 a'),
        h6 = document.querySelectorAll('h6, h6 span, h6 a');

    for (var i=0; i < h1.length; i++) {
        var h_title = h1[i].innerHTML;
        h_title = h_title.replace(/H[1-5]+\s=+\s/g, "" );
        h_title = 'H1 = ' + h_title;
        h1[i].innerHTML = h_title;
        h1[i].setAttribute("style", "color:#fff; background-color:#00e7b9;");
    }
    for (var i=0; i < h2.length; i++) {
        var h_title = h2[i].innerHTML;
        h_title = h_title.replace(/H[1-5]+\s=+\s/g, "" );
        h_title = 'H2 = ' + h_title;
        h2[i].innerHTML = h_title;
        h2[i].setAttribute("style", "color:#fff; background-color:#58b5a2;");
    }
    for (var i=0; i < h3.length; i++) {
        var h_title = h3[i].innerHTML;
        h_title = h_title.replace(/H[1-5]+\s=+\s/g, "" );
        h_title = 'H3 = ' + h_title;
        h3[i].innerHTML = h_title;
        h3[i].setAttribute("style", "color:#000; background-color:#f3dfa2;");
    }
    for (var i=0; i < h4.length; i++) {
        var h_title = h4[i].innerHTML;
        h_title = h_title.replace(/H[1-5]+\s=+\s/g, "" );
        h_title = 'H4 = ' + h_title;
        h4[i].innerHTML = h_title;
        h4[i].setAttribute("style", "color:#fff; background-color:#fff7d1;");
    }
    for (var i=0; i < h5.length; i++) {
        var h_title = h5[i].innerHTML;
        h_title = h_title.replace(/H[1-5]+\s=+\s/g, "" );
        h_title = 'H5 = ' + h_title;
        h5[i].innerHTML = h_title;
        h5[i].setAttribute("style", "color:#fff; background-color:#7ebdc2;");
    }
    for (var i=0; i < h6.length; i++) {
        var h_title = h6[i].innerHTML;
        h_title = h_title.replace(/H[1-5]+\s=+\s/g, "" );
        h_title = 'H6 = ' + h_title;
        h6[i].innerHTML = h_title;
        h6[i].setAttribute("style", "color:#fff; background-color:#7ebdc2;");
    }
}

function OpengraphMeta() {
    var opengraph = {};
    // Title
    var title = document.querySelector('meta[property="og:title"]');
    if (title) {
        var title__content = title.getAttribute('content');
        opengraph.title = title__content;
    }else{
        opengraph.title = "";
    }
    // Description
    var description = document.querySelector('meta[property="og:description"]');
    if (description) {
        var description__content = description.getAttribute('content');
        opengraph.description = description__content; 
    }else{
        opengraph.description = "";
    }
    // Type
    var type = document.querySelector('meta[property="og:type"]');
    if (type) {
        var type__content = type.getAttribute('content');
        opengraph.type = type__content; 
    }else{
        opengraph.type = "";
    }
    // Image
    var image = document.querySelector('meta[property="og:image"]');
    if (image) {
        var image__content = image.getAttribute('content');
        opengraph.image = image__content; 
    }else{
        opengraph.image = "";
    }

    return opengraph;
}

function TwitterMeta() {
    var twitterMeta = {};
    // Title
    var title = document.querySelector('meta[name="twitter:title"]');
    if (title) {
        var title__content = title.getAttribute('content');
        twitterMeta.title = title__content;
    }else{
        twitterMeta.title = "";
    }
    // Description
    var description = document.querySelector('meta[name="twitter:description"]');
    if (description) {
        var description__content = description.getAttribute('content');
        twitterMeta.description = description__content; 
    }else{
        twitterMeta.description = "";
    }
    // Image
    var image = document.querySelector('meta[name="twitter:image"]');
    if (image) {
        var image__content = image.getAttribute('content');
        twitterMeta.image = image__content; 
    }else{
         twitterMeta.image = "";
    }

    return twitterMeta;
}

function getImageInfo() {
    var basic_arr = [];
    var images = document.querySelectorAll('img')
    for(var i=0;i<images.length;i++){
        var sec_arr = [];
        // Alt Image
        var alt_image = images[i].alt;
        sec_arr.push(alt_image);
        // Url
        var url_images = images[i].currentSrc;
        sec_arr.push(url_images);

        basic_arr.push(sec_arr);
    }
    return basic_arr;
}

// Send Message to DOM 
chrome.extension.sendMessage({
    action: "result",
    title: GetTitle(), 
    description: GetDescription(), 
    opengraph: OpengraphMeta(), 
    twitter: TwitterMeta(),
    imagesinfo: getImageInfo()
});

// Change H background after click button
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            Hbackground_color();
        }
    }
);

