'use strict'
var gSortImgBy = []
var gCurrKeyword
var gKeywordSearchCountMap = {
  vip: 10,
  dog: 16,
  baby: 2,
  baby: 2,
  puppy: 2,
  weird: 2,
}

var gImg = [
  { id: 1, url: 'img/1.jpg', keyword: ['VIP'] },
  { id: 2, url: 'img/2.jpg', keyword: ['Dog', 'Puppy'] },
  { id: 3, url: 'img/3.jpg', keyword: ['Dog', 'Baby'] },
  { id: 4, url: 'img/4.jpg', keyword: ['Cat'] },
  { id: 5, url: 'img/5.jpg', keyword: ['Baby'] },
  { id: 6, url: 'img/6.jpg', keyword: ['Weird'] },
  { id: 7, url: 'img/7.jpg', keyword: ['Baby'] },
  { id: 8, url: 'img/8.jpg', keyword: ['Weird'] },
  { id: 9, url: 'img/9.jpg', keyword: ['Baby'] },
]

function sortGalleryBy(val) {
  gSortImgBy = []
  console.log(val)
  sortByCategory(val)
}
function sortByCategory(val) {
  gCurrKeyword = val
  var imgs = getImgs()
  imgs.forEach((img) => {
    img.keyword.forEach((cat) => {
      if (cat === val) gSortImgBy.push(img)
    })
  })
  renderGallery([])
  renderGallery(gSortImgBy)
}

function getImgs() {
  return gImg
}

// function getImgById(id) {
//   var imgIdx = id - 1
//   gImg[imgIdx].url
//   var img = `<img id="${id}" src="${gImg[imgIdx].url}" alt="">`
//   gCurrMemeImg = img
//   return img
// }
function getImgById(id) {
  var imgIdx = id - 1
  gImg[imgIdx].url
  var img = `<img id="${id}" src="${gImg[imgIdx].url}" alt="">`
  return img
}

function getMemeById(id) {
  gMeme = gSavedMemes[id]
  console.log(gMeme)
  showSection('meme-editor')
  drawImg2(gMeme)
  return
}

// function imgSelected(img) {
//   showSection('meme-editor')
//   setImg(img)
//   console.log(img.id)
//   createMeme(img.id)
//   renderMeme(img)
// }
