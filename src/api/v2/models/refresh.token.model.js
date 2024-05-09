'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class RefreshToken extends Model {}

RefreshToken.init({
  refreshToken: DataTypes.STRING
}, {
  sequelize: mysql.getInstance(),
  modelName: 'RefreshToken',
  tableName: 'RefreshToken'
})

module.exports = RefreshToken