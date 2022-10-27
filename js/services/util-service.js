'use strict'
function makeLorem(wordCount = 1) {
  const words = [
    'check this out',
    'i wish!',
    'pick a side!',
    'ya?? how?',
    'you understand',
    'the american dream',
    'i wish.....',
    'R.I.P',
    'my word!',
    'Hello world!',
    'please',
    'more or less',
    'the winter is coming',
    'I love falafel',
  ]
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}
