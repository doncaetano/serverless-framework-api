'use strict'

const { validate: isUuid } = require('uuid')

const CreateUser = require('../index')
const User = require('../../../model/__mock__/User')

describe('create user use case', () => {
  let createUserUseCase
  beforeAll(() => {
    const user = new User()
    createUserUseCase = new CreateUser(user)
  })

  it('should be able to create an user', async () => {
    const result = await createUserUseCase.execute({
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      cpf: '11122233344'
    })
    expect(result.user).toMatchObject({
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      cpf: '11122233344'
    })
    expect(isUuid(result.user.id)).toBe(true)
  })

  it('should not be able to create an user with an invalid email', async () => {
    const result = await createUserUseCase.execute({
      name: 'John Snow',
      email: 'test',
      cpf: '11122233344'
    })
    expect(result).toMatchObject({
      error: 'Invalid email.'
    })
  })

  it('should not be able to create an user with an used email', async () => {
    const result = await createUserUseCase.execute({
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      cpf: '11122233344'
    })
    expect(result).toMatchObject({
      error: 'Email address is already in use.'
    })
  })

  it('should not be able to create an user with an used cpf', async () => {
    const result = await createUserUseCase.execute({
      name: 'John Snow',
      email: 'test@gmail.com',
      cpf: '11122233344'
    })
    expect(result).toMatchObject({
      error: 'Cpf is already in use.'
    })
  })
})