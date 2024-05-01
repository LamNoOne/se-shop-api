'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const { default: helmet } = require('helmet')
const compression = require('compression')
// const morgan = require('morgan')
// const { corsOptions } = require('./config/cors.config')
const { mysql } = require('./databases')
const redirectApiVersion = require('./core/redirect.api.version')
const errorHandlingMiddleware = require('./core/error.handling')
const notFoundMiddleware = require('~/core/not.found.handling')
// const { nodeEnv } = require('~/config/environment.config')
// const { NODE_ENV_DEV } = require('~/config/constants.config')

const app = express()

// app.use(cors())
// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
  });
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(compression())
// if (nodeEnv === NODE_ENV_DEV) {
//   app.use(morgan('dev'))
// }

mysql.getInstance()

app.use('/api', redirectApiVersion)
app.use('/', notFoundMiddleware)
app.use(errorHandlingMiddleware)

module.exports = app