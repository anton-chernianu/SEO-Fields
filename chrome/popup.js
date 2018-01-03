//console
function consoleS(item){
    var consoleS = document.querySelector('.console');
    consoleS.innerHTML = item;
}


// Send Message After Click
function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
   });
}
// Copy text from Input-Textarea
function copyInputLeftClick(){

  var inputCopy = document.querySelectorAll('.copy-text');
  inputCopy.forEach(item => {
    item.addEventListener('click', (event)=>{

      // var divInputCopy = document.querySelector('.input-copy');
      // if (divInputCopy) {
      //   divInputCopy.parentNode.removeChild(divInputCopy);
      // }

      event.target.select();
      document.execCommand('copy');


      // event.target.insertAdjacentHTML('afterend', '<div class="input-copy">copy</div>');
    })
  });
}
// Show Copy Text After Click Input
function copySpanShow(){
    var copyText = document.querySelectorAll('.copy-text');
    var copy = document.querySelectorAll('.copy');

    for (var i = 0; i < copyText.length; i++){
        copyText[i].addEventListener("click", function(){
            for(var a = 0; a < copy.length; a++) {
                copy[a].setAttribute('style', 'opacity: 0;');
            }
            var copyText_next = this.nextSibling;
            copyText_next.setAttribute('style', 'opacity: 1;');
        });
    }
}

// Title length
function titlelength() {
    var title = document.querySelector('.page-title');
    var title_value = title.value;
    var title_length = title_value.length;
    var lengthSpan = document.querySelector('.lenght-title');
    lengthSpan.innerHTML = title_length;

    if (title_length < 50) {
        lengthSpan.setAttribute('style', 'color: #b9b608;');
    } else if (title_length > 50 && title_length < 70) {
        lengthSpan.setAttribute('style', 'color: green;');
    } else {
        lengthSpan.setAttribute('style', 'color: red;');
    }
}

// Text Length
function textlength(selector, span, min, max) {
    var getText = document.querySelector(selector).value;
    var textLength = getText.length;
    var getSpan = document.querySelector(span);
    getSpan.innerHTML = textLength;

    if (textLength < min) {
        getSpan.setAttribute('style', 'color: #b9b608;');
    } else if (textLength >= min && textLength <= max) {
        getSpan.setAttribute('style', 'color: green;');
    } else {
        getSpan.setAttribute('style', 'color: red;');
    }
}
// Toogle Plus Click
function openPlus() {
    var plusItem = document.querySelectorAll('.plus');
    for (var i = 0; i < plusItem.length; i++){
        plusItem[i].addEventListener('click',function(){
        var dataName = this.getAttribute('data-link');
        var elementId = '#'+dataName;
        var getElementId = document.querySelector(elementId);
        var plus = document.querySelector('.plus[data-link="'+dataName+'"]');

        if(getElementId.classList.contains("active")) {
            getElementId.classList.remove("active");
            plus.classList.remove("plus--rotate");
        } 
         else {
            getElementId.classList.add("active");
            plus.classList.add("plus--rotate");
        }

        });
    }
}
// OpenGraph Background Image
function openGraphImage() {
    var opengraphImage_link = document.querySelector('input[name="og-image"]').value;
    var opengraphImage_length = opengraphImage_link.length;
    var backgroundDiv = document.querySelector('.opengraph__image');
    if (opengraphImage_length > 0) {
        backgroundDiv.setAttribute("style","background-image:url('"+opengraphImage_link+"')");
    }else{
        backgroundDiv.style = "display:none;";
    }
}
// OpenGraph Validation
function openGraphVal() {
    var fields = document.querySelectorAll('[data-og="field"]');
    var length = fields.length;
    var countSpan = document.querySelector('.block__val--og .count');
    var count = 0;
    [].forEach.call(fields,function(field){
        var field_val = field.value;
        var field_val_len = field_val.length;
        if (field_val_len > 0) {
            count = count + 1;
            countSpan.innerHTML = count;
        }else{
            countSpan.innerHTML = count;
        }
    });
}
// Twitter Validation
function twitterVal() {
    var fields = document.querySelectorAll('[data-twitter="field"]');
    var length = fields.length;
    var countSpan = document.querySelector('.block__val--twitter .count');
    var count = 0;
    [].forEach.call(fields,function(field){
        var field_val = field.value;
        var field_val_len = field_val.length;
        if (field_val_len > 0) {
            count = count + 1;
            countSpan.innerHTML = count;
        }else{
            countSpan.innerHTML = count;
        }
    });
}

