const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user')
const { server } = require('./config/constants')

const helmet = require('helmet')
require('./config/db')

try {
  const app = express()

  app.use(cookieParser())

  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:80',
    'http://localhost:80',
    'http://0.0.0.0:80'
  ]

  app.use(helmet())

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(userRouter)
  app.listen(server.port, () => console.log(`Listening on port ${server.port}!`))
} catch (error) {
  console.error(error)
  process.exit()
}

