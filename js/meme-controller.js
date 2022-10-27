'use strict'

function renderMeme(pic) {
  // Draw the img on the canvas

  let currMeme = getMeme()
  currMeme.selectedImgId = pic.id
  const img = new Image() // Create a new html img element
  img.src = pic.src // Send a network req to get that image, define the img src
  // When the image ready draw it on the canvas
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    renderText(pic)
  }
}
function renderText(img) {
  // Draw the img on the canvas
  let currMeme = getMeme()
  currMeme.selectedImgId = img.id
  let txt
  let txtSize
  let txtColor
  let strokeColor
  let xPos
  let yPos
  for (let i = 0; i < currMeme.lines.length; i++) {
    txt = currMeme.lines[i].txt
    txtSize = currMeme.lines[i].size
    txtColor = currMeme.lines[i].color
    strokeColor = currMeme.lines[i].strokeColor
    xPos = currMeme.lines[i].x
    yPos = currMeme.lines[i].y

    drawText(`${txt}`, txtColor, strokeColor, txtSize, xPos, yPos)
  }
}

function drawImg2(meme) {
  console.log(meme)
  let txt
  let txtSize
  let txtColor
  let strokeColor
  let xPos
  let yPos
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
    xPos = meme.lines[i].x
    yPos = meme.lines[i].y

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

function onRemoveTxt() {
  removeTxt()
}

function onNoveText(val) {
  moveText(val)
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
