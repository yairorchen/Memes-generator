'use strict'

function renderMeme(pic) {
  gMeme.selectedImgId = pic.id
  const img = new Image()
  img.src = pic.src
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
  let font
  for (let i = 0; i < currMeme.lines.length; i++) {
    txt = currMeme.lines[i].txt
    txtSize = currMeme.lines[i].size
    txtColor = currMeme.lines[i].color
    strokeColor = currMeme.lines[i].strokeColor
    xPos = currMeme.lines[i].x
    yPos = currMeme.lines[i].y
    font = currMeme.lines[i].font

    drawText(`${txt}`, txtColor, strokeColor, txtSize, xPos, yPos, font)
  }
}

function drawImg2(meme) {
  let txt
  let txtSize
  let txtColor
  let strokeColor
  let xPos
  let yPos
  const img = new Image()
  img.src = meme.imgDataUrl
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
  for (let i = 0; i < meme.lines.length; i++) {
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
  drawNewTxt(emoji, 'white', 50)
}

function align(val) {
  gMeme.lines.forEach((line) => {
    if (val === -1) line.x = 30
    if (val === 0)
      line.x = gElCanvas.width / 2 - gCtx.measureText(line.txt).width / 2
    if (val === 1)
      line.x = gElCanvas.width - 30 - gCtx.measureText(line.txt).width
  })
  var img = getMemeImg()
  renderMeme(img)
}
function onChangeFontFamily(font) {
  changeFontFamily(font)
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
