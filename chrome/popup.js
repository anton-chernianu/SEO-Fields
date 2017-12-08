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
    console.log(textLength);
    var getSpan = document.querySelector(span);
    getSpan.innerHTML = textLength;

    if (textLength < min) {
        getSpan.setAttribute('style', 'color: #b9b608;');
    } else if (textLength >= min && textLength < max) {
        getSpan.setAttribute('style', 'color: green;');
    } else {
        getSpan.setAttribute('style', 'color: red;');
    }
}

function openPlus() {
    document.querySelector('.plus').addEventListener('click',function(){
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
            // Title
            var titleInput = document.querySelector('input[name="page-title"]');
            titleInput.value = request.title;
            // Title Validation Lenght
            textlength('input[name="page-title"]','.lenght-title', 50, 70);
            // Description
            var descriptionTextarea = document.querySelector('.page-description');
            descriptionTextarea.innerHTML = request.description;
            // Description Validation Lenght
            textlength('.page-description','.lenght-description', 120, 160);
        }    
    });

    // Send Message After Click
    document.getElementById("clickbtn").addEventListener("click", popup);

    // Function Copy Text From Input-Textarea
    copyInputLeftClick();
    copySpanShow();
    openPlus();
});

// window events
window.onload = onWindowLoad;
// window.ondblclick = onWindowClick;

