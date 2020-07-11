import loginValidator from '@validators/login'
import Response from '@tests/utils/response'

const message = {
  message: 'Validation failed.',
  data: {
    errors: {
      email: 'email is a required field'
    }
  }
}

describe('The login validaor', () => {
  it('Should call the next function when validator succeds', async () => {
    const req = {
      body: {
        email: 'a@test.com',
        password: 'password'
      }
    }
    const res = {}

    const next = jest.fn()

    await loginValidator(req, res, next)
    expect(next).toHaveBeenCalled()
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

    await loginValidator(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
    expect(statusSpy).toHaveBeenCalledWith(422)
    expect(jsonSpy).toHaveBeenCalledWith(message)
  })
})
