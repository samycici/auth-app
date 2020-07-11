import resetPasswordValidator from '@validators/reset-password'
import Response from '@tests/utils/response'
import mockingoose from 'mockingoose'
import PasswordReset from '@models/PasswordReset'

const message = {
  message: 'Validation failed.',
  data: {
    errors: {
      token: 'token is a required field'
    }
  }
}
const passwordMessage = {
  message: 'Validation failed.',
  data: {
    errors: {
      password: 'password must be at least 6 characters'
    }
  }
}

const invalidTokenMessage = {
  message: 'Validation failed.',
  data: {
    errors: {
      email: 'Invalid password reset token.'
    }
  }
}

describe('The Reset Password Validaor', () => {
  it('Should call the next function when validator succeds', async () => {
    const req = {
      body: {
        email: 'test@user.com',
        token: 'token',
        password: 'password'
      }
    }
    const _doc = {
      _id: '5ea5eaaab37bd51f3a1b0aba',
      name: 'Test User',
      email: 'test@user.com',
      password: 'password',
      emailConfirmCode: 'jA7dgamcCzx6u3Z9YPXa2l70mDOFZtGm',
      __v: 0
    }
    const res = {}
    const next = jest.fn()

    mockingoose(PasswordReset).toReturn(_doc, 'findOne')

    await resetPasswordValidator(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('Should return 422 if token doesn\'t match', async () => {
    const req = {
      body: {
        email: 'test@user.com',
        token: 'token',
        password: 'password'
      }
    }
    const res = new Response()
    const next = jest.fn()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    mockingoose(PasswordReset).toReturn(null, 'findOne')

    await resetPasswordValidator(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
    expect(statusSpy).toHaveBeenCalledWith(422)
    expect(jsonSpy).toHaveBeenCalledWith(invalidTokenMessage)
  })

  it('Should return 422 if validation fails', async () => {
    const req = {
      body: {
        password: 'password'
      }
    }

    const next = jest.fn()

    const res = new Response()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    await resetPasswordValidator(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
    expect(statusSpy).toHaveBeenCalledWith(422)
    expect(jsonSpy).toHaveBeenCalledWith(message)
  })

  it('Should return 422 if password is less than 6', async () => {
    const req = {
      body: {
        email: 'test@test.com',
        password: '1',
        token: 'token'
      }
    }

    const next = jest.fn()

    const res = new Response()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    await resetPasswordValidator(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
    expect(statusSpy).toHaveBeenCalledWith(422)
    expect(jsonSpy).toHaveBeenCalledWith(passwordMessage)
  })
})
