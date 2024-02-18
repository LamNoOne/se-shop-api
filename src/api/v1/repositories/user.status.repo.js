'use strict'

const { UserStatus } = require('~/api/v1/models')
const { Op } = require('sequelize')

const getUserStatusById = async (id = '') => {
  return await UserStatus.findOne({
    where: { id }
  })
}

const getUserStatusByName = async (name = '') => {
  return await UserStatus.findOne({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  })
}

module.exports = {
  getUserStatusById,
  getUserStatusByName
}