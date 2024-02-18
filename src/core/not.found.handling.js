'use strict'

const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const asyncHandler = require('~/core/async.handling')

const notFoundMiddleware = asyncHandler(async (req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND))
})

module.exports = notFoundMiddleware