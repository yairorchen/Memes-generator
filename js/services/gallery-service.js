'use strict'
var gSortImgBy = []
var gCurrKeyword
var gKeywordSearchCountMap = {
  vip: 15,
  dog: 15,
  baby: 10,
  cat: 10,
  Puppy: 20,
  weird: 20,
  movies: 20,
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
  { id: 10, url: 'img/10.jpg', keyword: ['VIP'] },
  { id: 11, url: 'img/11.jpg', keyword: ['Weird'] },
  { id: 12, url: 'img/12.jpg', keyword: ['Weird'] },
  { id: 13, url: 'img/13.jpg', keyword: ['VIP', 'Movies'] },
  { id: 14, url: 'img/14.jpg', keyword: ['Movies'] },
  { id: 15, url: 'img/15.jpg', keyword: ['Movies'] },
  { id: 16, url: 'img/16.jpg', keyword: ['Movies'] },
  { id: 17, url: 'img/17.jpg', keyword: ['VIP'] },
  { id: 18, url: 'img/18.jpg', keyword: ['Movies'] },
]

function sizeByNunOfSearch(val) {
  var keyMap = gKeywordSearchCountMap
  var size
  var maxSize = 40
  switch (val) {
    case 'Baby':
      size = keyMap.baby
      if (size >= maxSize) return
      keyMap.baby += 5
      break
    case 'Cat':
      size = keyMap.cat
      if (size >= maxSize) return
      keyMap.cat += 5
      break
    case 'Dog':
      size = keyMap.dog
      if (size >= maxSize) return
      keyMap.dog += 5
      break
    case 'VIP':
      size = keyMap.vip
      if (size >= maxSize) return
      keyMap.vip += 5
      break
    case 'Weird':
      size = keyMap.weird
      if (size >= maxSize) return
      keyMap.weird += 5
      break
    case 'Movies':
      size = keyMap.movies
      if (size >= maxSize) return
      keyMap.movies += 5
      break
  }
  console.log(size)
  document.getElementById(val).style.fontSize = `${size}px`
}

function sortGalleryBy(val) {
  gSortImgBy = []
  sizeByNunOfSearch(val)
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
