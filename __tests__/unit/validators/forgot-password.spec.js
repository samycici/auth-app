import forgotPasswordValidator from '@validators/forgot-password'
import Response from '@tests/utils/response'
import mockingoose from 'mockingoose'
import PasswordReset from '@models/PasswordReset'
import User from '@models/User'
 
const _doc = {
    _id: '5ea5eaaab37bd51f3a1b0aba',
    name: 'Test User',
    email: 'test@user.com',
    password: 'password',
    emailConfirmCode: 'jA7dgamcCzx6u3Z9YPXa2l70mDOFZtGm',
    __v: 0
  }

const _docpass = {
    _id: '5ea5eaaab37bd51f3a1b0aba',
    email: 'test@user.com',
    token: 'token',
    __v: 0
}


const message = { message: 'Validation failed.',
data: {
    errors: {
        "email": "email is a required field"
    }
}}

const noAccountFound = { message: 'Validation failed.',
data: {
    errors: {
        "email": 'No account was found with this email.'
    }
}}

const alreadySent = { message: 'Validation failed.',
data: {
    errors: {
        "email": 'Password reset link already sent.'
    }
}}


describe('The Reset Password Validaor', () => {
    it('Should call the next function when user exists', async () => {
        const req = {
            body: {
                email: 'test@user.com'
            }
        }

        const res = {}
        const next = jest.fn()

        mockingoose(User).toReturn(_doc, 'findOne');

        await forgotPasswordValidator(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    it('Should return 422 if account was not found', async () => {
        const req = {
            body: {
                email: 'test@user.com'
            }
        }
        const res = new Response
        const next = jest.fn()
        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        mockingoose(User).toReturn(null, 'findOne');

        await forgotPasswordValidator(req, res, next)
        expect(next).toHaveBeenCalledTimes(0)
        expect(statusSpy).toHaveBeenCalledWith(422)
        expect(jsonSpy).toHaveBeenCalledWith(noAccountFound)
    })

    it('Should return 422 if password reset link was already sent', async () => {
        const req = {
            body: {
                email: 'test@user.com'
            }
        }
        const res = new Response
        const next = jest.fn()
        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        mockingoose(User).toReturn(_doc, 'findOne');
        mockingoose(PasswordReset).toReturn(_docpass, 'findOne');

        await forgotPasswordValidator(req, res, next)
        expect(next).toHaveBeenCalledTimes(0)
        expect(statusSpy).toHaveBeenCalledWith(422)
        expect(jsonSpy).toHaveBeenCalledWith(alreadySent)
    })

    it('Should return 422 if validation fails', async () => {
        const req = {
            body: {
                
            }
        }

        const next = jest.fn()

        const res = new Response
        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        await forgotPasswordValidator(req, res, next)
        expect(next).toHaveBeenCalledTimes(0)
        expect(statusSpy).toHaveBeenCalledWith(422)
        expect(jsonSpy).toHaveBeenCalledWith(message)
    })

})