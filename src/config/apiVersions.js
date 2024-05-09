'use strict'

const v1Router = require('~/api/v1/routes')
const v2Router = require('~/api/v2/routes')

module.exports = {
  '1': v1Router,
  '2': v2Router
}