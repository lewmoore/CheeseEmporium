let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
let nock = require('nock')
let apikey = require('../src/apikey')

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

  it('should make a post request to API with correct response', function(done){
    let apiMock = nock('http://data.fixer.io')
                  .post('/api/latest?access_key=' + apikey + '&symbols=gbp')
                  .reply(200, { success: true,
                                timestamp: 1530264849,
                                base: 'EUR',
                                date: '2018-06-29',
                                rates: { GBP: 0.885495 } })

    chai.request(server)
    .post('http://data.fixer.io/api/latest?access_key=' + apikey + '&symbols=gbp')
    .end(function(err, res){
      console.log(res.body, "RES BODY")
      expect(res.body).to.equal({ gbp: '0.767' })
    })
    done()
  })

  it('should render the correct text', function(){
    chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('jfs')
    })
  })
})
