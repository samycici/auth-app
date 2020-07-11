import Express from 'express'
import Mongoose from 'mongoose'
import bodyParser from 'body-parser'

import config from '@server/config'
import v1Router from '@server/routes/'

Mongoose.connect(config.databaseUrl[config.environment], {
  useNewUrlParser: true
})

const app = new Express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.use('/api/v1', v1Router)

export default app
