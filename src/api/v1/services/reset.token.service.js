'use strict'

const { ResetToken } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createResetToken = async ({ resetToken, userId }) => {
  try {
    return await ResetToken.create({ resetToken, userId })
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

const getResetToken = async (query = {}) => {
  return await ResetToken.findOne(query)
}

const deleteResetToken = async ({ resetToken }) => {
  const foundResetToken = await ResetToken.findOne({
    where: { resetToken }
  })
  if (!foundResetToken) return null

  return await foundResetToken.destroy()
}

module.exports = {
  createResetToken,
  getResetToken,
  deleteResetToken
}