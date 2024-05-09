'use strict'

const asyncHandling = require('~/core/async.handling')
const {
  createFilter,
  createPagination,
  createSorter
} = require('~/api/v2/helpers/query.string.helper')

const queryStringMiddleware = asyncHandling(async (req, res, next) => {
  const filter = createFilter(req.query)
  const select = req.query._select || ''
  const pagination = createPagination(req.query)
  const sorter = createSorter(req.query)
  const selector = select ? select.split(',') : null

  req.filter = Object.keys(filter).length === 0 ? null : filter
  req.selector = selector
  req.pagination = pagination
  req.sorter = sorter
  next()
})

module.exports = queryStringMiddleware