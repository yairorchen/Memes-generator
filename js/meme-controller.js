'use strict'

function renderMeme(imgi) {
  // Draw the img on the canvas
  console.log(imgi.src)
  let currMeme = getMeme()
  currMeme.selectedImgId = imgi.id
  const img = new Image() // Create a new html img element
  img.src = imgi.src // Send a network req to get that image, define the img src
  // When the image ready draw it on the canvas
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    renderText(imgi)
  }
}
function renderText(img) {
  // Draw the img on the canvas
  console.log(img.src)
  let currMeme = getMeme()
  currMeme.selectedImgId = img.id
  let txt
  let txtSize
  let txtColor
  let strokeColor
  for (let i = 0; i < currMeme.lines.length; i++) {
    txt = currMeme.lines[i].txt
    txtSize = currMeme.lines[i].size
    txtColor = currMeme.lines[i].color
    strokeColor = currMeme.lines[i].strokeColor

    drawText(`${txt}`, txtColor, strokeColor, txtSize, 50, 50 + i * 50)
  }
}

function drawImg2(meme) {
  let txt
  let txtSize
  let txtColor
  let strokeColor

  const img = new Image() // Create a new html img element
  img.src = meme.img.url // Send a network req to get that image, define the img src
  // When the image ready draw it on the canvas
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
  for (let i = 0; i < meme.lines.length; i++) {
    console.log(meme.lines)
    txt = meme.lines[i].txt
    txtSize = meme.lines[i].size
    txtColor = meme.lines[i].color
    strokeColor = meme.lines[i].strokeColor

    drawText(`${txt}`, txtColor, strokeColor, txtSize, 50, 50 + i * 50)
  }
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
}

function onSizeCurrFont(val) {
  sizeCurrFont(val)
}

function onSetInnerColor(val) {
  console.log('set1')
  setInnerColor(val)
}
function onSetBorderColor(val) {
  setBorderColor(val)
}

function onDrawText() {
  drawNewTxt()
}

function onSwitchLine() {
  switchLine()
}
function onEmoji(emoji) {
  console.log(emoji)
  drawNewTxt(emoji, 'white', 50)
}

function onSaveMeme() {
  saveCurrMeme()
}

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
