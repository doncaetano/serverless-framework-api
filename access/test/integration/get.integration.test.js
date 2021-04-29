'use strict'

const request = require('supertest')
const expect = require('chai').expect

const server = request('http://localhost:3000')

describe('get access integration test', () => {
  it('should be able to get an integer value representing the number of access', (done) => {
    server.get('/dev/access')
      .send()
      .expect(200)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.be.a('number')
        return done()
      })
   })
})
