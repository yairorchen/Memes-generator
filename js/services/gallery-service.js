'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImg = [
  { id: 1, url: 'img/1.jpg', keyword: ['vip'] },
  { id: 2, url: 'img/2.jpg', keyword: ['dog', 'puppy'] },
  { id: 3, url: 'img/3.jpg', keyword: ['dog', 'baby'] },
  { id: 4, url: 'img/4.jpg', keyword: ['cat'] },
  { id: 5, url: 'img/5.jpg', keyword: ['baby'] },
  { id: 6, url: 'img/6.jpg', keyword: ['weird'] },
  { id: 7, url: 'img/7.jpg', keyword: ['baby'] },
  { id: 8, url: 'img/8.jpg', keyword: ['weird'] },
  { id: 9, url: 'img/9.jpg', keyword: ['baby'] },
]

function getImgs() {
  return gImg
}
