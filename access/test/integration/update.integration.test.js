'use strict'

const request = require('supertest')
const expect = require('chai').expect

const server = request('http://localhost:3000')

describe('update user integration test', () => {
  it('should be able to trigger the access count value update and get the new access count', (done) => { 
    server.put('/dev/access')
      .send()
      .expect(200)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.a('number')
        return done()
      })
   })
})
