document.querySelector('.runScript').onclick = function(){
  
  // removeOldPopUp();
  createCss();
  // createPopUp();

};


function createCss() {

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  var css = `
  .seobookm {
    font-family: 'Open Sans', sans-serif;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    -webkit-transition: opacity 500ms;
    transition: opacity 500ms;
    visibility: visible;
    opacity: 1;
  }
  .seobookm__content {
    margin: 70px auto;
    padding: 20px;
    background: #fff;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    width: 100%;
    max-width: 980px;
    position: relative;
    -webkit-transition: all 5s ease-in-out;
    transition: all 5s ease-in-out;
  }
  .seobookm__copy, .seobookm__text, .seobookm__title{
    display:inline-block
  }
  .seobookm__title{
    font-weight:700;
    margin-top:15px;
    margin-bottom:5px;
  }
  .seobookm__copy{
    font-family:'Open Sans',sans-serif;
    width:100%;
    padding:5px;
    resize:none
  }
  .close{text-align:right;cursor:pointer}
  `;

  style.type = 'text/css';
  style.className = 'seoStyle';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  var styleHaveClass = document.querySelector('.seoStyle');
  if (styleHaveClass) {
    console.log('<style> have class');
  }else {
    head.appendChild(style);
  }

}

function createPopUp() {
  var body = document.body;
  var mainSEOpopup = document.createElement('div');
  mainSEOpopup.className = 'seobookm';

  document.body.appendChild(mainSEOpopup);

}

function removeOldPopUp() {
  // Remove Popup Block
  var oldPopup = document.querySelector('.seobookm');
  if(oldPopup) {
    oldPopup.outerHTML = "";
    delete oldPopup;
    console.log('remove old pop-up');
  }
  
}

document.querySelector('.btn').onclick = function(){



// Create Popup
  var body = document.body;
  var d = document.createElement('div');

  d.className='seobookm';
  d.setAttribute("style", "position:fixed;top:0;left:0;width:100%;z-index:999;background-color:#fff;min-height:100px;border:2px solid #000;padding:5px;box-sizing:border-box;")
  document.body.appendChild(d);
  
//   h1, h2
  var h1 = document.querySelectorAll('h1'),
      h2 = document.querySelectorAll('h2'),
      seobookm = document.querySelector('.seobookm');
  
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
  
  seobookm.innerHTML = 
    "Title: " + title + "<br>" +
    "Description: " + meta;

};


document.querySelector('.btnclick').onclick = function(){
  document.querySelector('.seobookm').setAttribute("style", "visibility: visible; opacity: 1;")
};

document.querySelector('.close').onclick = function(){
  document.querySelector('.seobookm').setAttribute("style", "visibility: hidden; opacity: 0;")
};



var inputCopy = document.querySelectorAll('.seobookm__copy');

inputCopy.forEach(item => {
  item.addEventListener('click', (event)=>{
    console.log(1);
    event.target.select();
    document.execCommand('copy');
  })
});