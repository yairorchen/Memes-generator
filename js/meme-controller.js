'use strict'

function renderMeme(img) {
  // Draw the img on the canvas
  let currMeme = getMeme()
  let txt
  let txtSize
  let txtColor
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  for (let i = 0; i < currMeme.lines.length; i++) {
    txt = currMeme.lines[i].txt
    txtSize = currMeme.lines[i].size
    txtColor = currMeme.lines[i].color
    drawText(`${txt}`, txtColor, txtSize, 50, 50 + i * 50)
  }
}
// function renderMeme(img) {
//   // Draw the img on the canvas
//   let currMeme = getMeme()
//   let txt
//   let txtSize
//   let txtColor

//   currMeme.lines.forEach((el) => {
//     txt = currMeme.lines[el].txt
//     txtSize = currMeme.lines[el].size
//     txtColor = currMeme.lines[el].color
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
//     drawText(`${txt}`, txtColor, txtSize, 50, 50)
//   })
// }

// function renderMeme(img) {
//   // Draw the img on the canvas

//   var currMeme = getMeme()
//   var txt = currMeme.lines[0].txt
//   var txtSize = currMeme.lines[0].size
//   var txtColor = currMeme.lines[0].color
//   console.log(currMeme)
//   console.log(currMeme.lines)
//   console.log(currMeme.lines[0].txt)
//   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
//   drawText(`${txt}`, txtColor, txtSize, 50, 50)

// }

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
