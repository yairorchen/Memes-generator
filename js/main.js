'use strict'

let gElCanvas
let gCtx
let gCurrInnerColor = 'blue'
let gCurrBorderColor = 'white'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  addMouseListeners()
  //   addTouchListeners()
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
  console.log('Im from onDown')
  //Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  // if (!isCircleClicked(pos)) return
  // setCircleDrag(true)
  //Save the pos we start from
  // gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  console.log('Im from onMove')

  const pos = getEvPos(ev)

  // const dx = pos.x - gStartPos.x
  // const dy = pos.y - gStartPos.y

  //Save the last pos , we remember where we`ve been and move accordingly
  // gStartPos = pos
}

function onUp() {
  console.log('Im from onUp')
  // setCircleDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  //Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
