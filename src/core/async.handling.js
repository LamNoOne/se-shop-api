'use strict'

const asyncMiddlewareHandling = (asyncMiddleware) => {
  return (req, res, next) => {
    asyncMiddleware(req, res, next).catch(next)
  }
}

module.exports = asyncMiddlewareHandling