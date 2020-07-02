import server from '@server/app'
import supertest from 'supertest'
import { connect, disconnect } from '@tests/utils/mongoose'
import User  from '@models/User'


const app = () => supertest(server)

const user = {
    name: 'test user',
    email: 'a@test.com',
    password: 'password'
}

const login = {
    email: 'a@test.com',
    password: 'password'
}

const noUser = {
    email: 'b@test.com',
    password: 'password'
}

const LOGIN_ENDPOINT = '/api/v1/auth/login'

describe('The login process', () => {
    beforeEach(async () => {
        await connect()
        await User.create(user)
    })

    it('Should login a existent user', async () => {
        const response = await app().post(LOGIN_ENDPOINT).send(login)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Login successful.')
        expect(response.body.data.token).toBeDefined()
        
    })

    it('Shouldn\'t login an non existent user', async () => {
        const response = await app().post(LOGIN_ENDPOINT).send(noUser)
        expect(response.status).toBe(401)
        expect(response.body.message).toBe('These credentials do not match our records.')
    })

    afterAll(async () => {
        await disconnect()
    })
})
