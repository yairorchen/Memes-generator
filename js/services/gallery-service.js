'use strict'
var gSortImgBy = []
var gCurrKeyword
var gKeywordSearchCountMap = {
  all: 35,
  vip: 15,
  dog: 15,
  baby: 20,
  cat: 15,
  weird: 30,
  movies: 25,
}
var gCategoryName = ['all', 'vip', 'dog', 'baby', 'cat', 'weird', 'movies']

var gImg = [
  { id: 1, url: 'img/1.jpg', keyword: ['vip'] },
  { id: 2, url: 'img/2.jpg', keyword: ['dog'] },
  { id: 3, url: 'img/3.jpg', keyword: ['dog', 'baby'] },
  { id: 4, url: 'img/4.jpg', keyword: ['cat'] },
  { id: 5, url: 'img/5.jpg', keyword: ['baby'] },
  { id: 6, url: 'img/6.jpg', keyword: ['weird'] },
  { id: 7, url: 'img/7.jpg', keyword: ['baby'] },
  { id: 8, url: 'img/8.jpg', keyword: ['weird'] },
  { id: 9, url: 'img/9.jpg', keyword: ['baby'] },
  { id: 10, url: 'img/10.jpg', keyword: ['vip'] },
  { id: 11, url: 'img/11.jpg', keyword: ['weird'] },
  { id: 12, url: 'img/12.jpg', keyword: ['weird'] },
  { id: 13, url: 'img/13.jpg', keyword: ['vip', 'movies'] },
  { id: 14, url: 'img/14.jpg', keyword: ['movies'] },
  { id: 15, url: 'img/15.jpg', keyword: ['movies'] },
  { id: 16, url: 'img/16.jpg', keyword: ['movies'] },
  { id: 17, url: 'img/17.jpg', keyword: ['vip'] },
  { id: 18, url: 'img/18.jpg', keyword: ['movies'] },
]

function sizeByNunOfSearch(val) {
  console.log(val)
  var keyMap = gKeywordSearchCountMap
  var size
  var maxSize = 40
  switch (val) {
    case 'baby':
      size = keyMap.baby
      if (size >= maxSize) return
      keyMap.baby += 5
      break
    case 'cat':
      size = keyMap.cat
      if (size >= maxSize) return
      keyMap.cat += 5
      break
    case 'dog':
      size = keyMap.dog
      if (size >= maxSize) return
      keyMap.dog += 5
      break
    case 'vip':
      size = keyMap.vip
      if (size >= maxSize) return
      keyMap.vip += 5
      break
    case 'weird':
      size = keyMap.weird
      if (size >= maxSize) return
      keyMap.weird += 5
      break
    case 'movies':
      size = keyMap.movies
      if (size >= maxSize) return
      keyMap.movies += 5
      break
    case 'all':
      size = keyMap.all
      if (size >= maxSize) return
      keyMap.all += 5
      break
  }
  document.getElementById(val).style.fontSize = `${size}px`
}

function getTitleSized() {
  gCategoryName.forEach((key) => sizeByNunOfSearch(key))
}

function sortGalleryBy(val) {
  console.log(val)
  gSortImgBy = []
  sizeByNunOfSearch(val)
  sortByCategory(val)
}
function sortByCategory(val) {
  if (val === 'all') return renderGallery(gImg)
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

function getImgById(id) {
  var imgIdx = id - 1
  gImg[imgIdx].url
  var img = `<img id="${id}" src="${gImg[imgIdx].url}" alt="">`
  return img
}

function getMemeById(id) {
  gMeme = gSavedMemes[id]
  showSection('meme-editor')
  drawImg2(gMeme)
  return
}
