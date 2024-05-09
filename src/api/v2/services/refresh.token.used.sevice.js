'use strict'

const { RefreshTokenUsed } = require('~/api/v2/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createRefreshTokenUsed = async ({ refreshTokenUsed, userId }) => {
  try {
    return await RefreshTokenUsed.create({ refreshTokenUsed, userId })
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

const getAllUsedRefreshTokens = async () => {
  return await RefreshTokenUsed.findAll()
}

const getRefreshTokenUsed = async ({ refreshToken }) => {
  return await RefreshTokenUsed.findByPk(refreshToken)
}

const deleteByUserId = async (userId = '') => {
  return await RefreshTokenUsed.destroy({
    where: {
      userId
    }
  })
}

const deleteByUserIds = async (userIds = []) => {
  return await RefreshTokenUsed.destroy({
    where: {
      userId: userIds
    }
  })
}

module.exports = {
  createRefreshTokenUsed,
  getAllUsedRefreshTokens,
  getRefreshTokenUsed,
  deleteByUserId,
  deleteByUserIds
}