'use strict'

const request = require('supertest')
const expect = require('chai').expect;
const { validate: isUuid } = require('uuid')

const server = request('http://localhost:3000')

describe('create user integration test', () => {
    
  it('should be able to create an user', (done) => {
    server.post('/dev/user')
      .send(JSON.stringify({
        name: 'John Snow',
        email: 'johnsnow@gmail.com',
        cpf: '11122233344'
      }))
      .expect(201)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.deep.include({
          name: 'John Snow',
          email: 'johnsnow@gmail.com',
          cpf: '11122233344'
        })
        expect(isUuid(result.body.id)).to.equal(true)
        return done()
      })
   })

   it('should not be able to create an user with an invalid email', (done) => {
    server.post('/dev/user')
      .send(JSON.stringify({
        name: 'John Snow',
        email: 'johnsnow',
        cpf: '11122233344'
      }))
      .expect(400)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.deep.include({
          error: 'Invalid email.'
        })
        return done()
      })
   })

   it('should not be able to create an user with an used email', (done) => {
    server.post('/dev/user')
      .send(JSON.stringify({
        name: 'John Snow',
        email: 'johnsnow@gmail.com',
        cpf: '11122233344'
      }))
      .expect(400)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.deep.include({
          error: 'Email address is already in use.'
        })
        return done()
      })
   })

   it('should not be able to create an user with an used cpf', (done) => {
    server.post('/dev/user')
      .send(JSON.stringify({
        name: 'John Snow',
        email: 'johnsnow-new@gmail.com',
        cpf: '11122233344'
      }))
      .expect(400)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).to.deep.include({
          error: 'Cpf is already in use.'
        })
        return done()
      })
   })
})
