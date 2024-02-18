'use strict'

const { StatusCodes } = require('http-status-codes')
const corsDomainRepo = require('~/api/v1/repositories/cors.domain.repo')
const ApiError = require('~/core/api.error')

const getCorsDomainByDomain = async (domain = '') => {
  const foundCorsDomain = await corsDomainRepo.getCorsDomainByDomain(domain)
  if (!foundCorsDomain) new ApiError(StatusCodes.NOT_FOUND, 'Domain not found')
  return foundCorsDomain
}

module.exports = {
  getCorsDomainByDomain
}