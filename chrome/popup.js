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

document.addEventListener("DOMContentLoaded", function() {
    // Send Message After Click
    document.getElementById("clickbtn").addEventListener("click", popup);

    // Function Copy Text From Input-Textarea
    copyInputLeftClick();
    copySpanShow();

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

