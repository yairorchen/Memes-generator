'use strict'
const STORAGE_KEY = 'savedMemes'
var gCurrMemeImg
var gCurrMeme
var gMeme
var gSavedMemes = loadFromStorage(STORAGE_KEY) || []

function createMeme(
  id = 1,
  txt = 'Add text',
  size = 40,
  color = 'red',
  strokeColor = 'white'
) {
  gMeme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    img: getImgs()[id - 1],
    imgDataUrl: null,
    src: getImgs().src,
    id,
    isDraged: false,
    lines: [
      {
        txt,
        size,
        align: 'left',
        color,
        strokeColor,
        x: 50,
        y: 150,
        lineIdx: 0,
        font: 'impact',
        isRect: true,
      },
    ],
  }
}
function getSavedMemes() {
  return gSavedMemes
}

function moveText(val) {
  gMeme.lines[gMeme.selectedLineIdx].y += val * 10
  var img = getMemeImg()
  renderMeme(img)
}

function switchLine(val) {
  if (val === undefined) {
    gMeme.selectedLineIdx++
  } else {
    console.log('baba')
    gMeme.selectedLineIdx = val
  }
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }
  document.querySelector('.text-input').value =
    gMeme.lines[gMeme.selectedLineIdx].txt
  var img = getMemeImg()
  renderMeme(img)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function getMeme() {
  return gMeme
}

function getMemeImg() {
  return gMeme.image
}
function setImg(img) {
  gMeme.image = img
}

function imgSelected(img) {
  showSection('meme-editor')
  createMeme(img.id)
  setImg(img)
  renderMeme(img)
}

function sizeCurrFont(val) {
  gMeme.lines[gMeme.selectedLineIdx].size += val
  var img = getMemeImg()
  renderMeme(img)
}

function setLineTxt(txt) {
  var currMeme = getMeme()
  currMeme.lines[`${gMeme.selectedLineIdx}`].txt = txt
  currMeme.lines[`${gMeme.selectedLineIdx}`].lineIdx = gMeme.selectedLineIdx
  var img = getMemeImg()
  renderMeme(img)
}

function setInnerColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
  var img = getMemeImg()
  renderMeme(img)
}
function setBorderColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
  var img = getMemeImg()
  renderMeme(img)
}
function setRect() {
  for (let i = 0; i < gMeme.lines.length; i++) {
    gMeme.lines[i].isRect = false
  }
  gMeme.lines[gMeme.selectedLineIdx].isRect = true
}

function drawText(
  text = 'Add text',
  color,
  strokeColor = 'white',
  size,
  x = 100,
  y = 100,
  font = 'impact'
) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function drawRect(text = 'Add text', size, x = 100, y = 100) {
  gCtx.strokeRect(x, y - size, gCtx.measureText(text).width, size + 10)
}

function drawNewTxt(
  text = 'Add text',
  color = 'red',
  size = 40,
  x = 100,
  y = 250,
  font = gMeme.lines[gMeme.selectedLineIdx].font,
  isRect = true
) {
  gMeme.lines.push({
    txt: text,
    size,
    align: 'left',
    color,
    x,
    y,
    lineIdx: gMeme.lines.length,
    font: 'impact',
    isRect: isRect,
  })
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'white'
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
  var img = getMemeImg()
  renderMeme(img)
  switchLine()
}

function getSavedMemes() {
  loadFromStorage(STORAGE_KEY)
}

function saveCurrMeme() {
  var data = getImgDataUrl()
  gMeme.imgDataUrl = data
  gMeme.img.url = data
  if (gSavedMemes) gSavedMemes.unshift(gMeme)
  saveMemeToStorage()
}

function saveMemeToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function loadMemeToStorage() {
  loadFromStorage(STORAGE_KEY)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    img.onload = onImageReady.bind(null, img)

    setImg(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

function getImgDataUrl() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  return imgDataUrl
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
  showSection('meme-editor')
  setImg(ev)
  renderMeme(ev)
}

function changeFontFamily(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
  var size = gMeme.lines[gMeme.selectedLineIdx].size

  gCtx.font = `${size}px ${font}`
  var img = getMemeImg()
  renderMeme(img)
}

function removeTxt() {
  if (gMeme.lines.length > 1) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  } else {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
  }
  var img = getMemeImg()
  switchLine()
  renderMeme(img)
}

function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR

    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderMeme)
  gMeme.img = ev
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'canvas sketch'
}
