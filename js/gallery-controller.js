'use strict'

function renderGallery() {
  var imgs = getImgs()
  var strHtmls = imgs.map(
    (img) => `
                <div class="img-container"><img onclick="onImgSelected(this)" class="gallery-item img"
                        src="${img.url}" alt="">
                </div>
                `
  )
  document.querySelector('.gallery-items').innerHTML = strHtmls.join('')
}

function onImgSelected(img) {
  imgSelected(img)
}
