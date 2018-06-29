let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
let nock = require('nock')
let apikey = require('../apikey')

chai.use(chaiHttp)

describe('landing page', function(){

  it('should not error', function(done){
    chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200)
      res.text.should.contain('Welcome to the Cheese Emporium!')
    })
    done()
  })

  it('should make a post request to API with correct response', function(){
    let apiMock = nock('http://data.fixer.io')
                  .post('/api/latest?access_key=' + apikey + '&symbols=gbp')
                  .reply(200, { gbp: '0.767' })

    chai.request(server)
    .get('/')
    .end(function(req, res){
      res.should.have.status(200)
      expect(res.body).toEqual({ gbp: '0.767' })
      console.log(res.body, "RES TEXT")
    })
  })
})
