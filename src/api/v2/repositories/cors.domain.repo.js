'use strict'

const { CorsDomain } = require('~/api/v2/models')

const getCorsDomainByDomain = async (domain = '') => {
  return await CorsDomain.findOne({
    where: { domain }
  })
}

module.exports = {
  getCorsDomainByDomain
}