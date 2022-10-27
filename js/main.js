'use strict'

let gElCanvas
let gCtx
let gCurrInnerColor = 'blue'
let gCurrBorderColor = 'white'
var gPos
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  addMouseListeners()
  addTouchListeners()
  hideSectionsInit()
  renderGallery()
  // window.addEventListener('resize', resizeCanvas)
  // resizeCanvas()
}

function hideSectionsInit() {
  //   document.querySelector('.gallery-layout').classList.add('hide')
  document.querySelector('.meme-editor').classList.add('hide')
  document.querySelector('.saved-memes').classList.add('hide')
}

function showSection(sec) {
  document.querySelector('.gallery-layout').classList.add('hide')
  document.querySelector('.meme-editor').classList.add('hide')
  document.querySelector('.saved-memes').classList.add('hide')
  document.querySelector(`.${sec}`).classList.remove('hide')
}

function showSavedMemes() {
  renderSavedMeme()
  showSection('saved-memes')
}

//

// randomeMeme()
// console.log(gMeme)
// function randomeMeme() {
//   var img = getImgById(getRandomIntInclusive(1, gImg.length))
//   setImg(img)
//   createMeme(
//     1,
//     makeLorem(),
//     getRandomIntInclusive(10, 60),
//     getRandomColor(),
//     getRandomColor()
//   )
//   renderMeme(img)
// }

function addMouseListeners() {
  console.log('mouse listening')
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  console.log('touch listening')
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)

  if (!isTextClicked(pos)) return
  setTextDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const isDrag = gMeme.isDraged
  if (!isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gMeme.lines[gCurrLine].x
  const dy = pos.y - gMeme.lines[gCurrLine].y
  moveText(dx, dy)
}

function onUp() {
  document.body.style.cursor = 'grab'
  setTextDrag(false)
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }

  return pos
}

function setTextDrag(isDrag) {
  gMeme.isDraged = isDrag
}

function moveText(dx, dy) {
  console.log(dx, dy)
  gMeme.lines[gCurrLine].x += dx
  gMeme.lines[gCurrLine].y += dy
  var img = getMemeImg()
  renderMeme(img)
}

function isTextClicked(clickedPos) {
  const posX = gMeme.lines[gCurrLine].x
  const posY = gMeme.lines[gCurrLine].y
  // Calc the distance between two dots
  const distance = Math.sqrt(
    (posX - clickedPos.x) ** 2 + (posY - clickedPos.y) ** 2
  )
  //If its smaller then the radius of the circle we are inside
  return distance <= gMeme.lines[0].size
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}
