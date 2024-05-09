'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class ResetToken extends Model {}

ResetToken.init({
  resetToken: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'ResetToken',
  tableName: 'ResetToken'
})

module.exports = ResetToken