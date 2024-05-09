'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class UserStatus extends Model {}

UserStatus.init({
  id: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'UserStatus',
  tableName: 'UserStatus'
})

module.exports = UserStatus
