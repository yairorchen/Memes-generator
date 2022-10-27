'use strict'
const STORAGE_KEY = 'savedMemes'
var gCurrMemeImg
var gCurrMeme
var gCurrLine = 0
var gMeme
var gSavedMemes = loadFromStorage(STORAGE_KEY) || []
console.log(gSavedMemes)

function createMeme(
  id = 1,
  txt = 'hello',
  size = 40,
  color = 'red',
  strokeColor = 'white'
) {
  gMeme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    img: getImgs()[id - 1],
    imgDataUrl: null,
    lines: [
      {
        txt,
        size,
        align: 'left',
        color,
        strokeColor,
      },
    ],
  }
}
function getSavedMemes() {
  return gSavedMemes
}

function switchLine() {
  gCurrLine++
  if (gCurrLine >= gMeme.lines.length) gCurrLine = 0
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
  // Unless needed, better keep height fixed.
  // gElCanvas.height = elContainer.offsetHeight
}

function getMeme() {
  return gMeme
}

function getMemeImg() {
  return gCurrMemeImg
}
function setImg(img) {
  gCurrMemeImg = img
}

function imgSelected(img) {
  showSection('meme-editor')

  setImg(img)
  console.log(img.id)
  createMeme(img.id)
  renderMeme(img)
}

function sizeCurrFont(val) {
  gMeme.lines[gCurrLine].size += val
  var img = getMemeImg()
  renderMeme(img)
  // renderText(img)
}

function setLineTxt(txt) {
  console.log(txt)
  var currMeme = getMeme()
  currMeme.lines[`${gCurrLine}`].txt = txt
  //   currMeme.lines[`${line}`].size = '30'
  //   currMeme.lines[`${line}`].align = 'left'
  //   currMeme.lines[`${line}`].color = 'red'
  var img = getMemeImg()
  // renderText(img)
  renderMeme(img)
}

function setInnerColor(color) {
  gMeme.lines[gCurrLine].color = color
  var img = getMemeImg()
  renderText(imgi)
  // renderMeme(img)
}
function setBorderColor(color) {
  gMeme.lines[gCurrLine].strokeColor = color
  var img = getMemeImg()
  // renderText(img)
  renderMeme(img)
}

function drawText(
  text = 'lorem',
  color,
  strokeColor = 'white',
  size,
  x = 100,
  y = 100
) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = color
  gCtx.font = `${size}px impact`
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function drawNewTxt(
  text = 'lorem',
  color = 'red',
  size = 40,
  x = 100,
  y = 200
) {
  gMeme.lines.push({ txt: text, size, align: 'left', color })
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'white'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Arial`
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
  var img = getMemeImg()
  // renderMeme(img)
  renderText(img)
  console.log(gMeme)

  console.log(gMeme.lines)
}

function getSavedMemes() {
  loadFromStorage(STORAGE_KEY)
}

function saveCurrMeme() {
  gMeme.imgDataUrl = getImgDataUrl()
  gSavedMemes.push(gMeme)
  saveMemeToStorage()
}

function saveMemeToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function loadMemeToStorage() {
  loadFromStorage(STORAGE_KEY)
}

// function saveMemeToStorage() {
//   if (loadFromStorage(STORAGE_KEY)) {
//     console.log('exist')
//     var existingDB = loadFromStorage(STORAGE_KEY)
//     existingDB.push(gMeme)
//     saveToStorage(STORAGE_KEY, existingDB)
//   } else {
//     console.log('save to storage')
//     saveToStorage(STORAGE_KEY, [gMeme])
//   }
// }

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  // After we read the file
  reader.onload = function (event) {
    let img = new Image() // Create a new html img element
    img.src = event.target.result // Set the img src to the img file we read
    // Run the callBack func, To render the img on the canvas
    img.onload = onImageReady.bind(null, img)
    // Can also do it this way:
    // img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function getImgDataUrl() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  console.log(imgDataUrl)
  return imgDataUrl
}

function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    // Encode the instance of certain characters in the url
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log(encodedUploadedImgUrl)
    document.querySelector(
      '.user-msg'
    ).innerText = `Your photo is available here: ${uploadedImgUrl}`
    // Create a link that on click will make a post in facebook with the image we uploaded
    document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
  }
  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

function downloadCanvas(elLink) {
  // Gets the canvas content and convert it to base64 data URL that can be save as an image
  const data = gElCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
  console.log('data', data) // Decoded the image to base64
  elLink.href = data // Put it on the link
  elLink.download = 'canvas sketch' // Can change the name of the file
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function clearCanvas() {
  // gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addMouseListeners() {
  console.log('listening')
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}
