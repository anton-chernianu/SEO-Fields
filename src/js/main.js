document.querySelector('.btn').click(function(){

// Remove Popup Block
  var oldPopup = document.querySelector('.seobookm');
  if(oldPopup) {
    oldPopup.outerHTML = "";
    delete oldPopup;
    console.log('remove old pop-up');
  }

// Create Popup
  var body = document.body;
  var d = document.createElement('div');

  d.className='seobookm';
  d.setAttribute("style", "position:fixed;top:0;left:0;width:100%;z-index:999;background-color:#fff;min-height:100px;border:2px solid #000;padding:5px;box-sizing:border-box;")
  document.body.appendChild(d);
  
//   h1, h2
  var h1 = document.querySelectorAll('h1'),
      h2 = document.querySelectorAll('h2');

// info block
  var info = document.querySelector('.seobookm');
  
  for (var i=0; i < h1.length; i++) {
    h1[i].setAttribute("style", "color:#fff; background-color:#173e43");
  }
  for (var i=0; i < h2.length; i++) {
    h2[i].setAttribute("style", "color:#fff; background-color:#3fb0ac");
  }

// Get Title
  var title = document.title;
  
// Get Meta
  var meta = document.querySelector('meta[name="description"]').getAttribute('content');
  
  info.innerHTML = 
    "Title: " + title + "<br>" +
    "Description: " + meta;

});


document.querySelector('.btnclick').onclick = function(){
  document.querySelector('.seobookm').setAttribute("style", "visibility: visible; opacity: 1;")
};

document.querySelector('.close').onclick = function(){
  document.querySelector('.seobookm').setAttribute("style", "visibility: hidden; opacity: 0;")
};



var inputCopy = document.querySelectorAll('.copy-text');

inputCopy.forEach(item => {
  item.addEventListener('click', (event)=>{
    console.log(1);
    event.target.select();
    document.execCommand('copy');
  })
});