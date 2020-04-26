import User  from '@models/User'
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config'
import { connect, disconnect } from '@tests/utils/mongoose'


const user = {
    name: 'Test User',
    email: 'test@user.com',
    password: 'password'
}

let createdUser

describe('The User Model', ()=>{

    beforeAll(async () => {
        await connect()
        createdUser = await User.create(user)

    })

    it ('should hash the user password before saving in the database', async ()=>{

        expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true)

    })

    it ('should set the email confirm code for the user before saving to the database', async ()=>{

        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))

    })

    afterAll(async () => {
        await disconnect()
    })
})

describe('The generateToken method', () => {
    it('Should generate a valid JWT for a user', () => {
        const token = createdUser.generateToken()
        const { id } = jwt.verify(token, config.jwtSecret)

        expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)))
    })
})

