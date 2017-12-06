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
  console.log(inputCopy);
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

document.addEventListener("DOMContentLoaded", function() {
    // Send Message After Click
    document.getElementById("clickbtn").addEventListener("click", popup);

    // Function Copy Text From Input-Textarea
    copyInputLeftClick();

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

