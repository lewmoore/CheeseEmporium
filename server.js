let express = require('express')
let app = express()
let port = process.env.PORT || 8080
let bodyParser = require('body-parser')

app.listen(port)
console.log("You're on LH " + port)

app.get('/', function(req, res){
  res.send('Welcome to the Cheese Emporium!')
})

module.exports = app
