'use strict'

function renderGallery(imgs = getImgs()) {
  // var imgs
  console.log(imgs)
  var strHtmls = imgs.map(
    (img) => `
                <div class="img-container"><img id="${img.id}" onclick="onImgSelected(this)" class="gallery-item img"
                        src="${img.url}" alt="">
                </div>
                `
  )
  document.querySelector('.gallery-items').innerHTML = strHtmls.join('')
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
  console.log('rendering saved image')
  console.log(gSavedMemes[0].img)

  var strHtmls = ''
  gSavedMemes.forEach((meme, idx) => {
    strHtmls += `<div class="img-container"><img onclick="getMemeById(${idx})" id="${meme.img.id}" src="${meme.imgDataUrl}">
                </div>
                `
  })
  // (img) => `
  //             <div class="img-container"><img id="${img.img.id}" onclick="onImgSelected(this)" class="gallery-item img"
  //                     src="${img.img.url}" alt="">
  //             </div>
  //             `
  document.querySelector('.saved-memes').innerHTML = strHtmls
}
