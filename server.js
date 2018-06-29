let express = require('express')
let app = express()
let port = process.env.PORT || 8080
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.listen(port)
console.log("You're on LH " + port)

app.get('/', function(req, res){
  res.render('index')
})

module.exports = app
