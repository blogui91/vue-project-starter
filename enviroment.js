var glob = require('glob')
var dotenv = require('dotenv').config()
var fs = require('fs')
var beautify = require('json-beautify')

var target = './src/config'
var filename = '/env.json'

glob(target, function (er, files) {
  let stringFile = beautify(dotenv.parsed, null, 2, 80)
  fs.writeFile(target + filename, stringFile, function (err) {
    if (err) {
      console.log('there was an error saving files ', err)
    }
    else {
      console.log('Creating paths for each component...')
      console.log(target + filename + ' has been generated')
    }
  })
})
