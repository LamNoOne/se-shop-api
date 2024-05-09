'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class RefreshTokenUsed extends Model {}

RefreshTokenUsed.init({
  refreshTokenUsed: {
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
  modelName: 'RefreshTokenUsed',
  tableName: 'RefreshTokenUsed'
})

module.exports = RefreshTokenUsed