'use strict'

let gElCanvas
let gCtx
let gCurrInnerColor = 'blue'
let gCurrBorderColor = 'white'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  window.addEventListener('resize', resizeCanvas)
  // resizeCanvas()
  //   addMouseListeners()
  //   addTouchListeners()
  hideSectionsInit()
  renderGallery()
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
