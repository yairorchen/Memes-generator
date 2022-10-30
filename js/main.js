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
  getTitleSized()
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function hideSectionsInit() {
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

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
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
  const dx = pos.x - gMeme.lines[gMeme.selectedLineIdx].x
  const dy = pos.y - gMeme.lines[gMeme.selectedLineIdx].y
  dragText(dx, dy)
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

function dragText(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].x += dx
  gMeme.lines[gMeme.selectedLineIdx].y += dy
  var img = getMemeImg()
  renderMeme(img)
}

function isTextClicked(clickedPos) {
  const posX = gMeme.lines[gMeme.selectedLineIdx].x
  const posY = gMeme.lines[gMeme.selectedLineIdx].y
  if (
    posX - clickedPos.x < 0 &&
    posX - clickedPos.x <
      gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width &&
    posY - clickedPos.y > 0 &&
    posY - clickedPos.y < gMeme.lines[gMeme.selectedLineIdx].size
  ) {
    return true
  }
}

function canvasClicked(ev) {
  const clickedLine = gMeme.lines.find((line) => {
    return (
      ev.offsetX > line.x &&
      ev.offsetX < line.x + gCtx.measureText(line.txt).width &&
      ev.offsetY < line.y &&
      ev.offsetY + line.size > line.y
    )
  })
  if (clickedLine) {
    console.log(clickedLine.lineIdx)
    switchLine(clickedLine.lineIdx)
  }
}
