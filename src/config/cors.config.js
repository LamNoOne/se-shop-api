'use strict'

// const { nodeEnv } = require('./environment.config')
// const { NODE_ENV_DEV } = require('./constants.config')
// const { StatusCodes } = require('http-status-codes')
// const { getCorsDomainByDomain } = require('~/api/v1/repositories/cors.domain.repo')

// const ApiError = require('~/core/api.error')

const corsOptions = {
  origin: async function (origin, callback) {
    // if (!origin && nodeEnv === NODE_ENV_DEV) {
    //   return callback(null, true)
    // }
    // const corsDomain = await getCorsDomainByDomain(origin)
    // if (corsDomain) {
    //   return callback(null, true)
    // }
    // return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy`))
    return callback(null, true)
  },
  optionsSuccessStatus: 200,
  credentials: true
}

module.exports = {
  corsOptions
}