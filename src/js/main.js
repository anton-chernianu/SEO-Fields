document.querySelector('.runScript').onclick = function(){
  
  removeOldPopUp();
  createCss();
  createPopUp();
  getTitleInfo();
  getDescInfo();
  h1highlight();
  TextLength();

  copyInputLeftClick();
};


function createCss() {

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  var css = `
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
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
  .seobookm__container {
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
  .seobookm__text {
    padding: 5px 0;
  }
  .seobookm__text span {
    font-weight: 700;
  }
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
    // console.log('<style> have class');
  }else {
    head.appendChild(style);
  }

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

function createPopUp() {
  // var body = document.body;

  var seobookm = document.createElement('div');
  seobookm.className = 'seobookm';
  document.body.appendChild(seobookm);

  seobookm.innerHTML = `
    <div class="seobookm__container">
      <div class="close">Close</div>
      <p class="seobookm__title">Title:</p><br>
      <p class="seobookm__text">With Spaces: <span id="titleWithSpace"></span>/70 WithOut Spaces: <span id="titleWithOutSpace"></span></p>
      <input name="title" type="text" id="seobookm__title" class="seobookm__copy" value=""/>
      <p class="seobookm__title">Description:</p><br>
      <p class="seobookm__text" id="descLen">With Spaces: <span id="DescWithSpace"></span>/160 WithOut Spaces: <span id="DescWithOutSpace"></span></p>
      <textarea name="description" class="seobookm__copy description-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam cupiditate excepturi maxime! Nam voluptate, expedita ab alias, aut facilis id repellat vel placeat quae dignissimos consequuntur non! Dolorum, recusandae quis.</textarea>
    </div>
  `;

// Close Button Setting
  var closeBtn = document.querySelector('.close');
  if(closeBtn) {
    closeBtn.onclick = function(){
      document.querySelector('.seobookm').setAttribute("style", "visibility: hidden; opacity: 0;");
    }
  }

}

function getTitleInfo() {

  // Title
  var title = document.title;
  var titleInput = document.querySelector('input[name="title"]');
  titleInput.value = title;

  // Title Length
  var titleLength = titleInput.value.length;
  var spanTitleLength = document.querySelector('#titleWithSpace');
  spanTitleLength.innerHTML = titleLength;

  // Title With no Space
  var titleDeleteSpace = title.replace(/\s/g, '');
  var titleDeleteSpaceLenght = titleDeleteSpace.length;
  document.querySelector('#titleWithOutSpace').innerHTML = titleDeleteSpaceLenght;

  // Validation Title Length
  if (titleLength < 50) {
    spanTitleLength.setAttribute('style', 'color: #b9b608;');
  } else if (titleLength > 50 && titleLength < 70) {
    spanTitleLength.setAttribute('style', 'color: green;');
  } else {
    spanTitleLength.setAttribute('style', 'color: red;');
  }

}

function getDescInfo() {
  // Description
  var description = document.querySelector('meta[name="description"]').getAttribute('content');
  document.querySelector('.description-text').innerHTML = description;
  // Description Length With Spaces
  var description__lengSpaces = description.length;
  var spanDescLenght = document.querySelector('#DescWithSpace');
  // Description Length With Out Spaces
  var description__DellSpaces = description.replace(/\s/g, '');
  var description__lengNoSpaces = description__DellSpaces.length;

  document.querySelector('#DescWithSpace').innerHTML = description__lengSpaces;
  document.querySelector('#DescWithOutSpace').innerHTML = description__lengNoSpaces;

  if (description__lengSpaces < 140) {
    spanDescLenght.setAttribute('style', 'color: #b9b608;');
  } else if (description__lengSpaces > 140 && description__lengSpaces < 160) {
    spanDescLenght.setAttribute('style', 'color: green;');
  } else {
    spanDescLenght.setAttribute('style', 'color: red;');
  }

}

function h1highlight() {
  var h1 = document.querySelectorAll('h1'),
      h2 = document.querySelectorAll('h2');

  for (var i=0; i < h1.length; i++) {
    h1[i].setAttribute("style", "color:#fff; background-color:#173e43");
  }
  for (var i=0; i < h2.length; i++) {
    h2[i].setAttribute("style", "color:#fff; background-color:#3fb0ac");
  }

  var h1__lenght = h1.length;
  var h2__lenght = h2.length;
  // console.log('h1 = ' + h1__lenght);
  // console.log('h2 = ' + h2__lenght);
}

function copyInputLeftClick(){

  var inputCopy = document.querySelectorAll('.seobookm__copy');
  inputCopy.forEach(item => {
    item.addEventListener('click', (event)=>{

      var divInputCopy = document.querySelector('.input-copy');
      if (divInputCopy) {
        divInputCopy.parentNode.removeChild(divInputCopy);
      }

      event.target.select();
      document.execCommand('copy');

      event.target.insertAdjacentHTML('afterend', '<div class="input-copy">copy</div>');
    })
  });

}

function TextLength() {

  var result = [];
  for(var i=1; i<=6; i++) {
    var h__title = document.querySelectorAll('h' + i);

    for (var a=0; a<h__title.length; a++) {
      result.push(h__title[a].textContent);
    }

  }

  var arr__lenght = [];
  result.forEach(function(item, i, arr) {
    var hlength = item.length;
    arr__lenght.push(hlength);
  });

  console.log('array h1 = ' + arr__lenght);

  var sum__H1lenght = 0;
  for (var i = 0; i < arr__lenght.length; i++) {
    sum__H1lenght = sum__H1lenght + arr__lenght[i];
  }
  console.log(sum__H1lenght);


}

document.querySelector('.btnclick').onclick = function(){
  document.querySelector('.seobookm').setAttribute("style", "visibility: visible; opacity: 1;");
}