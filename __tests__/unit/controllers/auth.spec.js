import User from '@models/User'
import mockingoose from 'mockingoose'
import Response from '@tests/utils/response'
import authController from '@controllers/auth.controller'

const user = {
  name: 'Test User',
  email: 'test@user.com',
  password: 'password'
}

const newUser = {
  name: 'Test New User',
  email: 'new@user.com',
  password: 'password'
}

const notMatchCredentials = {
  message: 'These credentials do not match our records.',
  data: {
    errors: {
      email: 'These credentials do not match our records.'
    }
  }
}

const accountRegistered = {
  message: 'Account registered.'
}

describe('The Auth Controller', () => {
  beforeAll(async () => {
    mockingoose(User).toReturn(user, 'create')
  })

  it('Should register a new user', async () => {
    const req = {
      body: newUser
    }
    const res = new Response()
    const jsonSpy = jest.spyOn(res, 'json')

    mockingoose(User).toReturn(newUser, 'create')

    await authController.register(req, res)
    expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining(accountRegistered))
  })

  it('Should\'n login with wrong password', async () => {
    const req = {
      body: {
        email: 'test@user.com',
        password: 'wrong'
      }
    }
    const res = new Response()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    mockingoose(User).toReturn(null, 'findOne')

    await authController.login(req, res)
    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(jsonSpy).toHaveBeenCalledWith(notMatchCredentials)
  })

  it('Should\'n login if user doesn\'t exist', async () => {
    const req = {
      body: {
        email: 'non@user.com',
        password: 'wrong'
      }
    }
    const res = new Response()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    mockingoose(User).toReturn(null, 'findOne')

    await authController.login(req, res)
    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(jsonSpy).toHaveBeenCalledWith(notMatchCredentials)
  })
})
