'use strict'

const { ResetToken, User } = require('~/api/v1/models')

const getFullResetToken = async (resetToken) => {
  return await ResetToken.findOne({
    where: {
      resetToken
    },
    include: [
      { model: User, as: 'user', attributes: ['id', 'publicKey'] }
    ]
  })
}

module.exports = {
  getFullResetToken
}