'use strict'

const request = require('supertest')
const expect = require('chai').expect;
const { validate: isUuid } = require('uuid')
const repo = require('../../api/repo')

const server = request('http://localhost:3000')

describe('get user integration test', () => {


  it('should be able to return undefined when no user was found', (done) => {  
    server.get(`/dev/user/a0f13a55-620d-4ce6-afc4-47c48a314ee2`)
      .send()
      .expect(404)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.deep.include({
          error: 'Resource was not found.'
        })
        return done()
      })
   })



  it('should be able to find a users by id', (done) => {
    server.get('/dev/user/ebc1dcd6-6eb7-4d93-8b69-aefe57296ab4')
      .send()
      .expect(200)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.deep.include({
          name: 'Tony Stark',
          email: 'tonystark@gmail.com',
          cpf: '00011144466'
        })
        expect(isUuid(result.body.id)).to.equal(true)
        return done()
      })
  })
})
