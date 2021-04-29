'use strict'

const { validate: isUuid } = require('uuid')

const User = require('../User')
const repo = require('../../repo/__mock__/repo')

describe('user model', () => {
  let userModule
  beforeAll(() => {
    userModule = new User(repo)
  })

  it('should be able to create an user', async () => {
    const user = await userModule.create({
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      cpf: '11122233344'
    })
    expect(user).toMatchObject({
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      cpf: '11122233344'
    })
    expect(isUuid(user.id)).toBe(true)
  })

  it('should be able to find a users by id', async () => {
    const userCreated = await userModule.create({
      name: 'Tony Stark',
      email: 'tonystark@gmail.com',
      cpf: '11122233300'
    })
    const id = userCreated.id

    const user = await userModule.findById(id)
    expect(user).toMatchObject(userCreated)
  })

  it('should be able to find a users by email', async () => {
    const userCreated = await userModule.create({
      name: 'Barack Obama',
      email: 'barackobama@gmail.com',
      cpf: '11122233311'
    })
    const email = userCreated.email

    const user = await userModule.findByEmail(email)
    expect(user).toMatchObject([userCreated])
  })

  it('should be able to find a users by cpf', async () => {
    const userCreated = await userModule.create({
      name: 'Steven Rogers',
      email: 'stevenrogers@gmail.com',
      cpf: '12345678900'
    })
    const cpf = userCreated.cpf

    const user = await userModule.findByCpf(cpf)
    expect(user).toMatchObject([userCreated])
  })
})