function createNewTab(){
    document.querySelector('.link').addEventListener('click', function(){

        chrome.tabs.getSelected(null,function(tab) {
            var tablink = tab.url;
            alert(tablink);
            
            var newURL = "http://google.com";

            chrome.tabs.create({ url: newURL });


        });

    });
}

// // Toggle Click
// function toggleAddStyle(){
//     var block = document.querySelector('.test');

//     if (block.style.display === "none") {
//         block.style.display = "block";
//     } else {
//         block.style.display = "none";
//     }
// }

function onWindowLoad() {
    // execute script on page
    chrome.tabs.executeScript(null, { file: "PageReader.js" });

}

function onWindowClick() {
    window.close();
}

document.addEventListener("DOMContentLoaded", function() {
    chrome.extension.onMessage.addListener(function (request, sender) {
        if (request.action == 'result') {

            // Get Title
            var title = document.querySelector('input[name="page-title"]');
            title.value = request.title;
            // Title Validation Lenght
            textlength('input[name="page-title"]','.lenght-title', 50, 70);
            // Description
            var description = document.querySelector('.page-description');
            description.innerHTML = request.description;
            // Description Validation Lenght
            textlength('.page-description','.lenght-description', 120, 160);

            // Get OpenGraph Meta
            var opengraph = request.opengraph;
            // OpenGraph Type
            var opengraph__type = document.querySelector('input[name="og-type"]');
            opengraph__type.value = opengraph['type'];
            // OpenGraph Title
            var opengraph__title = document.querySelector('input[name="og-title"]');
            opengraph__title.value = opengraph['title'];
            // OpenGraph Description
            var opengraph__description = document.querySelector('.og-description');
            opengraph__description.innerHTML = opengraph['description'];
            // OpenGraph Image
            var opengraph__image = document.querySelector('input[name="og-image"]');
            opengraph__image.value = opengraph['image'];

            // Get Twitter Meta
            var twitter = request.twitter;
            // Twitter Title
            var twitter__title = document.querySelector('input[name="twitter-title"]');
            twitter__title.value = twitter.title;
            // Twitter Description
            var twitter__description = document.querySelector('.twitter-description');
            twitter__description.innerHTML = twitter.description;
            // Twitter Image
            var twitter__image = document.querySelector('input[name="twitter-image"]');
            twitter__image.value = twitter.image;
            
            // Images Info
            var imagesInfo = request.imagesinfo;
            var mainImages = document.querySelector('#alt-images');
            // console.log(imagesInfo);
            for(var i=0; i<imagesInfo.length; i++){
                var images = document.createElement('div');
                images.classList.add('images');
                mainImages.appendChild(images);
                images.innerHTML = `
                    <div class="images__img">
                        <div class="images__bg" style="background-image: url('`+imagesInfo[i][1]+`');"></div>
                    </div>
                    <div class="images__inputs">
                        <div class="images__input">
                            <input type="text" class="copy-text" type="text" value="`+imagesInfo[i][1]+`" />
                            <span class="copy">Copy</span>
                        </div>
                        <div class="images__input">
                            <input type="text" class="copy-text" type="text" value="`+imagesInfo[i][0]+`" />
                            <span class="copy">Copy</span>
                        </div>
                    </div>
                `;

                // // create (.images)
                // var images = document.createElement('div');
                // images.classList.add('images');
                // mainImages.appendChild(images);
                // // create (.images__img)
                // var images__img = document.createElement('div');
                // images__img.classList.add('images__img');


            }

            // Send Message After Click
            document.getElementById("clickbtn").addEventListener("click", popup);

            copyInputLeftClick();
            copySpanShow();
            openPlus();
            openGraphImage();
            openGraphVal();
            twitterVal();
            createNewTab();

        }    
    });






});




// window events
window.onload = onWindowLoad;
// window.ondblclick = onWindowClick;

