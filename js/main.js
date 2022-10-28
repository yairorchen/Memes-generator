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
  gMeme.lines[gCurrLine].x += dx
  gMeme.lines[gCurrLine].y += dy
  var img = getMemeImg()
  renderMeme(img)
}

function isTextClicked(clickedPos) {
  const posX = gMeme.lines[gCurrLine].x
  const posY = gMeme.lines[gCurrLine].y
  if (
    posX - clickedPos.x < 0 &&
    posX - clickedPos.x >
      gMeme.lines[gCurrLine].txt.length * (gMeme.lines[gCurrLine].size / -2) &&
    posY - clickedPos.y > 0 &&
    posY - clickedPos.y < gMeme.lines[gCurrLine].size
  ) {
    return true
  }
  console.log(gMeme.lines[gCurrLine].txt.length)
}

// function isTextClicked(clickedPos) {
//   const posX = gMeme.lines[gCurrLine].x
//   const posY = gMeme.lines[gCurrLine].y
//   // Calc the distance between two dots
//   const distance = Math.sqrt(
//     (posX - clickedPos.x) ** 2 + (posY - clickedPos.y) ** 2
//   )
//   //If its smaller then the radius of the circle we are inside
//   return distance <= gMeme.lines[gCurrLine].size
// }

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function canvasClicked(ev) {
  console.log('Click on me canvas')
  const clickedLine = gMeme.lines.find((line) => {
    return (
      ev.offsetX > line.x &&
      ev.offsetX < line.x + line.txt.length * (line.size / 2) &&
      ev.offsetY < line.y &&
      ev.offsetY + line.size > line.y
    )
  })
  console.log(clickedLine)
  console.log(gMeme)
}

// function canvasClicked(ev) {
//   console.log('Click on me canvas')
//   // TODO: find out if clicked a star bar
//   const clickedStar = gStars.find((star) => {
//     // Check if the click coordinates are inside the bar coordinates
//     return (
//       ev.offsetX > star.x &&
//       ev.offsetX < star.x + BAR_WIDTH &&
//       ev.offsetY > star.y &&
//       ev.offsetY < star.y + star.rate
//     )
//   })
//   console.log(clickedStar)
//   // TODO: open the modal on the clicked coordinates if found a click on the star bar
//   if (clickedStar) {
//     const { name, rate } = clickedStar
//     openModal(name, rate, ev.clientX, ev.clientY)
//     // close the modal otherwise
//   } else closeModal()
// }
