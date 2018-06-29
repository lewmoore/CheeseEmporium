let express = require('express')
let app = express()
let port = process.env.PORT || 8080
let bodyParser = require('body-parser')
let request = require('request')
let apikey = require('./apikey')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.listen(port)
console.log("You're on LH " + port)

app.get('/', function(req, res){
  request.post('http://data.fixer.io/api/latest?access_key=' + apikey + '&symbols=gbp', function(err, response, body) {

    let parsedData = JSON.parse(response.body)
    let dataRes = parsedData.rates.GBP
    let conversionRate = 1 / dataRes
    let customerEUR = 19.99 * conversionRate
    let cheeseAmount = customerEUR / 3.24

    res.render('index', {cheeseAmount: cheeseAmount})
  })
})

module.exports = app
