'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { default: helmet } = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const { corsOptions } = require('./config/cors.config')
const { mysql } = require('./databases')
const redirectApiVersion = require('./core/redirect.api.version')
const errorHandlingMiddleware = require('./core/error.handling')
const notFoundMiddleware = require('~/core/not.found.handling')
const { nodeEnv } = require('~/config/environment.config')
const { NODE_ENV_DEV } = require('~/config/constants.config')

const app = express()

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(compression())
if (nodeEnv === NODE_ENV_DEV) {
  app.use(morgan('dev'))
}

mysql.getInstance()

app.use('/api', redirectApiVersion)
app.use('/', notFoundMiddleware)
app.use(errorHandlingMiddleware)

module.exports = app