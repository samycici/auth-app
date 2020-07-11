import User from '@models/User'
import {
  connect,
  disconnect
} from '@tests/utils/mongoose'
import Response from '@tests/utils/response'

import authMiddleware from '@middleware/auth'

const user = {
  name: 'Test User',
  email: 'test@user.com',
  password: 'password'
}

let createdUser

const message = {
  message: 'Unauthenticated.'
}

describe('The Auth middleware', () => {
  beforeAll(async () => {
    await connect()
    createdUser = await User.create(user)
  })
  it('Should call the next function if authentication succeds', async () => {
    const access_token = createdUser.generateToken()
    const req = {
      body: {
        access_token
      }
    }
    const res = new Response()
    const next = jest.fn()

    await authMiddleware(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('Should return 401 if authentication fails', async () => {
    const req = {
      body: {}
    }
    const res = new Response()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')
    const next = jest.fn()

    await authMiddleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(jsonSpy).toHaveBeenCalledWith(message)
  })

  afterAll(async () => {
    await disconnect()
  })
})
