import { Router } from 'express'
import authRouter from '@routes/v1/auth'
import healthRouter from '@routes/healthcheck'

const v1Router = new Router()

v1Router.use('/auth', authRouter)
v1Router.use('/healthcheck', healthRouter)

export default v1Router
