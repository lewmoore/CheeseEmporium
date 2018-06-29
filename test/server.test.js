let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

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
})
