'use strict'

function renderGallery(imgs = getImgs()) {
  var strHtmls = imgs.map(
    (img) => `
                <div class="img-container"><img id="${img.id}" onclick="onImgSelected(this)" class="gallery-item img"
                        src="${img.url}" alt="">
                </div>
                `
  )
  document.querySelector('.gallery-items').innerHTML = strHtmls.join('')
}
function onMore() {
  document.querySelector('.gallery-filter').classList.toggle('more')
  document.querySelector('.categories').classList.toggle('more')
}

function onSortGalleryBy(val) {
  sortGalleryBy(val)
}

function onImgSelected(img) {
  imgSelected(img)
}

function onRandomeMeme() {
  randomeMeme()
}

function renderSavedMeme() {
  var strHtmls = ''
  gSavedMemes.forEach((meme, idx) => {
    strHtmls += `<div class="img-container"><img onclick="getMemeById(${idx})" id="${idx}" src="${meme.imgDataUrl}">
                </div>
                `
  })
  document.querySelector('.saved-memes').innerHTML = strHtmls
}
