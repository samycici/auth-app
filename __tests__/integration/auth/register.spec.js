import server from '@server/app'
import supertest from 'supertest'
import { disconnect } from '@tests/utils/mongoose'
import User  from '@models/User'

const app = () => supertest(server)

const user = {
    name: 'test user',
    email: 'a@test.com',
    password: 'password'
}
const userEmpty = {
}
const alreadyBeenTaken ={
    email: 'This email has already been taken.'
}
const REGISTER_ENDPOINT = '/api/v1/auth/register'

describe('The register process', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('Should register a new user', async () => {
        const response = await app().post(REGISTER_ENDPOINT).send(user)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Account registered.')
        expect(response.body.data.token).toBeDefined()
        
    })

    it('Should respond with 422 if user already exists', async () => {
        await User.create(user)
        const response = await app().post(REGISTER_ENDPOINT).send(user)
        expect(response.status).toBe(422)
        expect(response.body.message).toBe('Validation failed.')
        expect(response.body.data.errors).toEqual(alreadyBeenTaken)
        
    })

    it('Should respond with 422 if the body is empty', async () => {
        const response = await app().post(REGISTER_ENDPOINT).send(userEmpty)
        expect(response.status).toBe(422)
        expect(response.body.message).toBe('Validation failed.')
        
    })

    afterAll(async () => {
        await disconnect()
    })
})
